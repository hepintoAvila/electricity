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
				
				$tbl='electry_proyectos';
				$app=new Electry($tbl);
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);
				$data = array("data"=>array_merge($row));	
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
					'id'=>1,
                    'Nombre'=>'No existen registros',
                    'Tipo'=>'',
                    'Direccion'=>'',
                    'Cliente'=>'',
                    'Estado'=>'',
                    'Cotizando'=>'',
                    'maj'=>'2023-04-24 12:34:26',
                    'message'=>'No existen registros',
                    'status'=>'404');
					$data = array("data"=>array_merge($row));	
					$var = var2js($data);	  
					echo $var;	                            
				}
					
			break;
			case 'add':
					$chartic=array();
					//LLAMO LA TABLA
					$tbl='electry_proyectos';
					//LA ASIGNO A LA CLASE
					$material=new Electry($tbl);
					//CARGO EL ARRAY 
					$chartic['Nombre']=$_POST['Nombre'];
					$chartic['Tipo']=$_POST['TipoProyecto'];
					$chartic['Direccion']=$_POST['Direccion'];
					$chartic['Cliente']=$_POST['Cliente'];
					$chartic['Estado']=$_POST['Estado'];
					$chartic['status']='Active';
					//GUARDO
					$id=$material->guardar($chartic);
					
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
					//LLAMO LA TABLA
					$tbl_categorias='electry_proyectos';
											
						$apps=new Apis($tbl_categorias);
						$chartic['Nombre']=$_POST['Nombre'];
						$chartic['Tipo']=$_POST['Tipo'];
						$chartic['Direccion']=$_POST['Direccion'];
						$chartic['Cliente']=$_POST['Cliente'];
						$chartic['Estado']=$_POST['Estado'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Proyecto: '.$_POST['id'].'-'.$_POST['nombres'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_proyectos","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
