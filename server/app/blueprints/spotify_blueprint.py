import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, url_for, session, request, Blueprint, redirect, jsonify
import json
import time
from dotenv import load_dotenv
import os
from app.models.User import User
from app.extensions import db

spotify = Blueprint("spotify", __name__)

load_dotenv()

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
scope = "playlist-modify-public user-read-email"
redirect_uri = "http://localhost:5000/callback"

@spotify.route('/login')
def login():
    sp_oauth=create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

@spotify.route('/callback')
def callback():
    #create spotify oauth object
    sp_oauth = create_spotify_oauth()
    #get access code from URL
    code = request.args.get('code')
    #get token info from spotify using code
    token_info = sp_oauth.get_access_token(code)

    #add token to session
    session["TOKEN_INFO"] = token_info

    #get user info
    sp = spotipy.Spotify(auth=token_info["access_token"])
    user_info = sp.current_user()

    #put user email in session
    session["email"] = user_info["user_email"]

    #put user info in database
    user = User(
            name=user_info["display_name"],
            email=user_info["email"]
            )
    db.session.add(user)
    db.session.commit()

    return 'home page'

@spotify.route('/users', methods=["GET"])
def all_users():
    users = User.query.all()
    results = [{
        "id": user.id,
        "name": user.name,
        "email": user.email
    } for user in users]

    return jsonify({"users": results})

def create_spotify_oauth():
    return SpotifyOAuth(
            client_id=SPOTIFY_CLIENT_ID,
            client_secret=SPOTIFY_CLIENT_SECRET,
            redirect_uri=redirect_uri,
            scope=scope)

def get_token():
    pass

if __name__ == '__main__':
    app.run(debug=True)