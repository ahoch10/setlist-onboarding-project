from flask import Flask, request, jsonify, Blueprint, session, redirect
from app.models.Setlist import Setlist
from app.models.User import User
from app.extensions import db


setlists = Blueprint("setlists", __name__)

#decorator requiring login
def requires_login(func):
    def wrapper(*args, **kwargs):
        user_email = session.get("user_email")
        if user_email is None:
            return redirect("/login")
        user = User.query.filter_by(email = user_email).first()
        if user is None:
            return redirect("/login")
        return func(user, *args, **kwargs)
    wrapper.__name__ = func.__name__
    return wrapper

# GET route to get all setlists
@setlists.route("/setlists", methods=["GET"])
@requires_login
def all_setlists(user:User):
    setlists = Setlist.query.all()
    results = [
        setlist.to_json() for setlist in setlists
    ]
    return jsonify({"setlists": results})

#GET route for a single setlist's songs
@setlists.route("/setlists/<int:id>/songs", methods=["GET"])
@requires_login
def single_setlist_songs(user:User, id:int):
    setlist = Setlist.query.filter_by(id=id).first()
    songs = [ song.to_json() for song in setlist.songs ]
    return jsonify({"songs": songs})


# POST route to add a setlist
@setlists.route("/setlists", methods=["POST"])
@requires_login
def add_setlist(user:User):

    setlist_data = request.get_json()

    title = setlist_data.get("title")
    date = setlist_data.get("date")
    user_id = user.id

    setlist = Setlist(title=title, date=date, user_id=user_id)
    db.session.add(setlist)
    db.session.commit()
    return "Setlist added"


# DELETE route to delete a setlist
@setlists.route("/setlists/<int:id>", methods=["DELETE"])
@requires_login
def delete_setlist(user:User, id: int):
    setlist = Setlist.query.get(id)
    db.session.delete(setlist)
    db.session.commit()

    return "Setlist deleted"


# PUT route to update a setlist
@setlists.route("/setlists/<int:id>", methods=["PUT"])
@requires_login
def update_setlist(user:User, id: int):
    setlist = Setlist.query.get(id)
    setlist_data = request.get_json()

    setlist.title = setlist_data.get("title", setlist.title)
    setlist.date = setlist_data.get("date", setlist.date)

    db.session.commit()

    return "Setlist updated"

