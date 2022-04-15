const { urlencoded } = require('express')
const express = require('express')
const app = express()

const disc = {
  1: {
    Album: 'Butter',
    Artist: 'BTS',
    Year: '2021',
    Tracks: ['Butter', 'Permission to Dance'],
    MV: ["https://www.youtube.com/embed/WMweEpGlu_U","https://www.youtube.com/embed/WMweEpGlu_U"]
  },
  2: {
    Album: 'BE',
    Artist: 'BTS',
    Year: '2020',
    Tracks: ['Life Goes On', 'Dynamite','Telepathy (잠시)'],
    MV: ["https://www.youtube.com/embed/-5q5mZbe3V8", "https://www.youtube.com/embed/gdZLi9oWNZg", "https://www.youtube.com/embed/jzHtHAg2igc"]
  },
  3: {
    Album: 'Positions',
    Artist: 'Ariana Grande',
    Year: '2020',
    Tracks: ['34+35', 'Positions'],
    MV: ["https://www.youtube.com/embed/B6_iQvaIjXw", "https://www.youtube.com/embed/tcYodQoapMg"]
  },
  4: {
    Album: 'Divide',
    Artist: 'Ed Sheeran',
    Year: '2017',
    Tracks: ['Perfect', 'Shape of You'],
    MV: ["https://www.youtube.com/embed/2Vv-BfVoq4g", "https://www.youtube.com/embed/JGwWNGJdvx8"]
  },
  5: {
    Album: 'Thank you, next',
    Artist: 'Ariana Grande',
    Year: '2016',
    Tracks: ['Thank you, next', '7 Rings'],
    MV: ["https://www.youtube.com/embed/gl1aHhXnN1k", "https://www.youtube.com/embed/QYh6mYIJG2Y"]
  }
}

const artists = {
  1: {
    name: 'BTS (방탄소년단)',
    albums: [disc[1].Album, disc[2].Album],
    country: 'South Korea',
    description: "A korean boy group that consists of 7 members: RM, Jin, Suga, J-Hope, V, Jimin and Jungkook",
    image: "https://6.viki.io/image/281a09b7a559471181e6ef36297d536f.jpeg?s=900x600&e=t"
  },
  2: {
    name: 'Ariana Grande',
    albums: [disc[3].Album, disc[5].Album],
    country: 'USA',
    description: "An actress turned singer who became well-known for her impressive four-octave vocal range after joining the pop music scene in the early 2010s",
    image: "https://media.allure.com/photos/6127ac0b238beb835812ce4c/4:3/w_2247,h_1685,c_limit/Ariana%20Grande%20Allure%20Cover%20No%20Coverlines.jpg"
  },
  3: {
    name: 'Ed Sheeran',
    albums: [disc[4].Album],
    country: 'England',
    description: "A singer and songwriter who began his journey playing the guitar at a young age and writing his own songs, which inspired him to pursue music",
    image: "https://i.guim.co.uk/img/media/d59fbfedba40814ab1f6391ae2e6db6f7e79249b/0_192_3000_1800/master/3000.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=08c16e228b8e4d0c83bdf0eb64607e29"
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
