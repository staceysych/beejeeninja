import React, { Component } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import "./styles/main.scss";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/products/Header";
import SubHeader from "./components/products/SubHeader/SubHeader";
import HomePage from "./components/products/HomePage";
import ErrorBoundary from "./components/products/ErrorBoundary";
import CreateTaskModal from "./components/users/CreateTaskModal";
import LoginModal from "./components/users/Login";

import { IAppState } from "./utils/interfaces";

import store from "./redux/index";
import { Alert } from "./elements";

class AppContainer extends Component<{}, IAppState> {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            <SubHeader />
            <div className="container">
              <Switch>
                <Route component={HomePage} path="/" exact />
                <Route render={() => <Redirect to={{ pathname: "/" }} />} />
              </Switch>
            </div>
            <LoginModal />
            <CreateTaskModal />
            <Alert />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
