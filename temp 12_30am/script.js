
var album_names = []

async function loadallartists() {
    try {
        const response = await fetch('http://127.0.0.1:8090/artists/');
        if (response.ok) {
            const body = await response.json()

            for (let i = 1; i < Object.keys(body).length + 1; i++) {
                const disc = body[i]["albums"]
                var albums = ""

                for (let i = 0; i < disc.length; i++) {
                    const album_name = disc[i]
                    album_names.push(album_name)
                    albums += `<button type="button" id="album${album_name}">${album_name}</button><br>`
                }

                document.getElementById("artists").innerHTML += `
                ${JSON.stringify(body[i])}
                <br>
                ${albums}
                `

            }
            addlistener(album_names)
        };
    } catch (e) {
        console.log(e);
    }

}


loadallartists()

async function addlistener(album_names) {

    for (let i = 0; i < album_names.length; i++) {
        document.getElementById(`album${album_names[i]}`).addEventListener("click",
            async function () {
                try {
                    document.getElementById("artists").style.display = "none"
                    const response = await fetch('http://127.0.0.1:8090/discography/' + album_names[i]);
                    if (response.ok) {
                        const body = await response.json()
                        console.log(body);
                        document.getElementById("album").innerHTML = JSON.stringify(body)
                    };
                } catch (e) {
                    console.log(e);
                }

            })
    }
}