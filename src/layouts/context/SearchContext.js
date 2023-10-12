import React, { createContext, useState, useCallback,useContext } from 'react';
import { DashboardContext } from '../../layouts/context/DashboardContext';
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const { itemsmenu,itemsmenuprincipal, itemUrl,setLoading,consultData} = useContext(DashboardContext);
  const [itemsForm, setItemsForm] = useState([{}]);
  const [itemsProgramas, setProgramas] = useState([]);
  const [itemPrograma, setItemPrograma] = useState([]);
  const [itemPeriodo, setPeriodo] = useState([]);
  const [validated, setValidated] = useState(false);
const onItemSedes = useCallback(
  (arg, date) => {
      if (date.target.value?.length > 0) {
          const items = [];
          let newItems = {
              id: items.length + 1,
              sede: date.target.value ? date.target.value : arg.sede,
              programa: arg.programa ? arg.programa : arg.programa,
              periodo: arg.periodo ? arg.periodo : arg.periodo,
              etiqueta: itemsmenu,
              itemsmenuprincipal: itemsmenuprincipal,
              itemUrl: itemUrl,
          };
          //console.log(newItems)
          items.push(newItems);
          setItemsForm(items);
          const url = `accion=programas&opcion=consulta&etiqueta=${itemsmenu}&sede=${date.target.value}&table=programas&datable=${itemsmenuprincipal}`;
          const respuesta = api.sendRequestData(`${url}`);
          respuesta.then(function (resp) {
              if (resp?.length > 0) {
                  setProgramas(resp);
              }
          });
      }
  },
  [itemsmenu, setProgramas, itemsmenuprincipal, itemUrl]
);

const onItemPeriodo = useCallback(
  (arg, date) => {
      if (date.target.value?.length > 0) {
          const items = [];
          let newItems = {
              id: items.length + 1,
              sede: arg.sede ? arg.sede : arg.sede,
              programa: arg.programa ? arg.programa : arg.programa,
              periodo: date.target.value ? date.target.value : arg.periodo,
              etiqueta: itemsmenu,
              itemsmenuprincipal: itemsmenuprincipal,
              itemUrl: itemUrl,
          };
          items.push(newItems);
          setItemsForm(items);
          const url = `accion=periodos&opcion=consulta&programa=${itemPrograma}&datable=${itemsmenuprincipal}`;
          const respuesta = api.sendRequestData(`${url}`);
          respuesta.then(function (resp) {
              if (resp?.length > 0) {
                  setPeriodo([resp]);
              }
          });
      }
  },
  [itemsmenu, itemsmenuprincipal, itemUrl, itemPrograma]
);

const onItemProgramas = useCallback(
  (arg, date) => {
      if (date?.target.value?.length > 0) {
          const items = [];
          let newItems = {
              id: items.length + 1,
              sede: arg?.sede ? arg.sede : arg?.sede,
              programa: date?.target.value ? date?.target.value : arg?.programa,
              periodo: arg.periodo ? arg.periodo : arg.periodo,
              etiqueta: itemsmenu,
              table: itemsmenuprincipal,
              itemUrl: itemUrl,
          };
          //console.log(newItems)
          items.push(newItems);
          setItemsForm(items);
          setItemPrograma(date?.target.value);
          sessionStorage.setItem(
              'ITEM_PROGRAM',
              JSON.stringify({ programa: date?.target.value, sede: arg?.sede ? arg.sede : arg?.sede })
          );
      }
  },
  [itemsmenu, itemsmenuprincipal, itemUrl]
);
const onSelectFecha = useCallback(
  (arg, date) => {
      if (date?.target.value?.length > 0) {
          const items = [];
          let newItems = {
              id: items.length + 1,
              sede: arg?.sede ? arg.sede : arg?.sede,
              fecha: date?.target.value ? date?.target.value : arg?.value,
              programa: itemsmenu,
              etiqueta: itemsmenu,
              table: itemsmenuprincipal,
              itemUrl: itemUrl,
          };
          //console.log(newItems)
          items.push(newItems);
          setItemsForm(items);
          sessionStorage.setItem(
            'ITEM_PROGRAM',
            JSON.stringify({ programa: itemsmenuprincipal, sede: arg?.sede ? arg.sede : arg?.sede })
        );
      }
  },
  [itemsmenu, itemsmenuprincipal, itemUrl]
);
const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
  } else {
      const isLoading = false;
      setLoading(isLoading);
      var itemUrl = document.getElementById('itemsmenuprincipal').value;
      const datosfiles = [...itemsForm];
      const queryDatos = datosfiles[0]
          ? Object.keys(datosfiles[0])
                .map((key) => key + '=' + datosfiles[0][key])
                .join('&')
          : '';
      const url = `accion=${itemUrl}&opcion=consultar&${queryDatos}`;

      const respuesta = api.sendRequestData(`${url}`);
      respuesta
          .then(function (resp) {
              if (resp?.items?.length > 0) {
                  consultData(resp, itemUrl);
              }
          })
          .catch((error) => console.error('Error:', error))
          .finally(() => {
              setLoading(true);
          })

      setValidated(true);
  }
};
const data = {
  itemsForm,
  itemsProgramas,
  itemPeriodo,
  onItemSedes,
  onItemPeriodo,
  onItemProgramas,
  itemPrograma,
  setPeriodo,
  handleSubmit,
  validated,
  onSelectFecha,
};

    // eslint-disable-next-line react/jsx-no-undef
    return (
      <>
          <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
      </>
  );
};
export { SearchContext, SearchProvider};
