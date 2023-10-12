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
			case 'add_apu':
				
				$app_s=new Electry('electry_apu_proyecto');				
				$idApu=$_POST['idApu'];
				$idProyecto=$_POST['idProyecto'];
				$query1='IdApu="'.$idApu.'" AND IdProyecto="'.$idProyecto.'"';
				$select_s='*';
				$row_s=$app_s->consultadatos($query1,$select_s);
			if($row_s[0]["id"]==0){				
				
				$tbl='electry_subcategorias';
				$app=new Electry($tbl);				
				$idProyecto=$_POST['idProyecto'];
				$idApu=$_POST['idApu'];
				$query='id="'.$idApu.'"';
				$select='*';
				$row=$app->consultadatos($query,$select);
				 
				 $shema=array(
				 "idCategoria"=>$row[0]["idCategoria"],
				 "IdApu"=>$idApu,
				 "IdProyecto"=>$idProyecto,
				 "Codigo"=>$row[0]["Codigo"],
				 "Descripcion"=>$row[0]["Descripcion"],
				 "Unidad"=>$row[0]["Unidad"],
				 "Cantidad"=>$row[0]["Cantidad"],
				 "ValorUnitario"=>$row[0]["ValorUnitario"],
				 "image"=>$row[0]["image"],
				 "status"=>"Inprogress");
				
				$appe=new Electry('electry_apu_proyecto');
				$id_apu_proy=$appe->guardar($shema); 
				
				$apps=new Electry('electry_apu_productos');	
				$select1='*';
				$idProyecto=$_POST['idProyecto'];
				$query1='IdApu="'.$_POST['idApu'].'"';
				$rows=$apps->consultadatos($query1,$select1);
					foreach($rows as $a => $value){
					$shema_2=array(
						 "id_apu_proy"=>$id_apu_proy,
						 "IdApu"=>$idApu,
						 "IdProyecto"=>$idProyecto,
						 "Nombre"=>$value["Nombre"],
						 "Codigo"=>$value["Codigo"],
						 "Unidad"=>$value["Unidad"],
						 "Cantidad"=>$value["Cantidad"],
						 "ValorUnitario"=>$value["ValorUnitario"],
						 "Total"=>$value["Total"],
						 "Producto"=>$value["Producto"],
						 "status"=>"Inprogress");
						$appp=new Electry('electry_apu_producto_proyectos');
						$id[]=$appp->guardar($shema_2); 		 
				}
							
				if (!is_null($id)) {
				$data= array(
                    'id'=>1,
                    'menssage'=>'Registro Adjuntado',
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
			}else{
					$data[] = array(
                    'id'=>1,
                    'menssage'=>'APU Registrada',
                    'status'=>'202');
					$var = var2js($data);	
					echo $var;	 					
			}		
			break;
			
			case 'update_apu':
				$pp=new Electry('electry_apu_proyecto');				
				$idApu=$_POST['idApu'];
				$idProyecto=$_POST['idProyecto'];
				$query1='IdApu="'.$_POST['idApu'].'" AND IdProyecto="'.$idProyecto.'"';
				$select_s='*';
				$c=$pp->consultadatos($query1,$select_s);
				$sce['ValorUnitario']=$_POST['valor'];
				$id=$c[0]['id'];
				$pp->actualizar($sce,'id',intval($id));
				
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
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!');
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

													
?>
