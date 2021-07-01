# Shuffler for Spotify

Spotify's shuffle is bad. This project uses the Spotify API to rearrange a playlist in a random order. Then, you can just play that playlist in order (without spotify's shuffle on), to have a shuffled playlist!

### Use
Currently, only the python prototype is done. But to use it:
*Install*:
1. Make sure you have python3 installed
2. Install the requests library - ```pip install requests```
3. Download 'shuffler-prototype.py' somewhere convenient to run

*Use*:
1. Run the script (```python3 shuffler-prototype.py``` from a terminal in the same directory as the shuffler-prototype.py file)
2. Follow the prompts!

Note if you use the script several times in a row, you can just re-paste the same authenticated URL each time (the login lasts for an hour), rather than re-opening the link and pasting in a new one each time.

### Development plan
1. Make a prototype in python because I hate javascript and would rather work out Spotify's API in python. (💙🐍).
2. Turn that prototype into a proof of concept with Javascript
    i. Load playlist list off of hardcoded/manually pasted into textbook key (as key expires after 60min, is fine to hardcode??? But still keys in git, kinda scary)
    ii. Make download all songs for a given playlist work
    iii. Depaginator
    iii. Make new shuffled playlists work
    iv. Make auth process work
    v. An hour of basic prettiness (?)
    vi. Make auto-login checkbox
    vii. Make logout (turn off auto-login)
3. Make it pretty, work as a PWA (?), maybe finally learn React
4. Do the smart-playlist extension too

### Note on Spotify's API
Spotify's API has an option to move songs around. What we want is to get a list of all the songs from Spotify, then give Spotify back a list of the songs, but in the new order we want. But it doesn't work like this: you can only move a single contiguous block of songs per request. For large playlists, this will (I suspect: will find out with the python prototype) quickly hit rate limits. If this is an issue, can just use the create a new playlist request, which lets us just give a list of songs in any order, but this also creates a new playlist which is bad (e.g. people who have shared / followed the original playlist, photos / other metadata won't work). I'm not sure what to do about this, other than hope the rate is high.
