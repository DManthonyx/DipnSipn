import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

import {
  Button
} from './style'

class SignOut extends Component {
  
  logOut = () => {
    this.props.firebase.doSignOut()
    this.props.history.push('/home')
  }
  render() {
    return (
      <Button type='button' onClick={this.logOut}>
        Sign Out
      </Button>
    )
  }
}


export default withFirebase(withRouter(SignOut))