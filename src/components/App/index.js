import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Navigation from '../Navigation'
import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import HomePage from '../Home'
import AccountPage from '../Account'
import EditInfo from '../EditInfo'
import EditPassword from '../EditPassword'

import * as ROUTES from '../../constants/routes'
import { withFirebase } from '../Firebase'

const My404 = () => {
  return (
    <div>
      <Redirect to='/' />
    </div>
  )
};

class App extends Component {

  state = {
    authUser: null
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      authUser
        ? this.props.firebase.user(authUser.uid).get()
            .then(snapShot => this.setState({ authUser: Object.assign(snapShot.data(), {id: snapShot.id} )}))
        : this.setState({ authUser: null })
    })
    console.log(this.state.authUser, 'this is authuser')
  }

  render() {
    return (
      <div>
        <Navigation authUser={this.state.authUser}/>
        <Switch>
          <Route exact path={ROUTES.HOME} render={() => <HomePage authUser={this.state.authUser}/>} />
          <Route exact path={ROUTES.SIGN_UP} render={() => <SignUpPage />} />
          <Route exact path={ROUTES.SIGN_IN} render={() => <SignInPage />} />
          <Route exact path={ROUTES.EDIT_INFO} render={() => <EditInfo />} />
          <Route exact path={ROUTES.EDIT_PASSWORD} render={() => <EditPassword />} />
          <Route exact path={`${ROUTES.ACCOUNT}/:id`} render={() =>  <AccountPage authUser={this.state.authUser}/> } />
          <Route component={ My404 } />
        </Switch>
      </div>
    )
  }
}

export default withFirebase(App)