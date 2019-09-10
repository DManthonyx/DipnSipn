import React, { Component } from 'react'
import Bars from '../Bars'

import {
  Div,
  H1
} from './style'

class Home extends Component  {
  componentDidMount() {
    
  }
  render () {
    return (
      <Div>
        <Bars />
      </Div>
    )
  }
}

export default Home