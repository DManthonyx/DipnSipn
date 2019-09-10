import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'

import {
  Div,
  Form,
  Input,
  Small,
  DivInput,
  Button,
  H1,
  DeleteUser
} from './style'

class EditInfo extends Component {

  state = {
    username: '',
    email: '',
    gender: '',
    status: '-',
    age: '',
    favDrink: '',
    image: null,
    error: null
  }

  onChange = event => {
    this.setState({
      [event.target.name] : event.target.name.includes('image')
      ? event.target.files[0]
      : event.target.value 
      })
  }

  deleteAccount = () => {
    const user = this.props.firebase.auth.currentUser
    user.delete().then(() => {
      this.props.firebase.db.collection('users').doc(user.uid).delete()
      this.props.history.push('/home')
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    const {
      username,
      email,
      gender,
      age,
      favDrink,
      image,
      error
    } = this.state
    
    const isInvalid =
      email === '' ||
      username === '' ||
      gender === '' ||
      age === '' ||
      favDrink === ''

    return (
      <Div>
        <H1>Edit Info</H1>
        <Form onSubmit={this.onSubmit}>
        <Input name='username' value={username} onChange={this.onChange} type='text'placeholder='Full Name'/>
        <Input name='favDrink' value={favDrink} onChange={this.onChange} type='text'placeholder='Fav Drink'/>
        <Input name='email' value={email} onChange={this.onChange} type='text' placeholder='Email' />
        <Input name='age' value={age} onChange={this.onChange} type='number' placeholder='age'/>
        <Input name='gender' value={gender} onChange={this.onChange} type='text' placeholder='gender'/>
        <DivInput>
          <Small>Image</Small>
          <Input name='image' type='file' placeholder="Picture" accept='image/png, image/jpeg' onChange={this.onChange}/>
        </DivInput>
        <Button type='submit' disabled={isInvalid}>Edit Info</Button>
        {error && error.message}
      </Form>
      <DeleteUser onClick={this.deleteAccount}>Delete Account</DeleteUser>
    </Div>
    )
  }
}

export default withRouter(withFirebase(EditInfo))
