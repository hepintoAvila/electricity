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

		$tbl='electry_apu';
		$app=new Electry($tbl);	
		
		switch ($_POST['opcion']) {

			case 'consultarById':
				$byid=new Electry('electry_apu_productos');
				
				$query_material='Producto="MATERIALES" AND IdApu="'.$_POST['id'].'"';
				$query_equipo='Producto="EQUIPOS" AND IdApu="'.$_POST['id'].'"';
				$query_mano='Producto="MANO DE OBRA" AND IdApu="'.$_POST['id'].'"';
				$query_transp='Producto="TRANSPORTE" AND IdApu="'.$_POST['id'].'"';

				$select='*';
					
	 	
				$mano=$byid->consultadatos($query_mano,$select);
			 
				$material=$byid->consultadatos($query_material,$select);
				$material[]= array(
						'id'=> '',
						'IdApu'=> '',
						'Nombre'=> '',
						'Codigo'=> 'TOTAL DE MATERIALES',
						'Unidad'=> '',
						'Cantidad'=>$byid->sumaCampo('Cantidad',$query_material),
						'ValorUnitario'=>'$'.$byid->sumaCampo('ValorUnitario',$query_material),
						'Total'=>$byid->sumaCampo('Total',$query_material),
						'Producto'=> '',
						'status'=> 'Active',
						'maj'=> ''
					);
				$trans=$byid->consultadatos($query_transp,$select);
				$trans[]= array(
						'id'=> '',
						'IdApu'=> '',
						'Nombre'=> '',
						'Codigo'=> 'TOTAL DE TRANSPORTE',
						'Unidad'=> '',
						'Cantidad'=>$byid->sumaCampo('Cantidad',$query_transp),
						'ValorUnitario'=>'$'.$byid->sumaCampo('ValorUnitario',$query_transp),
						'Total'=>'$'.$byid->sumaCampo('Total',$query_transp),
						'Producto'=> '',
						'status'=> 'Active',
						'maj'=> ''
					);				
				$equipo=$byid->consultadatos($query_equipo,$select);//equipos
				$equipo[]= array(
						'id'=> '',
						'IdApu'=> '',
						'Nombre'=> '',
						'Codigo'=> 'TOTAL DE EQUIPOS',
						'Unidad'=> '',
						'Cantidad'=>$byid->sumaCampo('Cantidad',$query_equipo),
						'ValorUnitario'=>'$'.$byid->sumaCampo('ValorUnitario',$query_equipo),
						'Total'=>'$'.$byid->sumaCampo('Total',$query_equipo),
						'Producto'=> '',
						'status'=> 'Active',
						'maj'=> ''
					);
				$mano=$byid->consultadatos($query_mano,$select);	
				$mano[]= array(
						'id'=> '',
						'IdApu'=> '',
						'Nombre'=> '',
						'Codigo'=> 'TOTAL DE MANO DE OBRA',
						'Unidad'=> '',
						'Cantidad'=>$byid->sumaCampo('Cantidad',$query_mano),
						'ValorUnitario'=>'$'.$byid->sumaCampo('ValorUnitario',$query_mano),
						'Total'=>'$'.$byid->sumaCampo('Total',$query_mano),
						'Producto'=> '',
						'status'=> 'Active',
						'maj'=> ''
					);
				$query='IdApu="'.$_POST['id'].'"';
				$mano[]= array(
						'id'=> '',
						'IdApu'=> '',
						'Nombre'=> '',
						'Codigo'=> 'TOTAL',
						'Unidad'=> '',
						'Cantidad'=>$byid->sumaCampo('Cantidad',$query),
						'ValorUnitario'=>'$'.$byid->sumaCampo('ValorUnitario',$query),
						'Total'=>'$'.$byid->sumaCampo('Total',$query),
						'Producto'=> 'GRAN TOTAL',
						'status'=> 'Active',
						'maj'=> ''
					);					
				$Materiales= array("Rows"=>array_merge($material,$trans,$equipo,$mano));
				$data = array("data"=>array_merge($Materiales));				
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
			case 'consultar':
				
				$query='';
				$select='*';
				$row=$app->consultadatos($query,$select);

				$tbls='electry_productos';
				$apps=new Electry($tbls);
				
				$query_material='Producto="MATERIALES"';
				$query_equipo='Producto="EQUIPOS"';
				$query_mano='Producto="MANO DE OBRA"';

				$select='*';
				$material=$apps->consultadatos($query_material,$select);	
				$equipo=$apps->consultadatos($query_equipo,$select);	
				$mano=$apps->consultadatos($query_mano,$select);	
				
				$all=$apps->consultadatos('',$select);	

				$tblc='electry_categorias';
				$appc=new Electry($tblc);	
				$categorias=$appc->consultadatos('','*');

				$tblsc='electry_subcategorias';
				$appsc=new Electry($tblsc);	
				$sub=$appsc->consultadatos('','*');
				
				foreach($sub as $a => $value){
				$subcategorias[]=array(
				 "id"=>$value["id"],
				 "idCategoria"=>$value["idCategoria"],
				 "IdProyecto"=>0,
				 "Descripcion"=>$value["Descripcion"],
				 "Unidad"=>$value["Unidad"],
				 "Cantidad"=>$value["Cantidad"],
				 "ValorUnitario"=>$value["ValorUnitario"],
				 "image"=>$value["image"],
				  "status"=>$value["status"]);
				}
				//APUS PROYECTO
			 
				$app_apu=new Electry('electry_apu_proyecto');	
				$sub_apu=$app_apu->consultadatos('','*');
				
				foreach($sub_apu as $a => $val){
				$ProyectosApu[]=array(
				 "id"=>$val["id"],
				 "idCategoria"=>$val["idCategoria"],
				 "IdApu"=>$val["IdApu"],
				 "IdProyecto"=>$val["IdProyecto"],
				 "Codigo"=>$val["Codigo"],
				 "Descripcion"=>$val["Descripcion"],
				 "Unidad"=>$val["Unidad"],
				 "Cantidad"=>$val["Cantidad"],
				 "ValorUnitario"=>$val["ValorUnitario"],
				 "image"=>$val["image"],
				 "Producto"=>$val["Producto"],
				 "status"=>$val["status"]);
				}
				
				//var_dump($subcategorias);
				
				$tblsc_trans='electry_apu_productos';
				$apptrans=new Electry($tblsc_trans);				
				
				$query_trans='Producto="TRANSPORTE"';
				$trans=$apptrans->consultadatos($query_trans,'*');
				
				$tbls_usr='electry_apu_productos';
				$app_apu_prod=new Electry($tbls_usr);	
				$query_trans_apu_prod='';
				$apu_prod=$app_apu_prod->consultadatos($query_trans_apu_prod,'*');
				
				$Categorias= array("Categorias"=>array_merge($categorias));
				$SubCategorias= array("SubCategorias"=>array_merge($subcategorias));
				$Materiales= array("Materiales"=>array_merge($material));
				$Equipos= array("Equipos"=>array_merge($equipo));
				$ManoObra= array("ManoObra"=>array_merge($mano));
				$Transporte= array("Transportes"=>array_merge($trans));
				$Productos= array("Productos"=>array_merge($all));
				$apu_prod= array("ProductosApu"=>array_merge($apu_prod));
				$ProyectosApu= array("ProyectosApu"=>array_merge($ProyectosApu));
				
				$Apus= array("Apus"=>array_merge($row));
				$data = array("data"=>array_merge($Apus,$Materiales,$Equipos,$ManoObra,$SubCategorias,$Categorias,$Productos,$Transporte,$apu_prod,$ProyectosApu));				
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
			case 'consultar_trasporte':
				$tbls_param='electry_parametros_precios';
				$apps_param=new Electry($tbls_param);
				$query_param='id="1"';
				$select_param='Valor As Parametro';
				$param=$apps_param->consultadatos($query_param,$select_param);
				
				$tbls='electry_apu_productos';
				$apps=new Electry($tbls);
				$query_trans='IdApu="'.$_POST['IdApu'].'" AND Producto="MATERIALES"';
				$select_trans='SUM(Total) AS Total';
				$row=$apps->consultadatos($query_trans,$select_trans);
				
				$select='COUNT(*) AS NUM,id';
				$query_trans='IdApu="'.$_POST['IdApu'].'" AND Producto="TRANSPORTE"';
				$cont=$apps->consultadatos($query_trans,$select);					
				
				
				
				if($cont[0]['NUM']==0){
					
					$chartic=array('Codigo'=>'TR-MAT-001','IdApu'=>$_POST['IdApu'],'Nombre'=>'TRANSPORTE DE MATERIAL','Unidad'=>'%','Cantidad'=>'10','ValorUnitario'=>''.$row[0]['Total'].'','Total'=>$total_porcetual,'Producto'=>'TRANSPORTE','status'=>'Active');
					$tblp='electry_apu_productos';
					$appc=new Electry($tblp);	
					$id=$appc->guardar($chartic);
				}else{
					
					$tbls_param='electry_parametros_precios';
					$apps_param=new Electry($tbls_param);
					$query_param='id="1"';
					$select_param='Valor As Parametro';
					$param=$apps_param->consultadatos($query_param,$select_param);					
					
					$tbls='electry_apu_productos';
					$apps=new Electry($tbls);
					$query_trans='IdApu="'.$_POST['IdApu'].'" AND Producto="MATERIALES"';
					$select_trans='SUM(Total) AS Total';
					$rowac=$apps->consultadatos($query_trans,$select_trans);
					$total_porcetual=($rowac[0]['Total']/100)*$param[0]['Parametro'];
					
					$chartic_act=array('Cantidad'=>''.$rowac[0]['Cantidad'].'','ValorUnitario'=>''.$total_porcetual.'','Total'=>''.$total_porcetual.'');
					$apps->actualizar($chartic_act,'id',$_POST['id']);
				}
					
				$producto=array('Codigo'=>'TR-MAT-001','IdApu'=>$_POST['IdApu'],'Nombre'=>'TRANSPORTE DE MATERIAL','Unidad'=>'%','Cantidad'=>'10','ValorUnitario'=>''.$row[0]['Total'].'','Total'=>$total_porcetual,'Producto'=>'TRANSPORTE','status'=>'Active');
				$Apus= array("Productos"=>$producto);
				$data = array("data"=>array_merge($Apus));				
				
				//ACTUALIZA PRECIO APU
				$appall=new Electry('electry_apu_productos');
				$select_all='SUM(Total) AS Total';
				$query_all='IdApu="'.$_POST['IdApu'].'"';				
				$r=$appall->consultadatos($query_all,$select_all);			
				$sub=new Electry('electry_subcategorias');
				$chartic_sub=array('ValorUnitario'=>''.$r[0]['Total'].'');
				$sub->actualizar($chartic_sub,'id',$_POST['IdApu']);
				
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$producto[] = array(
                    'id'=>1,
                    'IdApu'=>'',
                    'Nombre'=>'No existen registros',
                    'Unidad'=>'',
                    'Cantidad'=>'',
                    'ValorUnitario'=>'',
                    'Producto'=>'TRANSPORTE',
                    'status'=>'404');
					$var = var2js($producto);	
					echo $var;	                            
				}
			break;
			case 'add_producto_apu':
			
				$tbls_param='electry_parametros_precios';
				$apps_param=new Electry($tbls_param);
				$query_param='id="1"';
				$select_param='Valor As Parametro';
				$param=$apps_param->consultadatos($query_param,$select_param);
		
		switch($_POST['Producto']) {	
				case "EQUIPOS":
					$equipo=new Electry('electry_apu_productos');				
					$chartic=array();
					$chartic['IdApu']=$_POST['IdApu'];
					$chartic['Nombre']=strtoupper($_POST['Nombre']);
					$chartic['Codigo']=$_POST['Codigo'];
					$chartic['Unidad']=$_POST['Unidad'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					$chartic['Total']=$_POST['Total'];
					$chartic['Producto']=$_POST['Producto'];
					$chartic['status']='Active';
					$id=$equipo->guardar($chartic);
					$msg[] = array('id'=>1,'menssage'=>'El EQUIPOS fue registrado correctamente!');
				break;	
				case "MATERIALES":
					//inserto materiales
					$equipo=new Electry('electry_apu_productos');				
					$chartic=array();
					$chartic['IdApu']=$_POST['IdApu'];
					$chartic['Nombre']=strtoupper($_POST['Nombre']);
					$chartic['Codigo']=$_POST['Codigo'];
					$chartic['Unidad']=$_POST['Unidad'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					$chartic['Total']=$_POST['Total'];
					$chartic['Producto']=$_POST['Producto'];
					$chartic['status']='Active';
					$id=$equipo->guardar($chartic);
					//ACTUALIZO O INSERTO TRANSPORTE
					$tbls='electry_apu_productos';
					$trasp=new Electry($tbls);
					$select='COUNT(*) AS NUM,id';
					$query_trans='IdApu="'.$_POST['IdApu'].'" AND Producto="TRANSPORTE" AND status="Active"';
					$cont=$trasp->consultadatos($query_trans,$select);	
					$query_mate='IdApu="'.$_POST['IdApu'].'" AND Producto="MATERIALES"';
					$select_mate='SUM(Total) AS Total';
					$row=$trasp->consultadatos($query_mate,$select_mate);	
					$total_porcetual=($row[0]['Total']/100)*$param[0]['Total'];
								
					$selectc='*';
					$rowac=$trasp->consultadatos($query_trans,$selectc);					
					$chartic_act=array('Cantidad'=>''.$rowac[0]['Cantidad'].'','ValorUnitario'=>''.$row[0]['Total'].'','Total'=>''.$total_porcetual.'');
					$trasp->actualizar($chartic_act,'id',$cont[0]['id']);
					 $msg[] = array('id'=>1,'menssage'=>'El TRANSPORTE fue actualizado y el MATERIAL registrado!');					
				break; 
				case "TRANSPORTE":
					$transporte=new Electry('electry_apu_productos');
					$chartic_act=array('Cantidad'=>''.$_POST['Cantidad'].'','ValorUnitario'=>''.$_POST['ValorUnitario'].'','Total'=>''.$_POST['Total'].'');
					$transporte->actualizar($chartic_act,'id',$_POST['id']);
					$msg[] = array('id'=>1,'menssage'=>'El TRANSPORTE fue actualizado correctamente!');
				break;
				case "MANO DE OBRA":
					$equipo=new Electry('electry_apu_productos');				
					$chartic=array();
					$chartic['IdApu']=$_POST['IdApu'];
					$chartic['Nombre']=strtoupper($_POST['Nombre']);
					$chartic['Codigo']=$_POST['Codigo'];
					$chartic['Unidad']=$_POST['Unidad'];
					$chartic['Cantidad']=$_POST['Cantidad'];
					$chartic['ValorUnitario']=$_POST['ValorUnitario'];
					$chartic['Total']=$_POST['Total'];
					$chartic['Producto']=$_POST['Producto'];
					$chartic['status']='Active';
					$id=$equipo->guardar($chartic);
					$msg[] = array('id'=>1,'menssage'=>'La MANO DE OBRA fue registrado correctamente!');
				
				break;
		}				
				if (!is_null($msg)) {
				$var = var2js($msg);	
				echo $var;
				}else{
					$msg[] = array('menssage'=>'ERROR.El proceso no fue registrado correctamente!');
					$var = var2js($msg);	
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
						$msg[] = array('menssage'=>'OK. El Control Diario: '.$_POST['id'].'-'.$_POST['Nombres'].' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			
			break;
			case 'add_imagen_apu':
			
			 
				$tblimg='electry_subcategorias';
				$img=new Electry($tblimg);
				
				$type=$_POST['type'];
				$extension = str_replace("image/", '', $type);
	 		    $idApu=$_POST['idApu'];
				$dir_img='https://'.$_SERVER["SERVER_NAME"].'/IMG/electry/';
				$source=$dir_img.$extension.'/'.$idApu.'.'.$extension;
				$chartic_img=array('image'=>''.$source.'');
				$img->actualizar($chartic_img,'id',$_POST['idApu']);
				$row[] = array(
                    'menssage'=>'La imagen fue subida correctamente!',
                    'status'=>'202');
					$var = var2js($row);	
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
