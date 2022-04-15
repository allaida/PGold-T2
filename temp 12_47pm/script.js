
const albumnames = []

async function loadallartists () {
  try {
    const response = await fetch('http://127.0.0.1:8090/artists/')
    if (response.ok) {
      const body = await response.json()

      for (let i = 1; i < Object.keys(body).length + 1; i++) {
        const disc = body[i].albums
        let albums = '<ul class="list-group list-group-flush">'
        console.log("hooo");

        for (let i = 0; i < disc.length; i++) {
          const albumname = disc[i]
          albumnames.push(albumname)
          albums += `
                    <li class="list-group-item">
                        <button type="button" class="btn btn-dark" id="album${albumname}">${albumname}</button>
                    </li>`
        }

        // document.getElementById("artists").innerHTML +=
        // `
        // ${JSON.stringify(body[i])}
        // <br>
        // ${albums}
        // `
        document.getElementById('artists').innerHTML += `
                <div class="card" style="width: 18rem;">
                <img src="${body[i].image}" class="card-img-top" alt="">
                <style>
                .card {display:inline-block;}
                </style>
                <div class="card-body">
                  <h5 class="card-title">${body[i].name}</h5>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  ${[albums]}
                  </div>
              </div>`

              console.log("hi");
              console.log(body[i].image);
      }

      addlistener(albumnames)
    };
  } catch (e) {
    console.log(e)
  }
}

loadallartists()

async function addlistener (albumnames) {
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
            document.getElementById('album').innerHTML = JSON.stringify(body)
            //album detail ui
          };
        } catch (e) {
          console.log(e)
        }
      })
  }
}

function Home () {
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
      document.getElementById('searchresults').innerHTML = body
      //search details ui
    }
  } catch (e) {
    console.log(e)
  }
})
