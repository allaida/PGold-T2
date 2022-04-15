const express = require('express');
const app = express();

var disc = {
    1: {
        Album: 'Butter',
        Artist: 'BTS',
        Year: '2021',
        Tracks:['Butter', 'Permission to Dance'],
    },
    2: {
        Album: 'BE',
        Artist: 'BTS',
        Year: '2020',
        Tracks:['Life Goes On', 'Dynamite'],
    },
    3: {
        Album: 'Positions',
        Artist: 'Ariana Grande',
        Year: '2020',
        Tracks:['34+35', 'Positions'],
    },
    4: {
        Album: 'Divide',
        Artist: 'Ed Sheeran',
        Year: '2017',
        Tracks:['Perfect', 'Shape of You'],
    },
    5: {
        Album: 'Thank you, next',
        Artist: 'Ariana Grande',
        Year: '2016',
        Tracks: ['Thank you, next','Rings']
    }
    }

var artists = {
    1:{
        name: 'BTS',
        albums: [disc[001]["Album"], disc[002]["Album"]],
        country: 'South Korea'
    },
    2:{
        name: 'Ariana Grande',
        albums: [disc [003]["Album"],disc [005]["Album"]],
        country: 'USA'
    },
    3:{
        name: 'Ed Sheeran',
        albums: [disc [004]["Album"]],
        country: 'England'
    }}
    

app.get('/artists', (req, res) => {
    res.send(artists)
  })

app.get('/artists/:artist', (req, res) => {
    const artistnum = req.params.artist
    res.send(artists[artistnum])
})


app.get('/discography/:album', (req, res) => {
    const album_name = req.params.album
    for (let i = 1; i < Object.keys(disc).length + 1; i++) {
        if (disc[i]["Album"] == album_name) {
            res.send(disc[i])
        }
    }
    res.send('Page cannot be found')
})

app.listen(8090,() => console.log('listening at 8090'))
app.use(express.static('public'))
    

