import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

import {
  Div,
  Form,
  Input,
  H1,
  Button
} from './style'

class EditPassword extends Component {

  state = {
    oldPassword: '',
    newPasswordOne: '',
    newPasswordTwo: '',
    error: null
  }

  onChange = event => {
    this.setState({
      [event.target.name] : event.target.value 
    })
  }

  reauthenticate = (currentPassword) => {
    const user = this.props.firebase.auth.currentUser;
    const credential = this.props.firebase.reauthenticate.credential(
      user.email, 
      currentPassword
    )
    return user.reauthenticateWithCredential(credential);
  } 

  update = e => {
    e.preventDefault()
    const {newPasswordOne} = this.state
    this.reauthenticate(this.state.oldPassword).then(() => {
      const user = this.props.firebase.auth.currentUser;
      user.updatePassword(newPasswordOne).then(() => {
        console.log('password changed')
        this.props.history.push(`/home`)
      }).catch((error) => {
        console.log(error.message)
      });
    }).catch((error) => {
      console.log(error.message)
    });
  }

  render() {
    const {
      oldPassword,
      newPasswordOne,
      newPasswordTwo,
      error
    } = this.state
    
    const isInvalid =
    oldPassword === '' ||
    newPasswordOne !== newPasswordTwo ||
    newPasswordOne === ''

    return (
      <Div>
        <H1>Change Password</H1>
        <Form onSubmit={this.update}>
        <Input name='oldPassword' value={oldPassword} onChange={this.onChange} type='password'placeholder='old password'/>
        <Input name='newPasswordOne' value={newPasswordOne} onChange={this.onChange} type='password'placeholder='password'/>
        <Input name='newPasswordTwo' value={newPasswordTwo} onChange={this.onChange} type='password' placeholder='confirm password'/>
        <Button type='submit' disabled={isInvalid}>update password</Button>
        {error && error.message}
      </Form>
    </Div>
    )
  }
}



export default withRouter(withFirebase(EditPassword))