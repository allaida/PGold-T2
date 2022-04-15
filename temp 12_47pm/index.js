const { urlencoded } = require('express')
const express = require('express')
const app = express()

const disc = {
  1: {
    Album: 'Butter',
    Artist: 'BTS',
    Year: '2021',
    Tracks: ['Butter', 'Permission to Dance']
  },
  2: {
    Album: 'BE',
    Artist: 'BTS',
    Year: '2020',
    Tracks: ['Life Goes On', 'Dynamite']
  },
  3: {
    Album: 'Positions',
    Artist: 'Ariana Grande',
    Year: '2020',
    Tracks: ['34+35', 'Positions']
  },
  4: {
    Album: 'Divide',
    Artist: 'Ed Sheeran',
    Year: '2017',
    Tracks: ['Perfect', 'Shape of You']
  },
  5: {
    Album: 'Thank you, next',
    Artist: 'Ariana Grande',
    Year: '2016',
    Tracks: ['Thank you, next', 'Rings']
  }
}

const artists = {
  1: {
    name: 'BTS',
    albums: [disc[1].Album, disc[2].Album],
    country: 'South Korea',
    image: "https://programminghistorian.org/images/json-and-jq/jqplay-screenshot.png"
  },
  2: {
    name: 'Ariana Grande',
    albums: [disc[3].Album, disc[5].Album],
    country: 'USA'
  },
  3: {
    name: 'Ed Sheeran',
    albums: [disc[4].Album],
    country: 'England'
  }
}

app.get('/artists', (req, res) => {
  res.send(artists)
})

app.get('/artists/:artist', (req, res) => {
  const artistnum = req.params.artist
  res.send(artists[artistnum])
})

app.get('/search', (req, res) => {
  const search = req.query.searchterm
  const searchsongs = []
  if (search === '') {
    res.send('no results')
    return
  }
  for (let i = 1; i < Object.keys(disc).length + 1; i++) {
    const tracks = disc[i].Tracks
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].toLowerCase().includes(search.toLowerCase())) {
        searchsongs.push(tracks[i])
      }
    }
  }
  res.send(searchsongs)
})

app.get('/discography/:album', (req, res) => {
  const albumname = req.params.album
  for (let i = 1; i < Object.keys(disc).length + 1; i++) {
    if (disc[i].Album === albumname) {
      res.send(disc[i])
    }
  }
  res.send('Page cannot be found')
})

app.post('/comment', function (req, res) {
  res.send('comment added')
})

app.use(express.static('public'))

module.exports = app
