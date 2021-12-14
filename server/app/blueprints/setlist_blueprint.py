from flask import Flask, request, jsonify, Blueprint, session
from app.models.Setlist import Setlist
from app.models.User import User
from app.extensions import db


setlists = Blueprint("setlists", __name__)

def requires_login(func):
    def wrapper(*args, **kwargs):
        user_email = session.get("user_email")
        if user_email is None:
            return redirect("/login")
        user = User.query.filter_by(email = user_email).one_or_none()
        if user is None:
            return redirect("/login")
        return func(user, *args, **kwargs)
    return wrapper

# GET route to get all setlists
@requires_login
@setlists.route("/setlists", methods=["GET"])
def all_setlists():
    setlists = Setlist.query.all()
    results = [
        setlist.to_json() for setlist in setlists
    ]
    return jsonify({"setlists": results})


# POST route to add a setlist
@requires_login
@setlists.route("/setlists", methods=["POST"])
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
@requires_login
@setlists.route("/setlists/<int:id>", methods=["DELETE"])
def delete_setlist(user:User, id: int):
    setlist = Setlist.query(id)
    db.session.delete(setlist)
    db.session.commit()

    return "Setlist deleted"


# PUT route to update a setlist
@requires_login
@setlists.route("/setlists/<int:id>")
def update_setlist(id: int):
    setlist = Setlist.query.get(id)
    setlist_data = request.get_json()

    setlist.title = setlist_data.get("title", setlist.title)
    setlist.date = setlist_data.get("date", setlist.date)

    db.session.commit()

    return "Setlist updated"

