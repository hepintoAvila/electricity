import axios from 'axios';
import encodeBasic from '../../utils/encodeBasic';
import { environments } from '../../environments/environments';
import config from '../../config';
// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;
axios.defaults.baseURL = config.REACT_APP_LOGIN_API;
axios.defaults.baseURL = config.REACT_APP_PASSWORD_API;

// Singleton para gestionar la sesión del usuario
const Session = (function () {
  let instance;

  function createInstance() {
    let _user = JSON.parse(sessionStorage.getItem('hyper_user')) || {};

    function getUser() {
      return _user;
    }

    function setUser(user) {
      _user = user;
      sessionStorage.setItem('hyper_user', JSON.stringify(user));
    }

    function clearUser() {
      _user = {};
      sessionStorage.removeItem('hyper_user');
    }

    return {
      getUser,
      setUser,
      clearUser
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();


// Facade para llamar a la API
const APIFacade = (function () {
  function sendRequestData(url) {
    const authOptions = {
      url: `${environments.baseURL}${url}&Apikey=${Session.getInstance().getUser()[0]?.Apikey}&ApiToken=${Session.getInstance().getUser()[0]?.ApiToken}`,
      method: 'GET',
      headers: {
        ...axios.defaults.headers,
        Authorization: `Basic ${encodeBasic(environments.loginAPI, environments.passwordAPI)}`,
      },
    };
    return fetch(url,authOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      });
  }

  return {
    sendRequestData
  };
})();

// Factory Method para crear objetos Permiso
const PermisoFactory = (function () {
  const permisosCache = {};

  function createPermiso(itemUrl, permisos) {
    if (permisosCache[itemUrl]) {
      return permisosCache[itemUrl];
    }

    const permiso = permisos.find(row => row.opcion === itemUrl) || {
      query: 'N',
      add: 'N',
      update: 'N',
      delete: 'N',
      opcion: itemUrl,
      userInfo: Session.getInstance().getUser()[0]?.role
    };

    permisosCache[itemUrl] = permiso;

    return permiso;
  }

  return {
    createPermiso
  };
})();

/*
// Función mejorada con los patrones de diseño
const onPermisos = useCallback((itemUrl) => {
  setTimeout(function () {
    const user = Session.getInstance().getUser();
    if (!user.length) {
      return;
    }

    const url = `accion=permisos&opcion=consultar&IdMenu=${encodeBasicUrl(user[0]?.role)}`;
    APIFacade.sendRequestData(url)
      .then(response => {
        const permiso = PermisoFactory.createPermiso(itemUrl, response?.Permisos || [{}]);
        setpermisos(permiso);
      })
      .catch(error => console.error(error));
  }, 1000);
}, []);

*/
export {APIFacade,PermisoFactory,Session};
