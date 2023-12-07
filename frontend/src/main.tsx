import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import userReducer from "./redux/user/index.ts";
import uiReducer from './redux/ui/index.ts';
const persistConfig = { key: "root", storage, version: 1, };

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <App/>
        </PersistGate>
    </Provider>
);
