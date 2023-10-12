<?php

/***************************************************************************\
 *  SPIP, Systeme de publication pour l'internet                           *
 *                                                                         *
 *  Copyright (c) 2001-2017                                                *
 *  Arnaud Martin, Antoine Pitrou, Philippe Riviere, Emmanuel Saint-James  *
 *                                                                         *
 *  Ce programme est un logiciel libre distribue sous licence GNU/GPL.     *
 *  Pour plus de details voir le fichier COPYING.txt ou l'aide en ligne.   *
\***************************************************************************/

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/electry/claseapi');

		$tbl='electry_categorias';
		$app=new Electry($tbl);	
		
		switch ($_POST['opcion']) {
			case 'consultar':
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);
				
				$query_Padre='TipoCategoria>"0"';
				$select='*';
				$Padre=$app->consultadatos($query_Padre,$select);	
				//$Items= array("TipoCategoria"=>array_merge($Padre));
				$Categorias= array("Categorias"=>array_merge($row));
				
				$data = array("data"=>array_merge($Categorias));				
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'Codigo'=>'',
                    'Categoria'=>'No existen registros',
                    'message'=>'No existen registros',
                    'status'=>'404');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':
					$tbl='electry_categorias';
					$app=new Electry($tbl);	
					$select='*';
					$cod=$app->codigo('id');
					$chartic=array();
					//CARGO EL ARRAY 

					//GUARDO
					if($_POST['TipoCategoria']=='0'){
						
						$numMax=$app->codigo('TipoCategoria');
						$chartic['Codigo']=strtoupper(substr($_POST['Categoria'],0,2)).'-'.$numMax;
						$chartic['Categoria']=strtoupper($_POST['Categoria']);
						$chartic['TipoCategoria']=$numMax;
						$id=$app->guardar($chartic);
					}else{
						
						$select1='Codigo';
						$query1='id="'.$_POST['TipoCategoria'].'"';
						$row=$app->consultadatos($query1,$select1);
						foreach($row as $a => $value){
							$Codigo=substr($value['Codigo'],0,2);
						}
						//CREAMOSEL CODIGO
						$select='REPLACE(Codigo, ".", "") AS num';
						$Categorias=$app->consultadatos('',$select);
						$cod=$app->codigo_categorias($Categorias,''.$Codigo.'');
						
						$chartic['Codigo']=$cod;
						$chartic['Categoria']=strtoupper($_POST['Categoria']);
						$chartic['TipoCategoria']='0';
						$id=$app->guardar($chartic);						
					}
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'El proceso fue registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':

					$chartic=array();
					$chartic['Categoria']=$_POST['Categoria'];
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El registro: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_categorias","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
