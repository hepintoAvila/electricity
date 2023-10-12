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
include_spip('inc/filtres_boites');
include_spip('inc/boutons');
include_spip('inc/pipelines_ecrire');
include_spip('inc/filtres_dates');
include_spip('base/connect_sql');

 abstract class PagesElectry {
        public function __construct() {
		//$this->periodoacademico_id=$periodoacademico_id;		
        } 
		abstract function buscar_keys();
		abstract function guardar($chartic);
		abstract function consultadatos($query,$select);
		abstract function actualizar($chartic,$id_nom,$id);
		abstract function codigo($id_max);
		abstract function dias_restantes_mes();
		abstract function consultamenu($query,$select,$table);
		abstract function generarCodigo($producto);
		abstract function codigo_categorias($array,$cifra);
		abstract function buscar_apus_proyecto($IdApu,$IdProyecto);
		abstract function convertirCifrasMiles($numero);
		abstract function sumaCampo($campo,$query);
 }
 class Electry extends PagesElectry
{
         public $table;
		public function __construct($table)
         {			
			$this->table=$table;
		 }
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : sumainventario()
		 * Parametros de entrada : $idReferencia
		 * Parametros de Salida: num SELECT SUM(inventario) AS inventario FROM `instrum_instrumentos` WHERE idReferencia='2' ORDER BY `idCategorias` ASC
		 */				
		public function sumaCampo($campo,$query){
		 
			$sql = sql_select("SUM(".$campo.") AS total",''.$this->table.'',$query);
				while ($row = sql_fetch($sql)) {	
					return $this->convertirCifrasMiles($row['total']);		
				  }	
 
		}		 
		function convertirCifrasMiles($numero) {
		$partes = explode('.', $numero);
		  $parteEntera = $partes[0];
		  $parteDecimal = isset($partes[1]) ? $partes[1] : '';

		  // Obtener el número de grupos de miles y millones
		  $numGruposMillones = ceil(strlen($parteEntera) / 3);
		  $numGruposMiles = ceil((strlen($parteEntera) - ($numGruposMillones * 3)) / 3);

		  // Formatear la parte entera con separadores de miles y millones
		  $parteEnteraFormateada = number_format($parteEntera, 0, '', ',');

		  // Reemplazar las comas de los grupos de miles por puntos
		  $parteEnteraFormateada = str_replace(',', '.', $parteEnteraFormateada);

		  // Concatenar la parte entera formateada con la parte decimal
		  $cadena = $parteEnteraFormateada . '.' . $parteDecimal;

		  return $cadena;
		  }
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : buscar_apus_proyecto($idapu,$idproy)
		 * Parametros de entrada : $select,$query:
		 * Parametros de Salida:  $row['id']
		 */			
		public function buscar_apus_proyecto($IdApu,$IdProyecto){
			$res = sql_select("*",
			''.$this->table.'',
			"id_apu_proy='".$IdApu."' AND IdProyecto='".$IdProyecto."'");
				while ($row = sql_fetch($res)) {
					$res_prod = sql_select("*",
					'electry_apu_productos',
					"IdApu='".$IdApu."'");
					while ($rowp = sql_fetch($res_prod)) {
					$rprod[]=array(
						"id"=>$rowp['id'],
						"IdApu "=>$rowp['IdApu'],
						"Codigo"=>$rowp['Codigo'],
						"Descripcion"=>$rowp['Nombre'],
						"Unidad"=>$rowp['Unidad'],
						"Cantidad"=>$rowp['Cantidad'],
						"ValorUnitario"=>$this->convertirCifrasMiles($rowp['ValorUnitario']),
						"Total"=>$this->convertirCifrasMiles($rowp['Total']),
						"Producto"=>$rowp['Producto'],
						);
					$totalesp[]=$rowp['Total'];
					$ValorUnitariop[]=$rowp['ValorUnitario'];			
					}
					$rprod[]=array(
						"id"=>'',
						"IdApu"=>$IdApu,
						"Codigo"=>'NTT',
						"Descripcion"=>'SUBTOTALES',
						"Unidad"=>'',
						"Cantidad"=>'',
						"ValorUnitario"=>'$'.$this->convertirCifrasMiles(array_sum($ValorUnitariop)),
						"Total"=>'$'.$this->convertirCifrasMiles(array_sum($totalesp)),
						"Producto"=>array(),
						);
					$datos[]= array(
						"id"=>$row['id'],
						"id_apu_proy "=>$row['id_apu_proy'],
						"IdApu "=>$row['IdApu'],
						"IdProyecto"=>$row['IdProyecto'],
						"Codigo"=>$row['Codigo'],
						"Descripcion"=>$row['Nombre'],
						"Unidad"=>$row['Unidad'],
						"Cantidad"=>$row['Cantidad'],
						"ValorUnitario"=>$this->convertirCifrasMiles($row['ValorUnitario']),
						"Total"=>$this->convertirCifrasMiles($row['Total']),
						"Producto"=>$row['Producto'],
						"status"=>$row['status'],
						"Productos"=>array($rprod),
						);
				$totales[]=$row['Total'];
				$ValorUnitario[]=$row['ValorUnitario'];
				}
			 
	 			$datosB[]= array(
						"id"=>'',
						"id_apu_proy"=>$IdApu,
						"IdApu"=>$IdApu,
						"IdProyecto"=>$IdProyecto,
						"Codigo"=>'',
						"Descripcion"=>'',
						"Unidad"=>'',
						"Cantidad"=>'',
						"ValorUnitario"=>'$'.$this->convertirCifrasMiles(array_sum($ValorUnitario)),
						"Total"=>'$'.$this->convertirCifrasMiles(array_sum($totales)),
						"Producto"=>'',
						"status"=>'',
						"Productos"=>array(),
						);
					$data= array_merge($datos,$datosB);
				return $data;
		}		 
		 /*
		 función codigo_categorias() de PHP para crear un código 
		 que anteponga dos ceros a cifras menores de 10
		 */		 
		function codigo_categorias($array,$cifra) {
			foreach($array as $a => $value){
			$chartic['codigo'][]=$value['num'];
			}
				foreach ($chartic['codigo'] as $elemento) {
					if (strpos($elemento,$cifra) === 0) {
					$codigo['codigo'][]=$elemento;
				}
			}
			$maximo = 0;
			foreach ($codigo['codigo'] as $elemento) {
				if ($elemento > $maximo) {
					$maximo = $elemento;
				}
			}
			
			$value=$maximo+1;
			$segm1=substr($value,0,2);
			$segm2=substr($value,2,4);	
			return $segm1.'.'.$segm2;
		}		 
		 
