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


		
		switch ($_POST['opcion']) {
			case 'consultar':
				$tbl='electry_parametros_precios';
				$app=new Electry($tbl);	
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);

				$ParametrosPrecios= array("ParametrosPrecios"=>array_merge($row));
				
				$data = array("data"=>array_merge($ParametrosPrecios));				
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'Parametro'=>'No existen registros',
                    'Valor'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'404');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':
				$tbl='electry_parametros_precios';
				$app=new Electry($tbl);	
						$chartic=array();
						$chartic['Parametro']=strtoupper($_POST['Parametro']);
						$chartic['Valor']=$_POST['Valor'];
						$id=$app->guardar($chartic);					
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
				$tbl='electry_parametros_precios';
				$app=new Electry($tbl);	

						$chartic=array();
						$chartic=array();
						$chartic['Parametro']=strtoupper($_POST['Parametro']);
						$chartic['Valor']=$_POST['Valor'];
						
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Registro: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_parametros_precios","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
