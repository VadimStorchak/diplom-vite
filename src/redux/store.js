import {createStore, applyMiddleware} from 'redux';
import {reducer} from "./reduser";
import {thunk} from 'redux-thunk'

// @ts-ignore
const store = createStore(reducer, applyMiddleware(thunk));

export default store;