		 /*
		 función sprintf() de PHP para crear un código 
		 que anteponga dos ceros a cifras menores de 10
		 */
			function generarCodigo($producto) {
				$numero=sql_countsel('electry_productos', "Producto='".$producto."'")+1;
				$cod=substr($producto,0,3);
			  if ($numero < 10) {
				  $codigo="".$cod."-00".$numero;
			  } else {
				  $codigo="".$cod."-".$numero;
			  }
			  return $codigo;
			}		 
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : query:
		 * Parametros de Salida:  row
		 */			
		public function consultamenu($query,$select,$table){
			$sql = sql_select(''.$select.'',''.$table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $datos[]=$row; 
				}
			 	return $datos;
		}			 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : dias_restantes_mes()
		 * Parametros de entrada : 
		 * Parametros de Salida: num
		 */				
		public function dias_restantes_mes() {
				date_default_timezone_set('America/Bogota');
				$sql = sql_select("*",'electry_nomina',"Estado='Procesando'");
				while ($row = sql_fetch($sql)) {	
					$FechaFinal=$row['FechaFinal'];		
					$id=$row['id'];		
				  }	
				 $dt = new DateTime($FechaFinal);
				 $ultimo_dia_mes = $dt->format('j');				  
			     $hoy = date("j"); // Obtener el día actual
				 $dias_restantes = $ultimo_dia_mes - $hoy; // Calcular los días restantes
			 
				return array($dias_restantes,$id);
		}	 
		/**
		 * Retorno los parametros para consultar el valor id maximo
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : codigo()
		 * Parametros de entrada : 
		 * Parametros de Salida: num
		 */				
		public function codigo($id_max){
			$args = func_get_args();
			$this->id_max = $id_max;
			 
			$sql = sql_select("MAX($id_max) AS id_max",''.$this->table.'');
				while ($row = sql_fetch($sql)) {	
					return $row['id_max']+1;		
				  }	
		}		 
			/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : buscar_keys()
		 * Parametros de entrada : $query,$select,$id_user,$idMenu,$idChildren:
		 * Parametros de Salida:  row
		 */			
		public function buscar_keys(){
			$select="login AS Userkey,pass AS Passkey";
			$query="id_auteur='3'";
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {
						 $datos['Apikey']=$row['Userkey'];
						 $datos['ApiToken']=$row['Passkey'];
					
				}
				return $datos;
		}	
		/**
		 * Retorno los parametros para guardar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : general_gardar_registro()
		 * Parametros de entrada :$chartic=array(),$table
		 * Parametros de Salida: 
		 */ 
		function guardar($chartic=array()){

			if ($set) {
			$chartic = array_merge($chartic, $set);
			}					
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
				$id=sql_insertq("".$this->table."", $chartic);
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
			return $id;
		}
				/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : actualizar()
		 * Parametros de entrada :$chartic=array(),$id_nom,$id
		 * Parametros de Salida: 
		 */ 		
		
		function actualizar($chartic=array(),$id_nom,$id){

			if ($set) {
			$chartic = array_merge($chartic, $set);
			}					
			$chartic = pipeline('pre_insertion',
				array(
					'args' => array(
					'table' => ''.$this->table.'',
				),
				'data' => $chartic
				)
			);							
 
			sql_updateq("".$this->table."",$chartic,"".$id_nom."='".$id."'");
			pipeline('post_insertion',
			array(
				'args' => array(
				'table' =>''.$this->table.'',
				'id_objet' => $id
				),
				'data' => $chartic
				)
			);
		}
		/**
		 * Retorno los parametros para actualizar en una tabla
		 * Autor: HOLMES ELIAS PINTO  AVILA
		 * Nombre de la Funcion : datosusuario()
		 * Parametros de entrada : query:
		 * Parametros de Salida:  row
		 */			
		public function consultadatos($query,$select){
			$sql = sql_select(''.$select.'',''.$this->table.'',''.$query.'');
				while ($row = sql_fetch($sql)) {	
					  $datos[]=$row; 
				}
			 	return $datos;
		}			
}