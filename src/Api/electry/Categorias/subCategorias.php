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

		$tbl='electry_subcategorias';
		$app=new Electry($tbl);	
		
		switch ($_POST['opcion']) {
			case 'consultar':
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);
				
				
				$tbls='electry_categorias';
				$apps=new Electry($tbls);	
				$query_Padre='';
				$select='*';
				$categorias=$apps->consultadatos($query_Padre,$select);	
				$Items= array("Categoria"=>array_merge($categorias));
				$Categorias= array("SubCategorias"=>array_merge($row));
				
				$data = array("data"=>array_merge($Categorias,$Items));				
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

				$tbls='electry_categorias';
				$apps=new Electry($tbls);
				$query_Padre='id="'.$_POST['TipoCategoria'].'"';
				$select='Codigo';
				$array=$apps->consultadatos($query_Padre,$select);
					foreach($array as $a => $value){
					$codigo=$value['Codigo'];
					}
					$sql = sql_select("COUNT(*) AS num",'electry_subcategorias AS SU',"SU.Codigo LIKE '%".$codigo."%'");
					while ($row = sql_fetch($sql)) {	
						$numero=$row['num'];			
					  }		
						  if ($numero < 10) {
						  $codigo="".$codigo.'00-'.$numero;
						  } else {
							  $codigo="".$codigo."".$numero;
						  }				
						$chartic=array();
					
						$chartic['idCategoria']=$_POST['TipoCategoria'];
						$chartic['Codigo']=$codigo;
						$chartic['Descripcion']=strtoupper($_POST['Descripcion']);
						$chartic['Unidad']=$_POST['Unidad'];
						$chartic['Cantidad']=$_POST['Cantidad'];
						$chartic['ValorUnitario']=$_POST['ValorUnitario'];
						$id=$app->guardar($chartic);
					
					//CREAMOS LA APU DE TRANSPORTE
							$tbls_param='electry_parametros_precios';
							$apps_param=new Electry($tbls_param);
							$query_param='id="1"';
							$select_param='Valor As Parametro';
							$param=$apps_param->consultadatos($query_param,$select_param);
				
							$tblpc='electry_apu_productos';
							$appc=new Electry($tblpc);	
							$trasport['IdApu']=$id;
							$trasport['Nombre']='TRANSPORTE DE MATERIAL';
							$trasport['Codigo']='TR-MAT-001';
							$trasport['Unidad']=1;
							$trasport['Cantidad']=$param[0]['Parametro'];
							$trasport['ValorUnitario']=0;
							$trasport['Total']=0;
							$trasport['Producto']='TRANSPORTE';
							$trasport['status']='Active';
							$id=$appc->guardar($trasport);						
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
						$chartic['Descripcion']=strtoupper($_POST['Descripcion']);
						$chartic['Unidad']=$_POST['Unidad'];
						$chartic['Cantidad']=$_POST['Cantidad'];
						$chartic['ValorUnitario']=$_POST['ValorUnitario'];
						
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Registro: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_subcategorias","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
