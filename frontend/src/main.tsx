import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';

const persistConfig = {key: "root", version: 1};



ReactDOM.createRoot(document.getElementById('root')!).render(

    <App />

)
