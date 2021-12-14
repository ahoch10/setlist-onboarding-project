from flask import Flask, request, jsonify, Blueprint
from app.models.Song import Song
from app.extensions import db

songs = Blueprint("songs", __name__)

# GET route to get all songs
@songs.route('/songs', methods=["GET"])
def all_songs():
    print("get songs function")
    songs = Song.query.order_by(Song.order_index).all()
    results = [ {
        "id": song.id,
        "title": song.title,
        "instrumentation": song.instrumentation,
        "key": song.key,
        "notes": song.notes,
        "order_index": song.order_index,
        "setlist_id": song.setlist_id
    } for song in songs]
    return jsonify({"songs": results})

# POST route to add a song
@songs.route('/songs', methods=["POST"])
def add_song():
    song_data = request.get_json()

    title = song_data.get("title")
    key = song_data.get("key")
    instrumentation = song_data.get("instrumentation")
    notes = song_data.get("notes")
    setlist_id = song_data.get("setlist_id")

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
            order_index=order_index,
            setlist_id=setlist_id
    )
    db.session.add(song)
    db.session.commit()
    return "Song added"

# DELETE route to delete a song
@songs.route('/songs/<int:id>', methods=["DELETE"])
def delete_song(id:int):
    song = Song.query.get(id)
    db.session.delete(song)
    db.session.commit()

    return "Song deleted"

# PUT route to update a song:
@songs.route('/songs/<int:id>', methods=["PUT"])
def update_song(id:int):
    song = Song.query.get(id)
    song_data = request.get_json()

    song.title = song_data.get('title', song.title)
    song.key = song_data.get('key', song.key)
    song.instrumentation = song_data.get('instrumentation', song.instrumentation)
    song.notes = song_data.get('notes', song.notes)
    song.setlist_id = song_data.get('setlist_id', song.setlist_id)

    db.session.commit()
    return "Song updated"

#PUT route to update order of songs:
@songs.route('/songs', methods=["PUT"])
def update_song_order():
    songs = Song.query.all()
    updated_songs = request.get_json()
    for song in updated_songs:
        # find corresponding dictionary in songs by id
        matching_song = [s for s in songs if s.id == song["id"]]
        # update the current song with the order_index from updated_songs
        matching_song[0].order_index = song["order_index"]

    db.session.commit()
    return "Song order updated"

