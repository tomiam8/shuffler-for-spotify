function getPlaylists() {
    depaginator('https://api.spotify.com/v1/me/playlists?limit=50&offset=0')
    .then(data => {
        window.playlistData = data; //Store for later
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
        but.dataset.playlist = JSON.stringify(item);
        but.setAttribute("onclick", "shuffleSongs(this)");//\"" + item.id + "\");") //probably (definitely) a better way then hardcoding the IDs into the function call lol
        li.appendChild(but);
        list.appendChild(li);
    });
}

function shuffleSongs(button) {
    playlist = JSON.parse(button.dataset.playlist);
    depaginator('https://api.spotify.com/v1/playlists/' + playlist.id + '/tracks?market=from_token&fields=items(track(uri))%2Cnext')
    .then(songs => {
        fisherYates(songs);
        name = generateNewPlaylistName(playlist.name, window.playlistData);
        console.log(name);
        createNewPlaylist(name) //Nested .then's rather than chained because need access to songs scope
        .then(playlistID => addSongs(playlistID, songs));
    });
}

async function addSongs(id, songs) {
    start_index = 0;
    url = "https://api.spotify.com/v1/playlists/" + id + "/tracks";
    contents = getSpotifyHeaders();
    contents.headers.Accept = 'application/json';
    contents.method = 'POST';

    while (start_index < songs.length) {
        end_index = Math.min(start_index + 100, songs.length);

        songSelections = songs.slice(start_index, end_index).map(song => song.track.uri);
        contents.body = JSON.stringify({'uris': songSelections});
        await fetch(url, contents); //Pause, sending the requests one by one, because if we send them all at once Spotify breaks and sends back a 500 Error. I tried reporting it to them but their reporting forum wouldn't let me post. :(.

        start_index = end_index;
    }
}


async function createNewPlaylist(name) {
    url = "https://api.spotify.com/v1/users/" + await getUsername() + "/playlists";
    contents = getSpotifyHeaders();
    contents.method = 'POST';
    contents.body = JSON.stringify({'name':name, 'public':'false'});
    response = await (await fetch(url, contents)).json()
    return response.id;
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


async function getUsername() {
    response = await (await fetch("https://api.spotify.com/v1/me", getSpotifyHeaders())).json();
    return response.id;
}

function fisherYates(list) {
    for (let i = 0; i < list.length-1; i++) {
        j = i + Math.floor((list.length - i)*Math.random());
        temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }
    return list; //Shuffles in place so redundant...
}

function generateNewPlaylistName(name, playlists) {
    baseName = name + "🔀";
    playlistNames = playlists.map(playlist => playlist.name);
    name = baseName;
    counter = 0;
    while (playlistNames.indexOf(name) != -1) {
        counter++;
        name = baseName + counter;
    }
    return name;
}
