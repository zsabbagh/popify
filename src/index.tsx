import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './presenters/Router';
import './index.css';
import model from './models/Model';
import { observable, configure } from 'mobx';
import OnLoadPresenter from './presenters/OnLoadPresenter';

configure({ enforceActions: 'never' }); // we don't use Mobx actions
const reactiveModel = observable(model);

createRoot(document.getElementById('root') as any)
    .render(
        <React.StrictMode>
            <OnLoadPresenter />
            <Router model={reactiveModel} />
        </React.StrictMode>
    );
