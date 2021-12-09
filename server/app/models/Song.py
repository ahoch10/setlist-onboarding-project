from app.extensions import db

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10))
    instrumentation = db.Column(db.Text)
    notes = db.Column(db.Text)
    order_index = db.Column(db.Integer)
