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
  Small,
  DivInput
} from './style.js'

const SignUp = (props) => {
  return (
    <Div>
      <H1>Signup</H1>
        <SignUpForm setUserId={props.setUserId}/>
    </Div>
  )
}

class SignUpFormBase extends Component {
  state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    gender: '',
    status: '-',
    age: '',
    favDrink: '',
    image: null,
    error: null
  }

  onSubmit = event => {
    event.preventDefault()

    const { username, email, passwordOne, gender, age, status, image, favDrink } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        if(image) {
          this.props.firebase.storage.ref('profile').child(image.name).put(image)
          .then(file => file.ref.getDownloadURL())
          .then(url => this.props.firebase.db.collection('users').doc(authUser.user.uid)
            .set({
              username,
              email,
              gender,
              age,
              img: url,
              favDrink,
              status
            }))
        } else {
            return this.props.firebase.db.collection('users').doc(authUser.user.uid)
            .set({
              username,
              email,
              gender,
              age,
              status
            })
        }
      })
      .then(() =>  {
        this.props.history.push(`/home`)
      })
      .catch(error => {
        this.setState({error})
      })
  }

  onChange = event => {
    this.setState({
      [event.target.name] : event.target.name.includes('image')
      ? event.target.files[0]
      : event.target.value 
      })
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      gender,
      age,
      favDrink,
      image,
      error
    } = this.state
    
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      gender === '' ||
      age === '' ||
      favDrink === ''

    return (
      <Form onSubmit={this.onSubmit}>
        <Input name='username' value={username} onChange={this.onChange} type='text'placeholder='Full Name'/>
        <Input name='favDrink' value={favDrink} onChange={this.onChange} type='text'placeholder='Fav Drink'/>
        <Input name='email' value={email} onChange={this.onChange} type='text' placeholder='Email' />
        <Input name='passwordOne' value={passwordOne} onChange={this.onChange} type='password'placeholder='Password'/>
        <Input name='passwordTwo' value={passwordTwo} onChange={this.onChange} type='password' placeholder='Confirm Password'/>
        <Input name='age' value={age} onChange={this.onChange} type='number' placeholder='age'/>
        <Input name='gender' value={gender} onChange={this.onChange} type='text' placeholder='gender'/>
        <DivInput>
          <Small>Image</Small>
          <Input name='image' type='file' placeholder="Picture" accept='image/png, image/jpeg' onChange={this.onChange}/>
        </DivInput>
        <Button type='submit' disabled={isInvalid}>Sign Up</Button>
        {error && error.message}
      </Form>
    )
  }
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))



export default SignUp
