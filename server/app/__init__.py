from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from app.extensions import db, migrate
from app.blueprints.songs_blueprint import songs
from app.blueprints.spotify_blueprint import spotify
from app.blueprints.setlist_blueprint import setlists
from app.models.Song import Song
from app.models.User import User
from app.models.Setlist import Setlist
from dotenv import load_dotenv
import os

load_dotenv()

secret_key = os.getenv("APP_SECRET_KEY")

def create_app():

    app = Flask(__name__)

    CORS(app, origins=["http://localhost:3000"])

    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:12345@localhost:5433/setlist"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.secret_key = secret_key
    app.config['SESSION_COOKIE_NAME'] ="cookie"

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(spotify)
    app.register_blueprint(songs)
    app.register_blueprint(setlists)

    app.register_error_handler(400, handle_bad_request)

    return app

def handle_bad_request(e):
    return str(e), 400
