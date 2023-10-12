
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
 	   
	 
	   $login = $GLOBALS['visiteur_session']['login'];
		$session_password = $GLOBALS['visiteur_session']['pass'];
		include_spip('inc/auth');
		$aut = auth_informer_login($login);
		
		switch ($_POST['opcion']) {
		case 'consultar':
			$menus=array();
			$IdMenu = base64_decode($_POST['IdMenu']);
				$res = sql_select("*", "electry_permisos_usuarios", "Tipo=" . sql_quote($IdMenu));
				while ($r = sql_fetch($res)) {
					$idTipo=$r['id'];
				}	
			$perm = sql_select("A.c AS ELECTRY_QUERY,A.a AS ELECTRY_ADD,A.u AS ELECTRY_UPDATE,A.d AS ELECTRY_DELETE, PU.Tipo as Rol,M.label AS opcion",
				"electry_autorizaciones as A,electry_permisos_usuarios as PU,menu_children_electric AS M",
				"A.rol='".$idTipo."' AND A.rol=PU.id AND A.opcion=M.id");
				while ($row = sql_fetch($perm)) {
					$menus['Permisos'][] = array('query'=>$row['ELECTRY_QUERY'],'add'=>$row['ELECTRY_ADD'],'update'=>$row['ELECTRY_UPDATE'],'delete'=>$row['ELECTRY_DELETE'],'opcion'=>$row['opcion']);					
				}				
				 
				if($aut['id_auteur']==3){
					$ouput = var2js($menus);
					echo $ouput; 
				}else{
					$records['status'] = array('status'=>'404');
					$var = var2js($records);	
					echo $var;	 
				}
				break;
 			case 'configurar':
			echo 'No registrado';
			break;
			
		}	
			
										
?>







