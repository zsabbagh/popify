import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Router from './presenters/Router';
import './index.css';
import model from './models/Model';
import { observable, configure } from 'mobx';
import { fetchUser } from './utils/spotifyFetcher';
import { getOrRegisterUser } from './utils/firebase';

configure({ enforceActions: 'never' }); // we don't use Mobx actions
const reactiveModel = observable(model);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router model={reactiveModel} />
  </React.StrictMode>
);
