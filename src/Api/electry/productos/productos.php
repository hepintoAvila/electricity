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
				
				$tbl='electry_productos';
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
                    'Unidad'=>'',
                    'Valor'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'Deactivated');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':
					$app=new Electry(''); 
					$Codigo=$app->generarCodigo($_POST['Producto']);
					$chartic=array();
					//LLAMO LA TABLA
					$tbl='electry_productos';
					//LA ASIGNO A LA CLASE
					$material=new Electry($tbl);
					//CARGO EL ARRAY 
					$chartic['Nombre']=strtoupper($_POST['Nombre']);
					$chartic['Codigo']=$Codigo;
					$chartic['Unidad']=strtoupper ($_POST['Unidad']);
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					$chartic['Total']=$_POST['Cantidad']*$_POST['ValorUnitario'];
					$chartic['Producto']=$_POST['Producto'];
					$chartic['status']='Active';
					//GUARDO
					$id=$material->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Producto registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso fue no registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':
			
					$chartic=array();
					//LLAMO LA TABLA
						$tbl='electry_productos';
											
						$apps=new Electry($tbl);
						$chartic['Nombre']=strtoupper ($_POST['Nombre']);
						$chartic['Unidad']=strtoupper ($_POST['Unidad']);
						$chartic['Cantidad']=$_POST['Cantidad'];
						$chartic['ValorUnitario']=$_POST['ValorUnitario'];
						$chartic['Total']=$_POST['Cantidad']*$_POST['ValorUnitario'];
						$chartic['Producto']=$_POST['Producto'];
						$apps->actualizar($chartic,'id',$_POST['id']);
						
						$msg[] = array('menssage'=>'OK. El registro: '.$_POST['id'].'-'.$_POST['Nombre'].' fue actualizado correctamente!');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_productos","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
