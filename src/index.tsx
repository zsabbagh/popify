import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router"
import "./index.css";
import Topbar from "./presenters/topbarPresenter";
import userModel from "./models/UserModel";
import loginUrl from "./spotifyAuthorization";

import { observable, configure } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(userModel);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const pages = ["Statistics", "Quiz"];
const settings = ["Logout"];

root.render(
  <React.StrictMode>
    <Topbar pages={pages} settings={settings} model={reactiveModel} loginUrl={loginUrl}/>
    <Router userModel={reactiveModel}/>
  </React.StrictMode>
);

