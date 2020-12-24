import json, requests

def spotify_authenticate(client_id : str):
    """
    Gets an authentication token from spotify to allow subsequent requests.

    client_id: get from developer.spotify.com
    client_secret: get from developer.spotify.com
    returns: the auth token as a str
    """

    

