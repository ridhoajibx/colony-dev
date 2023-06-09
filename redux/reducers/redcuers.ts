import { combineReducers } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import kanyeReducer from '../features/kanye/kanyeReducer';
import authReducers from '../features/auth/authReducers';
import propertyReducers from '../features/propertyAccess/propertyAccessReducers';
import domainReducers from '../features/domainAccess/domainAccessReducers';
import domainPropertyReducers from '../features/domain/domainProperty';

export const combinedReducer = combineReducers({
    //All reducer
    counter: counterSlice,
    kanyeQuote: kanyeReducer,
    authentication: authReducers,
    propertyAccess: propertyReducers,
    domainAccess: domainReducers,
    domainProperty: domainPropertyReducers
});