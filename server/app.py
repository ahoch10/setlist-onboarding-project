from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:12345@localhost:5432/setlist"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10))
    instrumentation = db.Column(db.Text)
    notes = db.Column(db.Text)
    order_index = db.Column(db.Integer, nullable=False)

    def __init__(self, title, key, instrumentation, notes, order_index):
        self.title=title
        self.key=key
        self.instrumentation=instrumentation
        self.notes=notes
        self.order_index=order_index

# GET route to get all songs
@app.route('/songs', methods=["GET"])
def all_songs():
    try:
        songs = Song.query.order_by(Song.order_index).all()
        results = [ {
            "id": song.id,
            "title": song.title,
            "instrumentation": song.instrumentation,
            "key": song.key,
            "notes": song.notes,
            "order_index": song.order_index
        } for song in songs]
        return jsonify({"songs": results})
    except Exception as e:
        return(str(e))

# POST route to add a song
@app.route('/songs', methods=["POST"])
def add_song():
    song_data = request.get_json()

    title = song_data.get("title")
    key = song_data.get("key")
    instrumentation = song_data.get("instrumentation")
    notes = song_data.get("notes")

    try:
        songs = Song.query.all()

        if len(songs) == 0:
            order_index = 1
        else:
            order_index = max([x.order_index for x in songs]) + 1

        song=Song(
                title=title,
                key=key,
                instrumentation=instrumentation,
                notes=notes,
                order_index=order_index
        )
        db.session.add(song)
        db.session.commit()
        return "Song added"
    except Exception as e:
        return(str(e))

# DELETE route to delete a song
@app.route('/songs/<id>', methods=["DELETE"])
def delete_song(id):
    try:
        song = Song.query.get(id)
        db.session.delete(song)
        db.session.commit()

        return "Song deleted"
    except Exception as e:
        return (str(e))

# PUT route to update a song:
@app.route('/songs/<id>', methods=["PUT"])
def update_song(id):
    try:
        song = Song.query.get(id)
        song_data = request.get_json()

        song.title = song_data.get('title', song.title)
        song.key = song_data.get('key', song.key)
        song.instrumentation = song_data.get('instrumentation', song.instrumentation)
        song.notes = song_data.get('notes', song.notes)

        db.session.commit()
        return "Song updated"
    except Exception as e:
        return (str(e))

#PUT route to update order of songs:
@app.route('/songs', methods=["PUT"])
def update_song_order():
    try:
        songs = Song.query.all()
        updated_songs = request.get_json()

        for song in updated_songs["songs"]:
            # find corresponding dictionary in updated_songs by id
            matching_song = [s for s in songs if s.id == song["id"]]
            # update the current song with the order_index from updated_songs
            matching_song[0].order_index = song["order_index"]

        db.session.commit()
        return "Song order updated"
    except Exception as e:
        return (str(e))


if __name__ == '__main__':
    app.run(debug=True)
