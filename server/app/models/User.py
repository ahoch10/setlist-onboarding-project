from app.extensions import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(300), nullable=False)
    access_token = db.Column(db.Text, nullable=False)
    token_type = db.Column(db.String(20), nullable=False)
    expires_at = db.Column(db.Integer, nullable=False)
    refresh_token = db.Column(db.Text, nullable=False)
