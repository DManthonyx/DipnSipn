import React, { Component, useState } from 'react'

import SignOutButton from '../SignOut'
import Hamburger from '../Hamburger'
import * as ROUTES from '../../constants/routes'

import {
  Header,
  DivTitle,
  DivNav,
  Overlay,
  H1,
  Ul,
  Li,
  Link,
} from './style'

const Navigation = ({authUser}) => {
    const [ isOpen, setIsOpen ] = useState(false)
    // window.onresize = ()=> (window.innerWidth > 900 && isOpen) && setIsOpen(false)
    return (
      <Header>
        <Hamburger setIsOpen={setIsOpen} isOpen={isOpen} />
        <DivTitle>
          <H1>Dipn'N'Sipn</H1>
        </DivTitle>
        <DivNav>
          {authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth setIsOpen={setIsOpen} isOpen={isOpen}/>}
        </DivNav>
        <Overlay className={isOpen ? "show" : "hide"}>
          {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth  setIsOpen={setIsOpen} isOpen={isOpen}/>}
        </Overlay>
      </Header>
    )
}

const NavigationAuth = ({ authUser, setIsOpen, isOpen }) => (
  <Ul>
    <Li onClick={() => setIsOpen(!isOpen)}>
      <Link exact to={ROUTES.HOME}>Home</Link>
    </Li>
    <Li onClick={() => setIsOpen(!isOpen)}>
      <Link exact to={`${ROUTES.ACCOUNT}/${authUser.id}`}>Account</Link>
    </Li>
    <Li>
      <SignOutButton />
    </Li>
  </Ul>
)

const NavigationNonAuth = ({setIsOpen, isOpen}) => (
  <Ul>
    <Li onClick={() => setIsOpen(!isOpen)}>
      <Link exact to={ROUTES.HOME}>Home</Link>
    </Li>
    <Li onClick={() => setIsOpen(!isOpen)}>
      <Link exact to={ROUTES.SIGN_IN}>Sign In</Link>
    </Li>
    <Li onClick={() => setIsOpen(!isOpen)}>
      <Link exact to={ROUTES.SIGN_UP}>Sign Up</Link>
    </Li>
  </Ul>
)

export default Navigation