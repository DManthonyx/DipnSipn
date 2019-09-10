const functions = require('firebase-functions');
const express = require('express')

const app = express()

app.get('/api/v1/get-bars', (req, res) => {
  const yelpAPI = functions.config().yelp.key
  try {
    const data = axios('https://api.yelp.com/v3/businesses/search?term=bars&location=los%angeles', {
      headers: `Bearer ${yelpAPI}`
    })
    res.send()
  } catch(err) {
    console.log(err)
  }
})

exports.app = functions.https.onRequest(app)

