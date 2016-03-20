import * as ActionTypes from '../constants';
import fetch from 'isomorphic-fetch';

import baseURL from '../../baseURL';

// User Actions
export function setUser(user) {
  return {
    type: ActionTypes.SET_USER,
    _id: user._id,
    email: user.email,
    name: user.name,
    errors: user.errors,
  };
}

export function setUserErrors(errors, reset = false) {
  return {
    type: ActionTypes.SET_USER_ERRORS,
    errors,
    reset,
  };
}

export function clearUser() {
  return {
    type: ActionTypes.CLEAR_USER,
  };
}

export function getUser() {
  console.log('getting user');
  return (dispatch) => {
    fetch(`${baseURL}/api/user`, {
      credentials: 'include',
    })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('User not found');
      } else if (res.status >= 400) {
        throw new Error(`Bad response from server ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      dispatch(setUser(res));
    })
    .catch((err) => {
      console.log(err);
      dispatch(clearUser());
    });
  };
}

export function logoutUser() {
  console.log('logout user');
  return (dispatch) => {
    return fetch(`${baseURL}/api/logout`, {
      credentials: 'include',
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`Bad response from server when trying to logout ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      dispatch(clearUser());
    })
    .catch((err) => {
      console.log(err.message);
    });
  };
}

export function registerUser(userData) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/register`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`Bad response from server ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      dispatch(setUser(res));
    })
    .catch((err) => {
      dispatch(setUserErrors({ base: [err.message] }));
    });
  };
}

export function loginUser(userData) {
  return (dispatch) => {
    return fetch(`${baseURL}/api/login`, {
      credentials: 'include',
      method: 'post',
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('User not found');
      } else if (res.status >= 400) {
        throw new Error(`Bad response from server ${res.status} ${res.statusText}`);
      }

      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error.message);
      }
      dispatch(setUser(res));
    })
    .catch((err) => {
      dispatch(setUserErrors({ base: [err.message] }));
    });
  };
}