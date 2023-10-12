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
		
		$tbl='electry_empleados';
		$app=new Electry($tbl);	
		
		switch ($_POST['opcion']) {
			case 'consultar':
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
                    'Identificacion'=>'',
                    'Nombres'=>'No existen registros',
                    'Apellidos'=>'0',
                    'Email'=>'0',
                    'Telefono'=>'0',
                    'Cargo'=>'0',
                    'Salario'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'Deactivated');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':
					$tbl='electry_empleados';
					$app=new Electry($tbl);	
					$chartic=array();
					//CARGO EL ARRAY 
					$chartic['Identificacion']=$_POST['Identificacion'];
					$chartic['Nombres']=$_POST['Nombres'];
					$chartic['Apellidos']=$_POST['Apellidos'];
					$chartic['Email']=$_POST['Email'];
					$chartic['Telefono']=$_POST['Telefono'];
					$chartic['Cargo']=$_POST['Cargo'];
					$chartic['Salario']=$_POST['Salario'];
					$chartic['status']='Active';
					//GUARDO
					
					$id=$app->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'El Empleado fue registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':
					$tbl='electry_empleados';
					$app=new Electry($tbl);	
					$chartic=array();
						$chartic['Identificacion']=$_POST['Identificacion'];
						$chartic['Nombres']=$_POST['Nombres'];
						$chartic['Apellidos']=$_POST['Apellidos'];
						$chartic['Email']=$_POST['Email'];
						$chartic['Telefono']=$_POST['Telefono'];
						$chartic['Cargo']=$_POST['Cargo'];
						$chartic['Salario']=$_POST['Salario'];
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Empleado: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_empleados","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El Empleado '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
