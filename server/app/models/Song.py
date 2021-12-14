from app.extensions import db

class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10))
    instrumentation = db.Column(db.Text)
    notes = db.Column(db.Text)
    order_index = db.Column(db.Integer)
    setlist_id = db.Column(db.Integer, db.ForeignKey('setlist.id'), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "key": self.key,
            "instrumentation": self.instrumentation,
            "notes": self.notes,
            "order_index": self.order_index,
            "setlist_id": self.setlist_id
        }
