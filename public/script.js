/* eslint-disable*/

var albumnames = []
var imagelist = []

async function loadallartists() {
  try {
    const response = await fetch('http://127.0.0.1:8090/artists/')
    if (response.ok) {
      const body = await response.json()

      for (let i = 1; i < Object.keys(body).length + 1; i++) {
        const disc = body[i].albums
        var albums = '<ul class="list-group list-group-flush">'
        const imagelink = body[i].image

        for (let i = 0; i < disc.length; i++) {
          imagelist.push(imagelink)
          const albumname = disc[i]
          albumnames.push(albumname)
          albums += `
                    <li class="list-group-item">
                        <button type="button" class="btn btn-dark" id="album${albumname}">${albumname}</button>
                    </li>`
        }

        document.getElementById('artists').innerHTML += `
                <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
                <img src="${imagelink}" class="card-img-top" alt="...">
                
                <div class="card-body">
                  <h5 class="card-title">${body[i].name}</h5>
                  <p class="card-text">Country: ${body[i].country}</p>
                  <p class="card-text">${body[i].description}</p>
                  ${albums}
                  </div>
                </div>
                <style>
                .card {display:inline-block;}
                </style>
                `
      }

      addlistener(albumnames)
    };
  } catch (e) {
    console.log(e)
  }
}

loadallartists()

async function addlistener(albumnames) {
  for (let i = 0; i < albumnames.length; i++) {
    document.getElementById(`album${albumnames[i]}`).addEventListener('click',
      async function () {
        try {
          document.getElementById('artists').style.display = 'none'
          document.getElementById('cover').style.display = 'none'
          document.getElementById('artist_title').style.display = 'none'
          document.getElementById('album').style.display = 'block'
          document.getElementById('searchresults').style.display = 'none'
          const response = await fetch('http://127.0.0.1:8090/discography/' + albumnames[i])
          if (response.ok) {
            const body = await response.json()
            console.log(body)
            var tracklist = ""

            for (let s = 0; s < body.Tracks.length; s++) {
              tracklist += `<li class="list-group-item">${body.Tracks[s]}
              <div class="ratio ratio-16x9">
                <iframe src="${body.MV[s]}" title="YouTube video" allowfullscreen>
                </iframe>
              </div>
              </li>`
            }


            document.getElementById('album').innerHTML = `
            <div class="card mb-3" style="width: 100%">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${imagelist[i]}" class="img-fluid rounded-lg" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${body.Album}</h5>
                  <p class="card-text">${body.Artist}</p>
                  <p class="card-text"><small class="text-muted">${body.Year}</small></p>
                </div>
              </div>
            </div>
          </div>
          <h3 class="pt-1 text-left" class="text-muted" id=tracklist>Tracks</h3>
            <ul class="list-group list-group-numbered">
              ${tracklist}
            </ul>`

          };
        } catch (e) {
          console.log(e)
        }
      })
  }
}

function Home() {
  document.getElementById('artists').style.display = 'block'
  document.getElementById('cover').style.display = 'block'
  document.getElementById('artist_title').style.display = 'block'
  document.getElementById('album').style.display = 'none'
  document.getElementById('searchresults').style.display = 'none'
}

const sb = document.getElementById('searchbar')
sb.addEventListener('submit', async function (event) {
  event.preventDefault()
  const data = new FormData(sb)
  const params = new URLSearchParams(data)
  try {
    document.getElementById('artists').style.display = 'none'
    document.getElementById('cover').style.display = 'none'
    document.getElementById('artist_title').style.display = 'none'
    document.getElementById('album').style.display = 'none'
    document.getElementById('searchresults').style.display = 'block'
    const response = await fetch('http://127.0.0.1:8090/search?' + params)
    if (response.ok) {
      const body = await response.json()
      console.log(body)

      var songlist = ""

      for (let s = 0; s < body.length; s++) {
        songlist += `<li class="list-group-item">
        ${body[s]}
        
        </li>`
      }

      document.getElementById('searchresults').innerHTML = `
      <ul class="list-group list-group-horizontal-xxl">
        ${songlist}
      </ul>`
    }
  } catch (e) {
    console.log(e)
  }
})
