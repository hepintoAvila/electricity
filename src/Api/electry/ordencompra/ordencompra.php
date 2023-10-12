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
		
		$tbl='electry_ordencompra';
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
                    'Codigo'=>'',
                    'Empresa'=>'No existen registros',
                    'Fecha'=>'0',
                    'Descripcion'=>'0',
                    'Cantidad'=>'0',
                    'ValorUnitario'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'Deactivated');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':
					$select='*';
					$cod=$app->codigo('id');
					$chartic=array();
					//CARGO EL ARRAY 
					$chartic['Codigo']='NG2-0'.$cod;
					$chartic['Empresa']=$_POST['Empresa'];
					$chartic['Fecha']=$_POST['Fecha'];
					$chartic['Descripcion']=$_POST['Descripcion'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					$chartic['status']='Active';
					//GUARDO
					
					$id=$app->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Orden de Compra fue registrada!','status'=>'200');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':

					$chartic=array();
					$chartic['Empresa']=$_POST['Empresa'];
					$chartic['Fecha']=$_POST['Fecha'];
					$chartic['Descripcion']=$_POST['Descripcion'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. Orden de Compra: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizada correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_ordencompra","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK.  La Orden de Compra '.$_POST['id'].' fue eliminada correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
