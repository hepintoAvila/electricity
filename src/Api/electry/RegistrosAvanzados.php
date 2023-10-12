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
		
		switch($_POST['tipo']) {	
				case "Categorias":
					include_spip('exec/model/electry/Categorias/Categorias');		    
				break;
				case "EditorPUA":
					include_spip('exec/model/electry/Categorias/subCategorias');		    
				break;
				case "Apu":case "consultar_trasporte":case "APU":
					include_spip('exec/model/electry/apu/apu');		    
				break;
				case "ParametroPrecio":
					include_spip('exec/model/electry/ParametroPrecio/ParametroPrecio');		    
				break;
					
		}

?>
  
 