import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';
import model from './Model';
import { observable, configure } from 'mobx';
import loginUrl from "./spotifyAuthorization";
configure({ enforceActions: 'never' }); // we don't use Mobx actions
const reactiveModel = observable(model);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router model={reactiveModel}/>
  </React.StrictMode>
);

