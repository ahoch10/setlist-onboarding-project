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
scope = "playlist-modify-public playlist-modify-private user-read-email"
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
    #clear session
    session.clear()
    #get access code from URL
    code = request.args.get('code')
    #get token info from spotify using code
    token_info = sp_oauth.get_access_token(code)

    #add token to session
    session["TOKEN_INFO"] = token_info

    #get user info
    sp = spotipy.Spotify(auth=token_info["access_token"])
    user_info = sp.current_user()
    print(user_info)
    #put user email in session
    session["user_email"] = user_info["email"]
    session["name"] = user_info["display_name"]
    session["user_id"] = user_info["id"]

    #put user info in database
    check_user = User.query.filter_by(email = user_info["email"]).one_or_none()

    if not check_user:
        user = User(
                name=user_info["display_name"],
                email=user_info["email"]
                )
        db.session.add(user)
        db.session.commit()

    return redirect("http://localhost:3000")

@spotify.route('/user_info')
def is_logged_in():
    if session.get("user_email"):
        return jsonify({"user_email": session["user_email"], "name": session["name"]})
    return "Not logged in"

@spotify.route('/users', methods=["GET"])
def all_users():
    users = User.query.all()
    results = [{
        "id": user.id,
        "name": user.name,
        "email": user.email
    } for user in users]

    return jsonify({"users": results})

@spotify.route('/playlist', methods=["POST"])
def create_playlist():
    token_info = get_token()

    sp = spotipy.Spotify(auth=token_info['access_token'])

    #create the playlist
    playlist_data = request.get_json()
    playlist_title = playlist_data.get("playlist_title")
    user_id = session.get("user_id")
    print("user_id", user_id)
    user_info = sp.current_user()
    print(user_info["id"])

    sp.user_playlist_create(user=user_id, name=playlist_title, public=True, description="")

    #search for each song, find its uri, and append to list of songs
    song_uris=[]
    songs = playlist_data.get("songs")

    for song in songs:
        result = sp.search(q=song["title"])
        song_uri = result["tracks"]["items"][0]["uri"]
        song_uris.append(song_uri)

    #modify the playlist with the list of songs
    search_results = sp.user_playlists(user=user_id)
    playlist = search_results['items'][0]['id']

    sp.user_playlist_add_tracks(user=user_id, playlist_id=playlist, tracks=song_uris)

    return "Playlist created"

def create_spotify_oauth():
    return SpotifyOAuth(
            client_id=SPOTIFY_CLIENT_ID,
            client_secret=SPOTIFY_CLIENT_SECRET,
            redirect_uri=redirect_uri,
            scope=scope)

def get_token():
    token_info = session.get("TOKEN_INFO", None)
    if not token_info:
        raise Exception

    now = int(time.time())
    is_expired = token_info['expires_at'] - now < 60

    if(is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info



if __name__ == '__main__':
    app.run(debug=True)
