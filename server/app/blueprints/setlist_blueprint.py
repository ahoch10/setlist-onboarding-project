from flask import Flask, request, jsonify, Blueprint
from app.models.Setlist import Setlist
from app.extensions import db

setlists = Blueprint("setlists", __name__)

# GET route to get all setlists
@setlists.route('/setlists', methods=['GET'])
def all_setlists():
    setlists = Setlist.query.all()
    results = [ {
        "id": setlist.id,
        "title": setlist.title,
        "date": setlist.date,
        "songs": setlist.songs,
        "user_id": setlist.user_id
    } for setlist in setlists]
    return jsonify({"setlists": results})

# POST route to add a setlist
@setlists.route('/setlists', methods=["POST"])
def add_setlist():
    setlist_data = request.get_json()

    title = setlist_data.get("title")
    date = setlist_data.get("date")
    user_id = setlist_data.get("user_id")

    setlist = Setlist(
            title=title,
            date=date,
            user_id=user_id
    )
    db.session.add(setlist)
    db.session.commit()
    return "Setlist added"

# DELETE route to delete a setlist
@setlists.route('/setlists/<int:id>', methods=["DELETE"])
def delete_setlist(id:int):
    setlist = Setlist.query(id)
    db.session.delete(setlist)
    db.session.commit()

    return "Setlist deleted"

# PUT route to update a setlist
@setlists.route('/setlists/<int:id>')
def update_setlist(id:int):
    setlist = Setlist.query.get(id)
    setlist_data = request.get_json()

    setlist.title = setlist_data.get('title', setlist.title)
    setlist.date = setlist_data.get('date', setlist.date)

    db.session.commit()

    return "Setlist updated"
