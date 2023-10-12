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
		
		$tbl='electry_controldiario';
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
                    'Ciudad'=>'',
                    'Concepto'=>'No existen registros',
                    'Fecha'=>'0',
                    'ValorLetras'=>'0',
                    'Paga'=>'0',
                    'Valor'=>'0',
                    'message'=>'No existen registros',
                    'status'=>'Deactivated');
					$var = var2js($row);	
					echo $var;	                            
				}
					
			break;
			case 'add':

					$chartic=array();
					//CARGO EL ARRAY 
					$chartic['Ciudad']=$_POST['Ciudad'];
					$chartic['Concepto']=$_POST['Concepto'];
					$chartic['Fecha']=$_POST['Fecha'];
					$chartic['Paga']=$_POST['Paga'];
					$chartic['Valor']=$_POST['Valor'];
					$chartic['ValorLetras']=$_POST['ValorLetras'];
					$chartic['status']='Active';
					//GUARDO
					
					$id=$app->guardar($chartic);
					
					//VERIFICO
						if($id>0){
								$msg[] = array('id'=>1,'menssage'=>'Control Diario registrado correctamente!');
						}else{
								$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
						}
				//IMPRIMO RESPUESTA		
				$var = var2js($msg);	
				echo $var;
			break;
			case 'update':

					$chartic=array();
					$chartic['Ciudad']=$_POST['Ciudad'];
					$chartic['Concepto']=$_POST['Concepto'];
					$chartic['Fecha']=$_POST['Fecha'];
					$chartic['Paga']=$_POST['Paga'];
					$chartic['Valor']=$_POST['Valor'];
					$chartic['ValorLetras']=$_POST['ValorLetras'];
						$app->actualizar($chartic,'id',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Control Diario: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'delete':
			
					sql_delete("electry_controldiario","id=" . intval($_POST['id']));
					$msg[] = array('menssage'=>'OK. El Control Diario '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
