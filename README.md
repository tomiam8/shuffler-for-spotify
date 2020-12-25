# Shuffler for Spotify

Spotify's shuffle is bad. This project uses the Spotify API to rearrange a playlist in a random order. Then, you can just play that playlist in order (without spotify's shuffle on), to have a shuffled playlist!

### Development plan
1. Make a prototype in python because I hate javascript and would rather work out Spotify's API in python. (💙🐍).
2. Turn that prototype into a proof of concept with Javascript
3. Make it pretty, work as a PWA (?), maybe finally learn React
4. Do the smart-playlist extension too

### Note on Spotify's API
Spotify's API has an option to move songs around. What we want is to get a list of all the songs from Spotify, then give Spotify back a list of the songs, but in the new order we want. But it doesn't work like this: you can only move a single contiguous block of songs per request. For large playlists, this will (I suspect: will find out with the python prototype) quickly hit rate limits. If this is an issue, can just use the create a new playlist request, which lets us just give a list of songs in any order, but this also creates a new playlist which is bad (e.g. people who have shared / followed the original playlist, photos / other metadata won't work). I'm not sure what to do about this, other than hope the rate is high.
