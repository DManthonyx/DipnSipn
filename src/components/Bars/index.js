import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

import { withFirebase } from '../Firebase'

import {
  Container,
  Section,
  Article,
  ButtonDiv,
  Button,
  HiddenDiv,
  BarDiv,
  Input,
  InfoDiv,
  P,
  DivSearch,
  ImgList
} from './style'

class Bars extends Component {

  state = {
    bars: [],
    currentBar: null,
    userLocation: { 
      lat: null,
      lng: null
    }, 
    search: '',
    dipnNSipnCounter: 0,
    searchCounter: 0,
  }

  async componentDidMount() {
    // console.log(this.state,'this is bars component did mount');
    await navigator.geolocation.getCurrentPosition(position => {
      // console.log(position, 'this is position')
      const {latitude, longitude} = position.coords;
      this.setState({
        userLocation: { lat: latitude, lng: longitude },
      },() =>   {
        this.getBarsYelp()
      });
    })
  };

  getBarsYelp = () => {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?term=bars lounges club&offset=1&limit=50&latitude=${this.state.userLocation.lat}&longitude=${this.state.userLocation.lng}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
      }
    })
    .then((res) => {
        this.setState({
          bars: res.data.businesses
        })
    })
    .catch((err) => {
        this.setState({ errorState: `Sorry, we couldn't find the information related to the location you requested, do you want to try some other icecream store?`, loading: false})
    })
  }

  onChange = event => {
    this.setState({
      [event.target.name] : event.target.name.includes('image')
      ? event.target.files[0]
      : event.target.value 
      })
  }

  searchForBars = event => {
    event.preventDefault()
    console.log(this.state.searchBars, 'this is the search bar')
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.state.search}&term=bar&offset=${this.state.searchCounter}&limit=50`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
      }
    })
    .then((res) => {
        this.setState({
          bars: res.data.businesses,
          searchCounter: this.state.searchCounter + 50
        })
        console.log(this.state.searchCounter, 'search counter')
    })
    .catch((err) => {
        this.setState({ errorState: `Sorry, we couldn't find the information related to the location you requested, do you want to try some other icecream store?`, loading: false})
    })
  }

  goDipnNSipin = () => {
    console.log('hit route')
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${this.state.search}&term=bars&offset=${this.state.dipnNSipnCounter}&limit=3`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`,
      }
    })
    .then((res) => {
        console.log(this.state.dipnNSipnCounter)
        this.setState({
          bars: res.data.businesses,
          dipnNSipnCounter: this.state.dipnNSipnCounter + 3
        })
    })
    .catch((err) => {
        this.setState({ errorState: `Sorry, we couldn't find the information related to the location you requested, do you want to try some other icecream store?`, loading: false})
    })
  }
  

  changeCurrentLoaction = bar => {
    this.setState({
      currentBar: {
        name: bar.name,
        city: bar.location.city,
        address: bar.location.address1
      }
    })
  }

  render() {
    const { bars, search, userLocation } = this.state
  return (
    <Container>
      <Section>
        <DivSearch>
            <Input name="search" value={search} onChange={this.onChange}  type='text'placeholder='search by city'/>
          <ButtonDiv>
            <Button onClick={this.goDipnNSipin}>Go Dipn N Sipn</Button>
            <Button onClick={this.searchForBars}>search by city</Button>
          </ButtonDiv>
        </DivSearch>
        <BarDiv>
          {
            this.state.currentBar
            ?
              <HiddenDiv>
                <P>Name:  {this.state.currentBar.name}</P>
                <P>Address:  {this.state.currentBar.address}, {this.state.currentBar.city}</P>
              </HiddenDiv>
            :
            null
          }
        </BarDiv>
        <Article>
          {
            userLocation.lat 
            ?
            <Map google={this.props.google} zoom={11}
            style={{
              width: '100%',
              height: '400px',                     
              }}
            initialCenter={{
              lat: userLocation.lat, 
              lng: userLocation.lng
            }}
            >
            {
              bars.map((bar, i) => {
                return (
                  <Marker 
                  key={i}
                  position={{lat: bar.coordinates.latitude, lng: bar.coordinates.longitude}}
                  onClick={() => this.changeCurrentLoaction(bar)}
                  />
                )
              })
            }
            </Map>
            :(
              <h1>Map Loading....</h1>
            )
          }
        </Article>
      </Section>
      <Article>
            <BarDiv>
                {
                
                (bars || []).map((bar,i) => {
                    return (
                      <InfoDiv key={i}>
                        <P>Name:  {bar.name}</P>
                        <P>Address:  {bar.location.address1}, {bar.location.city}</P>
                      </InfoDiv>
                    )
                  })
                }
            </BarDiv>
        </Article>
    </Container>
  )
  }
}



export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS
})(Bars)