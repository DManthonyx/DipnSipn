import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Header = styled.header`
  position: fixed;
  z-index: 10;
  background-color: white;
  color: #FF3F00;
  width: 100%;
  border-bottom: 2px solid #00A6ED;
  padding-bottom: 5px;
`

export const DivTitle = styled.div`

`

export const DivNav = styled.div`
  display: none;
`

export const Link = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  text-transform: uppercase;
  color: white;
  font-size: 1.3em;
  &:hover {
    color: lightblue;
  }

  &.active{
    border-bottom: 3px solid #00A6ED;
  }
  
  .show > &.active {
    border-bottom: none;
    color: gold;
  }
`

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 100;
  background-color: #FF3F00;
  opacity: .9;
  left: -120rem;
  transition: left .75s ease-in-out;
  display: flex;
  flex-direction: column;
  &.show {
    left: 0;
  }
  & > a {
    color: white;
  }
`

export const H1 = styled.h1`
  width: 100%;
  margin: 0px;
  text-align: center;
`

export const Ul = styled.ul`

`

export const Li = styled.li`
  display: flex;
`