/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react'

import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useGestionPrecios = () => {

  const [isLoading, setLoading] = useState(false);
  const [itemsApu, setApu] = useState([]);
  const [itemsCategorias, setCategorias] = useState([]);
  const [itemsEditorApu, setEditorApu] = useState([]);
  const [itemsParametroPrecio, setParametroPrecio] = useState([]);
  const [itemsconsultarById, setconsultarById] = useState([]);

//QUERY DE RESPUSTA DE CONSULTAS
const query = useCallback((itemUrl, itemsmenuprincipal, opcion) => {
  setLoading(true);
  setTimeout(function () {
  let varibles;
  let datos = opcion;
  if (opcion) {
    var queryString = datos[0]
      ? Object.keys(datos[0])
        .map((key) => key + '=' + datos[0][key])
        .join('&')
      : '';
    varibles = queryString;
  }
  const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&${varibles}`;
  const datosMaterial = api.sendRequestData(`${url}`);
  datosMaterial?.then(function (response) {
    try {

      {
        (() => {
          switch (datos[0]?.obj) {
            case 'APU':
              setApu(response)
            break
            case 'Categorias':
              setCategorias(response)
            break
            case 'EditorPUA':
              setEditorApu(response)
            break
            case 'ParametroPrecio':
              setParametroPrecio(response)
            break
            case 'consultarById':
              setconsultarById(response)
            break
          }
        })()
      }
    } catch (error) {
      console.error(error);
    }
  })
    .catch((error) => console.error('Error:', error))
    .finally(() => {
     setTimeout(function () {
     setLoading(false);
      }, 1000);
    });
  }, 2000);
}, []);
  return (
    {
      query,
      isLoading,
      itemsApu,
      itemsCategorias,
      itemsEditorApu,
      itemsParametroPrecio,
      itemsconsultarById,
    }
  )
}

