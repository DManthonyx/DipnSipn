import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase';
import Bars from '../Bars';

import {
  Div,
  H1,
  DivButton,
  Button
} from './style'

class Account extends Component {
  
  goToEditUser = () => {
    this.props.history.push('/editinfo')
  }

  goToEditPassword = () => {
    this.props.history.push('/editpassword')
  }
  render() {
    return (
      <Div>
        {/* <H1>{this.props.authUser.username}</H1> */}
        <DivButton>
          <Button onClick={this.goToEditUser}>Edit Profile</Button>
          <Button onClick={this.goToEditPassword}>Edit Password</Button>
        </DivButton>
        <Bars />
        
      </Div>
    )
  }
}

export default withRouter(withFirebase(Account))