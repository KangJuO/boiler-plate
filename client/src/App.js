import React, { Suspense }from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import NavBar from './components/views/NavBar/NavBar'
import Auth from './hoc/auth'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />
        <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
          </Switch>
        </div>
        
      </Suspense>
    </BrowserRouter>
  )
}

export default App


