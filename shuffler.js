function getPlaylists() {
    depaginator('https://api.spotify.com/v1/me/playlists?limit=50&offset=0')
    .then(data => {
        listPlaylists(data);
    });
}

function listPlaylists(playlists) {
    list = document.getElementById("playlistList");
    playlists.forEach(function (item) {
        li = document.createElement('li');
        but = document.createElement('input');
        but.type = 'button';
        but.value = item.name;
        but.setAttribute("onclick", "shuffle(\"" + item.id + "\");") //probably (definitely) a better way then hardcoding the IDs into the function call lol
        li.appendChild(but);
        list.appendChild(li);
    });
}

function shuffle(playlistID) {
    depaginator('https://api.spotify.com/v1/playlists/' + playlistID + '/tracks?market=from_token&fields=items(track(uri))%2Cnext')
    .then(data => {
        console.log(data);
    });
}

async function depaginator(URL) {
    response = await (await fetch(URL, getSpotifyHeaders())).json();
    items = response.items;
    while (response.next !== null) {
        response = await (await fetch(response.next, getSpotifyHeaders())).json();
        items = items.concat(response.items);
    }
    return items;
}


function getSpotifyToken() {
    return document.getElementById('spotifyKey').value;
}

function getSpotifyHeaders() {
    return {headers: {"Authorization": "Bearer " + getSpotifyToken()}}
}
