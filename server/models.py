from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10))
    instrumenation = db.Column(db.Text)
    notes = db.Column(db.Text)
