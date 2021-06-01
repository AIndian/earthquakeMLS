# import necessary libraries
from flask import (
    render_template,
)
import sqlalchemy as db
from flask import Flask, jsonify

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
DATABASE_URL = "postgresql://zbhtrmywnxmbym:199f1d11d2d4d504723828eb19e03483e17129e0ebb111e895bdc32998715894@ec2-3-212-75-25.compute-1.amazonaws.com:5432/de12rg1na3grjp"
engine = db.create_engine(DATABASE_URL)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results

# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]
#
#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)
#
#     return render_template("form.html")


@app.route("/api/house")
def pals():
    connection = engine.connect()
    metadata = db.MetaData()
    info = db.Table('cityloc', metadata, autoload=True, autoload_with=engine)
    query = db.select([info])
    results = connection.execute(query).fetchall()
    lat = [result[0] for result in results]
    lon = [result[1] for result in results]
    hover_text = [result[2] for result in results]
    pri = [result[3] for result in results]


    city_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": lat,
        "lon": lon,
        "pri": pri,
        "text": hover_text,
        "hoverinfo": "text",
        "marker": {
            "size": 15,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(city_data)

if __name__ == "__main__":
    app.run()
