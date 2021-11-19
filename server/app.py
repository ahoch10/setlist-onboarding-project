from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:12345@localhost:5432/setlist"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10))
    instrumentation = db.Column(db.Text)
    notes = db.Column(db.Text)

    def __init__(self, title, key, instrumentation, notes):
        self.title=title
        self.key=key
        self.instrumentation=instrumentation
        self.notes=notes

# GET route to get all songs
@app.route('/', methods=["GET"])
def all_songs():
    try:
        songs = Song.query.all()
        results = [ {
            "id": song.id,
            "title": song.title,
            "instrumentation": song.instrumentation,
            "key": song.key,
            "notes": song.notes
        } for song in songs]
        return jsonify({"songs": results})
    except Exception as e:
        return(str(e))

# POST route to add a song
@app.route('/', methods=["POST"])
def add_song():
    title=request.args.get('title')
    key=request.args.get('key')
    instrumentation=request.args.get('instrumentation')
    notes=request.args.get('notes')
    try:
        song=Song(
                title=title,
                key=key,
                # instrumentation=instrumentation,
                notes=notes
        )
        db.session.add(song)
        db.session.commit()
        return "Song added"
    except Exception as e:
        return(str(e))

# DELETE route to delete a song
@app.route('/<id>', methods=["DELETE"])
def delete_song(id):
    try:
        song = Song.query.get(id)
        db.session.delete(song)
        db.session.commit()

        return "Song deleted"
    except Exception as e:
        return (str(e))

# PUT route to update a song:
@app.route('/<id>', methods=["PUT"])
def update_song(id):
    try:
        song = Song.query.get(id)
        song.title = request.json.get('title', song.title)
        song.key = request.json.get('key', song.key)
        song.instrumentation = request.json.get('instrumentation', song.instrumentation)
        song.notes = request.json.get('notes', song.notes)

        db.session.commit()
        return "Song updated"
    except Exception as e:
        return (str(e))

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
