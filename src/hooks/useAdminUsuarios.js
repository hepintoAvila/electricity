/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react'

import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useAdminUsuarios = () => {

  const [isLoading, setLoading] = useState(false);
  const [itemsAdminUsuarios, setAdminUsuarios] = useState([]);
  const [itemsRoles, setRoles] = useState([]);


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
            case 'Usuarios':
              setAdminUsuarios(response)
              break
              case 'Roles':
                setRoles(response)
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
      itemsAdminUsuarios,
      itemsRoles,

    }
  )
}

