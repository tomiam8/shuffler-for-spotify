function getPlaylists() {
    accessToken = document.getElementById('spotifyKey').value;
    fetch('https://api.spotify.com/v1/me/playlists?limit=50&offset=0', {
        headers: { "Authorization": "Bearer " + accessToken }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        listPlaylists(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function listPlaylists(playlistData) {
    list = document.getElementById("playlistList");
    console.log(playlistData.items.length);
    playlistData.items.forEach(function (item) {
        let li = document.createElement('li');
        list.appendChild(li);
        li.innerHTML += item.name;
    });
}
