import json, requests
client_id = "561d1e4e93f1487eba10a7993a59a77e"

def spotify_authenticate(client_id : str):
    """
    Gets an authentication token from spotify to allow subsequent requests.

    client_id: get from developer.spotify.com
    client_secret: get from developer.spotify.com
    returns: the auth token as a str
    """
    print("Please visit the following URL, complete the authorization, and paste the URL that you are redirected to afterwards:\nhttps://accounts.spotify.com/authorize?client_id={}&redirect_uri=https:%2F%2Fgithub.com%2Ftomiam8%2Fshuffler-for-spotify&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private&response_type=token".format(client_id))
    redirect = input("URL spotify redirected you to: ")
    response = {query:value for query,value in [pair.split("=") for pair in redirect.split("#")[1].split("&")]}
    if 'error' in response.keys() or response['token_type'] != 'Bearer':
        raise Exception("Received error response from Spotify during authorization: error={}".format(response['error']))
    return response['access_token']

def get_playlists(client_id : str, access_token : str):
    """
    Calls Spotify's Get a List of Current User's playlists - https://api.spotify.com/v1/users/{user_id}/playlists
    Handles the pagination stuff too.
    """
    url = "https://api.spotify.com/v1/me/playlists?limit={}&offset={}"
    headers = {"Authorization": "Bearer {}".format(access_token)}
    response = requests.get(url.format(50,0), headers=headers).json()
    return [{'id':playlist['id'], 'name': playlist['name']} for playlist in response['items']] 


def main():
    access_token = spotify_authenticate(client_id)
    playlists = get_playlists(client_id, access_token)

    print("\n".join(["{}. {}".format(playlist[0], playlist[1]['name']) for playlist in enumerate(playlists)]))
    playlist = playlists[int(input("Enter the number of the playlist you would like to shuffle (just the number! No full stop.): "))]

main()
