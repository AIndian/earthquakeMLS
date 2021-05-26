from .app import db


class quake(db.Model):
    __tablename__ = 'quake'

    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(64))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

    def __repr__(self):
        return '<quake %r>' % (self.name)
