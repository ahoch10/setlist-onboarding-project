import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, url_for, session, request, redirect
import json
import time
from dotenv import load_dotenv
import os
# from app import User

app = Flask(__name__)

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
scope = "playlist-modify-public user-read-email"
redirect_uri = "http://localhost:5000/home"

@app.route('/login')
def login():
    sp_oauth=create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@app.route('/home')
def home():
    #create spotify oauth object
    sp_oauth = create_spotify_oauth()
    #get access code from URL
    code = request.args.get('code')
    #get token info from spotify using code
    token_info = sp_oauth.get_access_token(code)

    #get user email
    sp = spotipy.Spotify(auth=token_info["access_token"])
    user_info = sp.current_user()
    print(user_info)

    #put user info & token info in database

    return 'home page'

def create_spotify_oauth():
    return SpotifyOAuth(
            client_id=SPOTIFY_CLIENT_ID,
            client_secret=SPOTIFY_CLIENT_SECRET,
            redirect_uri=redirect_uri,
            scope=scope)

def get_token():
    #first get user and check if there is token info
    pass

if __name__ == '__main__':
    app.run(debug=True)
