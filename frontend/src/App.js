import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './components/session/login_form_container';
import SignupFormContainer from './components/session/signup_form_container';
import ProfileContainer from './components/profile/profile_container';
import FooterContainer from './components/footer/footer_container';
import HomePageContainer from './components/main/home_page_container';
import HeaderContainer from './components/header/header_container';
import { AuthRoute, ProtectedRoute } from './util/route_util';
import Modal from './components/modal/modal';
import PageNotFound from './components/main/page_not_found';
import WorkInProgress from './components/main/work_in_progress';

import './layout.scss';
import './assets/stylesheets/fontawesome/css/all.min.css'

const App = () => (
  <div id="app">
    <Route path="/" component={ HeaderContainer }/>
    <main className="main">
      <Modal modalType="general" id={ 0 } />
      <div className="main-content">
        <Switch>
          <AuthRoute exact path="/signup" component={ SignupFormContainer } />
          <AuthRoute exact path="/login" component={ LoginFormContainer } />
          <Route exact path="/wip" component={ WorkInProgress } />
          <ProtectedRoute exact path="/:userId" component={ ProfileContainer } />
          <Route exact path="/" component={ HomePageContainer } />
          <Route component={ PageNotFound } />
        </Switch>
      </div>
    </main>
    <Route path="/" component={ FooterContainer } />
  </div>
)

export default App;
