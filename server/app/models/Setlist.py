from app.extensions import db

class Setlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50))
    songs = db.relationship('Song', backref='setlist', cascade="all, delete", lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_json(self):
       return  {
            "id": self.id,
            "title": self.title,
            "date": self.date,
            "songs": [song.to_json() for song in self.songs],
            "user_id": self.user_id,
        }

