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
		
		$login = $GLOBALS['visiteur_session']['login'];
		$session_password = $GLOBALS['visiteur_session']['pass'];
		include_spip('inc/auth');
		$row = auth_informer_login($login);
		switch ($_POST['opcion']) {
			case 'consultar':
				$table='menu_usuarios_electric AS me,menu_electric AS m,menu_children_electric as mch,electry_permisos_usuarios as r,electry_autorizaciones as p';
				$app=new Electry($table);
				$select='p.id as idaut, me.id,m.label AS menu,mch.label AS submenu,r.Tipo AS rol,p.c as c,p.a as a,p.u as u,p.d as d, me.id as Idmenusr,p.id as Idpermiso, mch.id as Idmenuchildren,m.id as Idmenu, r.id AS Idpermisousr';
				$query='me.idMenu=m.id AND me.idChildren=mch.id AND me.idTipo=r.id AND (p.rol=me.idTipo AND p.opcion=me.idChildren)';
				$roles=$app->consultadatos($query,$select,$table);
				foreach($roles as $a => $val){
					$DatosRol['roles'][] = array(
							'id'=>$val['idaut'],
							'menu'=>''.$val['menu'].'',
							'submenu'=>$val['submenu'],
							'rol'=>$val['rol'],
							'c'=>$val['c'],
							'a'=>$val['a'],
							'u'=>$val['u'],
							'd'=>$val['d'],
							'items'=>array('Idmenusr'=>$val['Idmenusr'],'Idpermiso'=>$val['Idpermiso'],'Idmenuchildren'=>$val['Idmenuchildren'],'Idmenu'=>$val['Idmenu'],'Idpermisousr'=>$val['Idpermisousr']),
							);
				}	
					if (!is_null($DatosRol) and $row['id_auteur']==3) {
						$data = array("dataRoles"=>array_merge($DatosRol));
						$var = var2js($data);
					echo $var;	
					}else{
						$records['status'] = array('status'=>'404');
						$var = var2js($records);	
					echo $var;	 						
					}
										
			break;
			case 'update':
				$chartic=array();
				$apps=new Electry('electry_autorizaciones');		
				$idpermiso = $_POST['id'];				
				
				$chartic['c']=$_POST['c'];
				$chartic['a']=$_POST['a'];
				$chartic['u']=$_POST['u'];
				$chartic['d']=$_POST['d'];
				$apps->actualizar($chartic,'id',$_POST['id']);
						
						$msg[] = array('menssage'=>'OK. El Permiso: '._request('id').' fue actualizado correctamente!');
						$var = var2js($msg); 	
						echo $var;				
			break;
		}

													
?>
