<?php
/**
 *
 * @About:      API Interface
 * @File:       index.php
 * @Date:       $Date:$ febrero-2022
 * @Version:    $Rev:$ 1.0
 * @Developer:  Holmes Pinto (holmespinto@gmail.com)
 **/
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: text/html; charset=utf-8");
// Si no se han enviado encabezados, enviar uno
 
if (headers_sent()) {
    header('Location: https://api.compucel.co/v2/');
    exit;
}
function mb_pathinfo($filepath) {
    preg_match('%^(.*?)[\\\\/]*(([^/\\\\]*?)(\.([^\.\\\\/]+?)|))[\\\\/\.]*$%im',$filepath,$m);
    if($m[1]) $ret['dirname']=$m[1];
    if($m[2]) $ret['basename']=$m[2];
    if($m[5]) $ret['extension']=$m[5];
    if($m[3]) $ret['filename']=$m[3];
    return $ret;
}
function getRequestUser($varibles,$refer = "", $timeout = 10, $header = [])
{
  	
	
	$urls = "https://api.compucel.co/ecrire/?exec=electry&bonjour=oui"; 
    $url = "https://api.compucel.co/ecrire/?exec=electry";   
	$ha = base64_decode( substr($_SERVER['HTTP_AUTHORIZATION'],6) );
	list($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) = explode(':', $ha);			
    $data = array('var_login' =>$_SERVER['PHP_AUTH_USER'],'password' =>$_SERVER['PHP_AUTH_PW']);
	$POSTFIELDS = array_merge($varibles, $data); 
    $ch = curl_init();
	
    $ssl = stripos($urls,'https://') === 0 ? true : false;
    $options = [
        CURLOPT_URL => $urls,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => 1,
		CURLOPT_USERPWD=>$data['var_login'].':'.$data['password'],
        CURLOPT_POSTFIELDS => $POSTFIELDS,
        CURLOPT_FOLLOWLOCATION => 1,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_AUTOREFERER => 1,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)',
        CURLOPT_TIMEOUT => 3000,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
        CURLOPT_HTTPHEADER => ['Expect:'],
        CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
        CURLOPT_REFERER => $refer
    ];
     
    if (!empty($header)) {
        $options[CURLOPT_HTTPHEADER] = $header;
    }
    if ($refer) {
        $options[CURLOPT_REFERER] = $refer;
    }
    if ($ssl) {
        //support https
        $options[CURLOPT_SSL_VERIFYHOST] = false;
        $options[CURLOPT_SSL_VERIFYPEER] = false;
    }
    curl_setopt_array($ch,$options);

 //$httpcode = curl_getinfo($ch, 'CURLINFO_HTTP_CODE');
    $returnData = curl_exec($ch);

    if (curl_errno($ch)) {
        //error message
        $returnData = curl_error($ch);
         
    }
    curl_close($ch);
    return $returnData;
    
    
}
function getRequestDatos($varibles,$refer = "", $timeout = 10, $header = [])
{
  	
	
	$urls = "https://api.compucel.co/ecrire/?exec=electry&bonjour=oui"; 
    $url = "https://api.compucel.co/ecrire/?exec=electry";   
	$ha = base64_decode( substr($_SERVER['HTTP_AUTHORIZATION'],6) );
	$PHP_AUTH_USER = explode(':', $ha);
    $data = array('var_login' =>$PHP_AUTH_USER[0],'password' =>$PHP_AUTH_USER[1]);
	$POSTFIELDS = array_merge($varibles, $data); 
    $ch = curl_init();
	
    $ssl = stripos($urls,'https://') === 0 ? true : false;
    $options = [
        CURLOPT_URL => $urls,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => 1,
		CURLOPT_USERPWD=>$data['var_login'].':'.$data['password'],
        CURLOPT_POSTFIELDS => $POSTFIELDS,
        CURLOPT_FOLLOWLOCATION => 1,
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_AUTOREFERER => 1,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)',
        CURLOPT_TIMEOUT => 3000,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
        CURLOPT_HTTPHEADER => ['Expect:'],
        CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
        CURLOPT_REFERER => $refer
    ];
     
    if (!empty($header)) {
        $options[CURLOPT_HTTPHEADER] = $header;
    }
    if ($refer) {
        $options[CURLOPT_REFERER] = $refer;
    }
    if ($ssl) {
        //support https
        $options[CURLOPT_SSL_VERIFYHOST] = false;
        $options[CURLOPT_SSL_VERIFYPEER] = false;
    }
    curl_setopt_array($ch,$options);

 //$httpcode = curl_getinfo($ch, 'CURLINFO_HTTP_CODE');
    $returnData = curl_exec($ch);

    if (curl_errno($ch)) {
        //error message
        $returnData = curl_error($ch);
         
    }
    curl_close($ch);
    return $returnData;
    
    
}

	switch($_GET['accion']) {
		case "auteur":
			$str=explode('&',$_SERVER['HTTP_URL']);
			$username=explode('=',$str[3]);
			$user=explode('=',$username[1]);
			$r['username']=$user[0];
			$varibles = array_merge($r,$_GET);
			$getRes = getRequestUser($varibles );
			echo $getRes;
			break;
			case "permisos":
			case "menu":
			case "GestionFinanciera":
			case "GestionProductos":
			case "GestionPrecios":
			case "GestionProyecto":
			case "AdminUsuarios":
				
				//para las imagenes guarde en el servidor
				if($_GET['opcion']=='add_imagen_apu'){
					if (is_numeric($_GET['idApu'])) {
					$dir_img='../IMG/electry/';
					$datos = json_decode(file_get_contents('php://input'), true);
					$decodedImage = base64_decode($datos);
					$filename = $_GET['filename'];
					$type=$_GET['type'];
					$extension = str_replace("image/", '', $type);
					
					$destino=$dir_img.$extension.'/';
							//crear el directorio sino existe
							$path = $dir_img.$extension.'';
							if (!is_dir($path)) {
								mkdir($path, 0777, true);
								closedir($destino);
							}		
					$ubicacionPermanente = $destino . $_GET['idApu'].'.'.$extension.'';
					file_put_contents($ubicacionPermanente, $decodedImage);
					}
				}
				$getRes = getRequestDatos($_GET);
				echo $getRes;
			break;
	}

?>