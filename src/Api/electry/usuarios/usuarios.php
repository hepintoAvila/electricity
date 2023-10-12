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
		include_spip('inc/autoriser');
		include_spip('exec/model/electry/claseapi');
		
/**
 * Renvoyer des identifiants
 * @param int $id_auteur
 * @param bool $notifier
 * @param array $contexte
 * @return string
 */
function auteur_regenerer_identifiants($id_auteur, $notifier=true, $contexte = array()) {
	if ($id_auteur){
		$set = array();
		include_spip('inc/access');
		$set['pass'] = creer_pass_aleatoire();

		include_spip('action/editer_auteur');
		auteur_modifier($id_auteur,$set);

		$row = sql_fetsel('*','spip_auteurs','id_auteur='.intval($id_auteur));
		include_spip('inc/filtres');
		if ($notifier
			and $row['email']
			and email_valide($row['email'])
		  and trouver_fond($fond = 'modeles/mail_nouveaux_identifiants')){
			// envoyer l'email avec login/pass
			$c = array(
				'id_auteur' => $id_auteur,
				'nom' => $row['nom'],
				'mode' => $row['statut'],
				'email' => $row['email'],
				'pass' => $set['pass'],
			);
			// on merge avec les champs fournit en appel, qui sont passes au modele de notification donc
			$contexte = array_merge($contexte, $c);
			// si pas de langue explicitement demandee, prendre celle de l'auteur si on la connait, ou a defaut celle du site
			// plutot que celle de l'admin qui vient de cliquer sur le bouton
			if (!isset($contexte['lang']) or !$contexte['lang']) {
				if (isset($row['lang']) and $row['lang']) {
					$contexte['lang'] = $row['lang'];
				}
				else {
					$contexte['lang'] = $GLOBALS['meta']['langue_site'];
				}
			}
			lang_select($contexte['lang']);
			$message = recuperer_fond($fond, $contexte);
			include_spip("inc/notifications");
			notifications_envoyer_mails($row['email'],$message);
			lang_select();

			return $row['email'];
		}

		return false;

	}

	return '';
}
		 
		switch ($_POST['opcion']) {
			case 'consulta_auteur':
			
				//validamos usuarios y contraseña
				$session_login = _request('var_login');
				$session_password = _request('password');
				include_spip('inc/auth');
				$row = auth_identifier_login($session_login, $session_password);
				if($row['statut']=='0minirezo'){
					$statut='Administrador';
				}else{
					$statut=$row['statut'];
				}
			$app=new Electry("api_auteurs");
			$rows=$app->buscar_keys();
 
				$valeurs['Auth'][] = array(
				'status' => '202',
				'Nom' => $row['nom'],
				'Idsuario' => $row['id_auteur'],
				'Usuario' => $row['login'],
				'Email' => $row['email'],
				'Rol' => $row['tipo'],
				'Apikey' =>$rows['Apikey'],
				'ApiToken' =>$rows['ApiToken'],
				);
	
				$res = sql_select("*", "electry_permisos_usuarios", "Tipo=" . sql_quote($row['tipo']));
				while ($r = sql_fetch($res)) {
					$idTipo=$r['id'];
				}	
					$perm = sql_select("A.c AS ELECTRY_QUERY,A.a AS ELECTRY_ADD,A.u AS ELECTRY_UPDATE,A.d AS ELECTRY_DELETE, PU.Tipo as Rol,M.label AS opcion",
						"electry_autorizaciones as A,electry_permisos_usuarios as PU,menu_children_electric AS M",
						"A.rol='".$idTipo."' AND A.rol=PU.id AND A.opcion=M.id");
						while ($row = sql_fetch($perm)) {
							$menus['Permisos'][] = array('query'=>$row['ELECTRY_QUERY'],'add'=>$row['ELECTRY_ADD'],'update'=>$row['ELECTRY_UPDATE'],'delete'=>$row['ELECTRY_DELETE'],'opcion'=>$row['opcion']);					
						}				
 
				$data= array("data"=>array_merge($valeurs,$menus));
				if (!is_null($data)) {
					$var = var2js($data);
					echo $var;
				}else{
					$records['status'] = array('status'=>'404');
					$var = var2js($records);	
					echo $var;	                            
				}
					
			break;
	
			case 'lista_Usuarios':
				$DatosAuteurs=array();
				$select='*';
				$set = array();	
				
				$app=new Electry('api_auteurs');
				$auteurs=$app->consultadatos('id_auteur NOT IN (1,3)',$select);				
				foreach($auteurs as $a => $value){
					$DatosAuteurs['auteurs'][] = array(
                    'id'=>$value['id_auteur'],
					'login'=>$value['login'],
                    'email'=>$value['email'],
                    'rol'=>$value['tipo']
					);
					}
					
				//ROLES
				$app_roles=new Electry('electry_permisos_usuarios');
				$roles=$app_roles->consultadatos('',$select);				
				foreach($roles as $a => $val){
					$DatosRoles['roles'][] = array(
                    'value'=>$val['Tipo'],
                    'label'=>$val['Tipo']
					);
					}				
					$data = array("data"=>array_merge($DatosAuteurs,$DatosRoles));
					$var = var2js($data);
					echo $var;						
			break;
			case 'add':
					$desc=array();
					$id_ou_options=0;
					$login = trim(corriger_caracteres($_POST['login']));
					$mail =$_POST['email'];
					$res = sql_select("statut, id_auteur, login, email", "api_auteurs", "email=" . sql_quote($mail));
					if (!$r = email_valide($mail)or!$res) {
						$msg[] = array('menssage'=>'ERROR. El email ya existe');
						$var = var2js($msg);	
						echo $var;
						//break;
					}else{
						$options['tipo']=$_POST['rol'];
						$inscrire_auteur = charger_fonction('inscrire_auteur', 'action');
						$desc = $inscrire_auteur('', $mail, $login, $options);
						
						if (!is_null($desc)) {
							if($desc['pass']=='I'){$msg[] = array('menssage'=>'ERROR. El Usuario no se pudo guardar!');}else{$msg[] = array('id'=>1,'menssage'=>'Usuario guardado con exito! Su password es:'.$desc['pass'].', y el usuario: '.$desc['login'].'');};
						  }else{
							$msg[] = array('menssage'=>'¡ERROR!. El Usuario no se pudo guardar!','status' => '200');
						}	
							$var = var2js($msg);	
							echo $var;						
						
					}					
			break;
			case 'update':
					$chartic=array();
			
						$apps=new Electry('api_auteurs');
    					$chartic['login']=$_POST['login'];
    					$chartic['tipo']=$_POST['rol'];
						$apps->actualizar($chartic,'id_auteur',$_POST['id']);
						$msg[] = array('menssage'=>'OK. El Usuarios: '.$_POST['id'].'-'.$_POST['nombres'].' fue actualizado correctamente!','status' => '200');
						$var = var2js($msg);	
						echo $var;				
			
			break;
			case 'delete':
					sql_delete("api_auteurs","id_auteur=" . intval($_POST['id']));
					
					$res = sql_select("statut, id_auteur, login, email", "api_auteurs", "id_auteur=" . intval($_POST['id']));
					if ($res){
					$msg[] = array('menssage'=>'OK. El registro '.$_POST['id'].' fue eliminado correctamente!','status' => '200');
					}	
					
					$var = var2js($msg);	
					echo $var;					
			break;
			
			
		}

		/* CREAR UN USUARIO
		$id_ou_options=0;
		$nom = 'holmes11';
		$mail_complet ='holmes.pinto@itglobers.com';
		$options='';
		$inscrire_auteur = charger_fonction('inscrire_auteur', 'action');
		$desc = $inscrire_auteur('', $mail_complet, $nom, $options);
		$desc=Array
		(
			['email'] => 'xeee@unicesar.edu.co',
			['nom'] => 'holmes prueba',
			['prefs'] =>'' 
			['login'] => 'holmes_prueba3',
			['statut'] => 'nouveau',
			['lang'] => 'es',
			['id_auteur'] => '9',
			['pass'] => 'uUvkLLDaqjRiiphX',
			['jeton'] => '102092830564420a620825e6.79429982',
		);	
		*/												
?>
