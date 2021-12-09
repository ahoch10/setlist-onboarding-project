from flask import Flask, render_template, request, jsonify
from app.extensions import db, migrate
from app.blueprints.songs_blueprint import songs
from app.blueprints.spotify_blueprint import spotify

def create_app():

    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:12345@localhost:5432/setlist"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(spotify)
    app.register_blueprint(songs)

    app.register_error_handler(400, handle_bad_request)

    return app

def handle_bad_request(e):
    return str(e), 400
