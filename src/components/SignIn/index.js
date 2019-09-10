import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

import {
  Div,
  H1,
  Form, 
  Input,
  Button,
  P,
  LinkRoute,
  Img
} from './style'

const SignIn = () => (
  <Div>
    <H1>SignIn</H1>
    <SignInForm />
    <SignUpLink />
  </Div>
)

class SignInFormBase extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  onSubmit = event => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((authUser) => {
        this.props.history.push(ROUTES.HOME)
      })
      .catch(error => {
        this.setState({error})
      })
  }

  onChange = event => 
    this.setState({ [event.target.name] : event.target.value})

  render() {
    const { email, password, error } = this.state
    console.log(this.props)
    return (
      <Form onSubmit={this.onSubmit}>
        <Input 
          name='email'
          type='text'
          value={email}
          onChange={this.onChange}
          placeholder='Email Address'
        />
        <Input 
          name='password'
          type='password'
          value={password}
          onChange={this.onChange}
          placeholder='Password'
        />
        <Button type='submit'>SIGN IN</Button>
        {error && error.message}
      </Form>
    )
  }
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

const SignUpLink = () => (
  <P>
    Don't have an account? <LinkRoute exact to={ROUTES.SIGN_UP}>Sign Up</LinkRoute>
  </P>
)

export default SignIn