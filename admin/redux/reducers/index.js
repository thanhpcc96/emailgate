import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import compilations from './compilations';
import users from './users';
import orders from './orders';
import user from './user';

const appReducer = combineReducers({
  form: formReducer,
  compilations,
  users,
  orders,
  user,
});

export default appReducer;
