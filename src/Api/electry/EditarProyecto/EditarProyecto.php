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
				case "const_apu_productos":
				$idProyecto=$_POST['idProyecto'];
				$IdApu=$_POST['IdApu'];
				$prod=new Electry('electry_apu_proyecto');
				$apu_pro=new Electry('electry_apu_producto_proyectos');	
				$select_prod='*';
				$query='IdProyecto="'.$_POST['idProyecto'].'" AND id="'.$_POST['IdApu'].'"';
				$row2=$prod->consultadatos($query,$select_prod);
				foreach($row2 as $a => $val){
					$apu[]= array(
					"id"=>$val['id'],
					"IdApu"=>$val['id'],
					"Codigo"=>trim($val['Codigo']),
					"Descripcion"=>$val['Descripcion'],
					"Unidad"=>$val['Unidad'],
					"Cantidad"=>$val['Cantidad'],
					"ValorUnitario"=>$val['ValorUnitario'],
					"Producto"=>$val['Producto'],
					"status"=>$val['status'],
					);
				}
					$res_prod = sql_select("*",
					'electry_apu_producto_proyectos',
					$query='IdProyecto="'.$_POST['idProyecto'].'" AND id_apu_proy="'.$_POST['IdApu'].'"');
					while ($rowp = sql_fetch($res_prod)) {
					$apus[]=array(
						"id"=>$rowp['id'],
						"IdApu "=>$rowp['IdApu'],
						"Codigo"=>$rowp['Codigo'],
						"Descripcion"=>$rowp['Nombre'],
						"Unidad"=>$rowp['Unidad'],
						"Cantidad"=>$rowp['Cantidad'],
						"ValorUnitario"=>$rowp['ValorUnitario'],
						"Producto"=>$rowp['Producto'],
						"Total"=>$rowp['Total'],
						"status"=>$val['status'],	
						);
					}
				if (!is_null($apus)) {
					$data= array("data"=>array_merge($apu,$apus));				
				}else{
					$data= array("data"=>array_merge($apu));	
				}
				
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'message'=>'No existen registros',
                    'status'=>'404');
					$var = var2js($row);	
					echo $var;	                            
				}							
				break;
				case "consultar":
				$app_s=new Electry('electry_proyectos');				
				$idProyecto=$_POST['idProyecto'];
				$IdApu=$_POST['IdApu'];
				$select_s='*';
				
				$query1='id= "'.$idProyecto.'"';
				$row1=$app_s->consultadatos($query1,$select_s);
				foreach($row1 as $a => $value){
					$prod=new Electry('electry_apu_proyecto');				
					$select_prod='*';
					$query_prod='IdProyecto="'. $value['id'].'" ORDER BY id';
					$row3=$prod->consultadatos($query_prod,$select_prod);
					$Proyectos[]= array("id"=>$value['id'],
					"Nombre"=>$value['Nombre'],
					"Tipo"=>$value['Tipo'],
					"Cliente"=>$value['Cliente'],
					"Estado"=>$value['Estado'],
					"subRows"=>array("datos"=>$apus_p),
					);
				}					
				$prod=new Electry('electry_apu_proyecto');				
				$apu_pro=new Electry('electry_apu_producto_proyectos');				
				 			
				$select_prod='*';
				//$q = intval($_POST['IdApu']) > 0 ? 'AND id="'.$_POST['IdApu'].'"':'';
				$query='IdProyecto="'.$_POST['idProyecto'].'"';
				$row2=$prod->consultadatos($query,$select_prod);
				foreach($row2 as $a => $val){
					$apus_p=$apu_pro->buscar_apus_proyecto($val['id'],$_POST['idProyecto']);
					$apu[]= array(
					"id"=>$val['id'],
					"IdApu"=>$val['id'],
					"IdProyecto"=>$_POST['idProyecto'],
					"Codigo"=>trim($val['Codigo']),
					"Descripcion"=>$val['Descripcion'],
					"Unidad"=>$val['Unidad'],
					"Cantidad"=>$val['Cantidad'],
					"ValorUnitario"=>$val['ValorUnitario'],
					"Producto"=>$val['Producto'],
					"status"=>$val['status'],
					"subRows"=>array("datos"=>$apus_p),
					);				
				}
			$res = sql_select("t1.id,t1.idCategoria,
			t1.Codigo,t1.Descripcion,t1.Unidad,
			t1.Cantidad,t1.ValorUnitario,t1.image,
			t1.status,t2.IdProyecto,t2.id AS IdApu",
			"electry_subcategorias t1 LEFT JOIN electry_apu_proyecto t2 ON t2.IdApu = t1.ID",
			"t2.IdApu IS NULL");
				while ($row = sql_fetch($res)) {
				    $datos2=$apu_pro->buscar_apus_proyecto($row['id'],$_POST['idProyecto']);
					$ApusNoAs[]= array(
						"id"=>$row['id'],
						"idCategoria"=>$row['idCategoria'],
						"IdProyecto"=>$_POST['idProyecto'],
						"Codigo"=>$row['Codigo'],
						"Descripcion"=>$row['Descripcion'],
						"Unidad"=>$row['Unidad'],
						"Cantidad"=>$row['Cantidad'],
						"ValorUnitario"=>$row['ValorUnitario'],
						"image"=>$row['image'],
						"status"=>$row['status'],
						"subRows"=>array("datos"=>$datos2),
						);
				}					
				//$apus_p=$apu_pro->buscar_apus_proyecto(8,$_POST['idProyecto']);
				 
				$Productos= array("Productos"=>$row3);
				$Apus= array("Apus_asignadas"=>$apu);
				$ApusNoAsignadas= array("ApusNoAsignadas"=>$ApusNoAs);
				$Proy = array("Proyecto"=>$Proyectos);
				$apu_producto = array("apu_producto"=>$s);
				$data= array("data"=>array_merge($Proy,$Apus,$Productos,$apu_producto,$ApusNoAsignadas));
				
 
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'message'=>'No existen registros',
                    'status'=>'404');
					$var = var2js($row);	
					echo $var;	                            
				}				
				break;
			case "add_apu":
			$idApu=$_POST['idApu'];
			$idProyecto=$_POST['idProyecto'];
			$appe=new Electry('electry_apu_proyecto');
			$tot=new Electry('electry_apu_proyecto_totales');
			
			//electry_subcategorias consulta aqui
		  $res = sql_select("t1.id,t1.idCategoria,
			t1.Codigo,t1.Descripcion,t1.Unidad,
			t1.Cantidad,t1.ValorUnitario,t1.image,
			t1.status",
			"electry_subcategorias t1",
			"t1.id='".$idApu."'");
				while ($row = sql_fetch($res)) {
					$shema= array(
						"id"=>$row['id'],
						"idCategoria"=>$row['idCategoria'],
						"IdApu"=>$idApu,
						"IdProyecto"=>$idProyecto,
						"Codigo"=>$row['Codigo'],
						"Descripcion"=>$row['Descripcion'],
						"Unidad"=>$row['Unidad'],
						"Cantidad"=>$row['Cantidad'],
						"ValorUnitario"=>$row['ValorUnitario'],
						"image"=>$row['image'],
						"status"=>'Inprogress',
						);
						
						$id[]=$appe->guardar($shema); 	
					}
					$appe=new Electry('electry_apu_proyecto');
					
					//actualiza tabla liquidaciones del proyecto	
					$total=new Electry('electry_apu_proyecto_totales');
					list($shem,$num)=$appe->AddLiquidaApu($idProyecto);
					if($num>0){
						$total->actualizar($shem,'id',intval($num));	
					}else{
						$id[]=$total->guardar($shem); 
					}
					
				if (!is_null($id)) {
				$data= array(
                    'id'=>1,
                    'menssage'=>'APU Adjuntada correctamente!',
                    'status'=>'202');					
					$var = var2js($data);
					echo $var;
				}else{
				$row[] = array(
                    'id'=>1,
                    'menssage'=>'::Error::Registro no Adjuntado',
                    'status'=>'404');
					$var = var2js($row);	
					echo $var;	                            
				}				
			
			
			break;
			case "update_apu":
				$pp=new Electry('electry_apu_proyecto');				
				$idApu=$_POST['idApu'];
				$idProyecto=$_POST['idProyecto'];
				$query1='IdApu="'.$_POST['idApu'].'" AND IdProyecto="'.$idProyecto.'"';
				$select_s='*';
				$c=$pp->consultadatos($query1,$select_s);
				$sce['ValorUnitario']=$_POST['valor'];
				$id=$c[0]['id'];
				$pp->actualizar($sce,'id',intval($id));
				//actualiza tabla liquidaciones del proyecto	
				list($shem,$num)=$pp->AddLiquidaApu($idProyecto);
				$total=new Electry('electry_apu_proyecto_totales');
				$total->actualizar($shem,'id',intval($num));
				
				$row[] = array(
                    'id'=>1,
                    'menssage'=>'Registro Actualizado',
                    'status'=>'202');
					$var = var2js($row);	
					echo $var;				
			break;
			case 'delete_apu':
				$apps=new Electry('electry_apu_proyecto');	
				$select1='*';
				$query1='id="'.$_POST['idApu'].'"';
				$rows=$apps->consultadatos($query1,$select1);
					foreach($rows as $a => $value){
					$id=$value['id'];
					sql_delete("electry_apu_proyecto","id=" . intval($id));
					}
					
				$apu=new Electry('electry_apu_producto_proyectos');	
				$select1='*';
				$query1='IdApu="'.$_POST['idApu'].'" AND IdProyecto="'.$_POST['idProyecto'].'"';
				$rows=$apu->consultadatos($query1,$select1);
					foreach($rows as $a => $value){
					$id=$value['id'];
					sql_delete("electry_apu_producto_proyectos","id=" . intval($id));
					}
				//actualiza tabla liquidaciones del proyecto	
				list($shem,$num)=$apps->AddLiquidaApu($_POST['idProyecto']);
				$total=new Electry('electry_apu_proyecto_totales');
				$total->actualizar($shem,'id',intval($num));
				
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;			
			case "update":
			
			if($_POST['Producto']=='APU'){
				$app=new Electry('electry_apu_proyecto');	
				$chartic['Cantidad']=$_POST['Cantidad'];
				$chartic['ValorUnitario']=$_POST['Total'];
				$app->actualizar($chartic,'id',$_POST['id']);
					$row[] = array(
                    'id'=>1,
                    'menssage'=>'La APU fue Actualizada correctamente!',
                    'status'=>'202');				
			}else{
				$app=new Electry('electry_apu_producto_proyectos');	
				$chartic['Cantidad']=$_POST['Cantidad'];
				$chartic['ValorUnitario']=$_POST['ValorUnitario'];
				$chartic['Total']=$_POST['Total'];
				$app->actualizar($chartic,'id',$_POST['id']);
				
				
				$row[] = array(
                    'id'=>1,
                    'menssage'=>'El Producto de la APU fue Actualizado correctamente!',
                    'status'=>'202');
				
			}
					
				$apps=new Electry('electry_apu_proyecto');	
				$select1='IdProyecto';
				$query1='id="'.$_POST['idApu'].'"';
				$rows=$apps->consultadatos($query1,$select1);
					foreach($rows as $a => $value){
					$idProyecto=$value['IdProyecto'];
					}					
				
				//actualiza tabla liquidaciones del proyecto	
				$total=new Electry('electry_apu_proyecto_totales');
				list($shem,$num)=$apps->AddLiquidaApu($idProyecto);				
				$total->actualizar($shem,'id',intval($num));
				
					$var = var2js($row);	
					echo $var;	
			break;
		}

?>
  
 