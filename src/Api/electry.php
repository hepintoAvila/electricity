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

 use Spip\Chiffrer\SpipCles;

if (!defined('_ECRIRE_INC_VERSION')) {
	return;
}
		include_spip('base/connect_sql');
		include_spip('inc/filtres_ecrire');
		include_spip('inc/filtres');
		include_spip('inc/utils');
		include_spip('inc/json');
		include_spip('exec/model/claseapi');
		
header("Content-Type: application/json");

function exec_electry_dist(){
	
		switch($_POST['accion']) {	
				case "auteur":
					include_spip('exec/model/electry/usuarios/usuarios');		    
				break;
				case "menu":
					include_spip('exec/model/menu/menu');		    
				break;
				case "permisos":
					include_spip('exec/model/electry/permisos/permisos');		    
				break;
				case "GestionFinanciera":
					include_spip('exec/model/electry/GestionFinanciera');		    
				break;
				case "GestionPrecios":
					include_spip('exec/model/electry/GestionPrecios');		    
				break;
				case "GestionProductos":
					include_spip('exec/model/electry/GestionProductos');		    
				break;
				case "OtrosRegistros":
					include_spip('exec/model/electry/OtrosRegistros');		    
				break;
				case "GestionProyecto":
					include_spip('exec/model/electry/GestionProyecto');		    
				break;
				case "AdminUsuarios":
					include_spip('exec/model/electry/AdminUsuarios');		    
				break;
		}
}
?>
  
 