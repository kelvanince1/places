import { AsyncStorage } from 'react-native';
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './ActionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../Screens/MainTabs/startMainTabs';
import App from '../../../App';

import { signUpUrl, signInUrl, refreshUrl } from './config';

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = signInUrl;
    if (authMode === 'signup') {
      url = signUpUrl
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.log(err);
      alert('Login failed. Please try again');
      dispatch(uiStopLoading());
    })
    .then(res => res.json())
    .then(parsedRes => {
      dispatch(uiStopLoading());
      if (!parsedRes.idToken) {
        alert('Login failed. Please try again')
      } else {
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken))
          startMainTabs();
      }
    });
  };
};

export const authSetToken = (token, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, expiryDate));
    AsyncStorage.setItem('pl:auth:token', token);
    AsyncStorage.setItem('pl:auth:refreshToken', refreshToken);
    AsyncStorage.setItem('pl:auth:expiryDate', expiryDate.toString());
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;
      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem('pl:auth:token')
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem('pl:auth:expiryDate')
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem('pl:auth:refreshToken')
          .then(refreshToken => {
            return fetch(refreshUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body: "grant_type=refresh_token&refresh_token=" + refreshToken
                })
          })
          .then(res => res.json())
          .then(parsedRes => {
            if(parsedRes.id_token) {
              console.log('Refreshed token worked');
              dispatch(authStoreToken(parsedRes.id_token, parsedRed.expires_in, parsedRes.refresh_token));
              return parsedRes.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
    })
    .then(token => {
      if (!token) {
        throw new Error();
      } else {
        return token;
      }
    });
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
    .then(token => {
      startMainTabs();
    })
    .catch(err => console.log('Failed to fetch token!'));
  }
}

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem('pl:auth:token');
    AsyncStorage.removeItem('pl:auth:expiryDate');
    return AsyncStorage.removeItem('pl:auth:refreshToken');
  }
};

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App();
      });
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
};
