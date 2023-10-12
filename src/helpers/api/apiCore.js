import jwtDecode from 'jwt-decode';
import axios from 'axios';
import encodeBasic from '../../utils/encodeBasic';
import { environments } from '../../environments/environments';
import config from '../../config';

// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;
axios.defaults.baseURL = config.REACT_APP_LOGIN_API;
axios.defaults.baseURL = config.REACT_APP_PASSWORD_API;

// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;

    if (error && error.response && error.response.status === 404) {
      // window.location.href = '/not-found';
    } else if (error && error.response && error.response.status === 403) {
      window.location.href = '/access-denied';
    } else {
      switch (error.response.status) {
        case 401:
          message = 'Invalid credentials';
          break;
        case 403:
          message = 'Access Forbidden';
          break;
        case 404:
          message = 'Sorry! the data you are looking for could not be found';
          break;
        default: {
          message =
            error.response && error.response.data ? error.response.data['message'] : error.message || error;
        }
      }
      return Promise.reject(message);
    }
  }
);

const AUTH_SESSION_KEY = 'hyper_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
  else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
  const user = sessionStorage.getItem(AUTH_SESSION_KEY);
  return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
const get = async (url, authOptions) => {
  try {
    const urls = `${environments.baseURL}${url}`;
    const response = await fetch(urls, authOptions);
    return  await response.json();
  } catch (err) {
    console.error(err);
  }
};
class APICore {

  generateToken = (user, tokenSecret, tokenMaxAge) => {
    var jwt = require('jsonwebtoken');
    let token = '';

    var u = {
      id: user.id,
      exp: Math.floor((Date.now() + tokenMaxAge) / 1000),
    };

    token = jwt.sign(u, tokenSecret, {
      expiresIn: 60 * 60 * 24, // expires in 24 hours
    });
    return token;
  }
  getApiKey = () => {
    let userInfo = sessionStorage.getItem('hyper_user');
    const params = {
      IdUsuario: userInfo?.id,
      username: environments.loginAPI,
      password: environments.passwordAPI
    }
    return params;
  };

  sendFile = (url, data) => {
    const sendRequest = async () => {
      try {
        const auth_token = encodeBasic(`${environments.loginAPI}:${environments.passwordAPI}`);
        const config = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              ...axios.defaults.headers,
              'enctype': 'multipart/form-data',
              Authorization: `Basic ${auth_token}`,
          },
      };
      const response = await fetch(`${environments.baseURL}${url}`, config);
      const resp = JSON.parse(await response.text());
      return resp;

      } catch (err) {
          console.error(err);
      }
  };
  return sendRequest();
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url, data) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url) => {
    return axios.delete(url);
  };
  /*CONSULTA DATA*/
  sendRequestData = (url) => {
    let userInfo = sessionStorage.getItem('hyper_user');
    const user = JSON.parse(userInfo);
    if(user){
    const authOptions = {
      url: `${environments.baseURL}${url}&Apikey=${user[0]?.Apikey}&ApiToken=${user[0]?.ApiToken}`,
      method: 'GET',
      headers: {
        ...axios.defaults.headers,
        Authorization: `Basic ${encodeBasic(environments.loginAPI, environments.passwordAPI)}`,
      },
    };
    return get(url, authOptions);
    }
  };

  /*CONSULTA USUARIOS*/
  sendRequestUser = (url, username, password) => {
    const authOptions = {
      method: 'GET',
      headers: {
        Url: `${environments.baseURL}&${url}&username=${username}`,
        ...axios.defaults.headers,
        Authorization: `Basic ${encodeBasic(username, password)}`,
      },
    };
    return get(url, authOptions);
  };


  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();
    if (!user || (user && !user.token)) {
      return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  };

  setLoggedInUser = (session) => {
    if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromSession();
  };

  setUserInSession = (modifiedUser) => {
    let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };

}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
  const { token } = user;
  if (token) {
    setAuthorization(token);
  }
}
export { APICore, setAuthorization };
