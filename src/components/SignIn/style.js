import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Div = styled.div`
  padding-top: 77px;
`

export const H1 = styled.h1`
  text-align: center;
  color: #FF3F00;
  font-size: 1.5em;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Input = styled.input`
  text-align: center;
  height: 30px;
  width: 90%;
  font-size: 1em;
  margin-bottom: 6px;
  border: 1px solid #00A6ED;
  box-shadow: 0px 0px 8px #00A6ED;
`

export const Button = styled.button`
  width: 91%;
  height: 34px;
  border: 1px solid #FF3F00;
  background: white;
  color: gray;
  box-shadow: 0px 0px 8px #FF3F00;
  font-size: 1em;
`

export const P = styled.p`
  text-align: center;
  color: #FF3F00;
`

export const LinkRoute = styled(NavLink)`
  text-decoration: none;
  color: #00A6ED;
`

export const Img = styled.img`
  text-decoration: none;
  color: #00A6ED;
`

