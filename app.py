# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
DATABASE_URL = "postgresql://zbhtrmywnxmbym:199f1d11d2d4d504723828eb19e03483e17129e0ebb111e895bdc32998715894@ec2-3-212-75-25.compute-1.amazonaws.com:5432/de12rg1na3grjp"

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '')

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# from .models import Quake


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
@app.route("/send", methods=["GET", "POST"])
def send():
    if request.method == "POST":
        name = request.form["petName"]
        lat = request.form["petLat"]
        lon = request.form["petLon"]

        pet = Pet(name=name, lat=lat, lon=lon)
        db.session.add(pet)
        db.session.commit()
        return redirect("/", code=302)

    return render_template("form.html")


@app.route("/api/house")
def pals():
    results = db.session.query(cityinfo.City, cityinfo.Latitude, cityinfo.Longitude).all()
    hover_text = [result[0] for result in results]
    lat = [result[1] for result in results]
    lon = [result[2] for result in results]
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


#
# import numpy as np
#
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func
#
# from flask import Flask, jsonify
#
#
# #################################################
# # Database Setup
# #################################################
# engine = create_engine("sqlite:///titanic.sqlite")
#
# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)
#
# # Save reference to the table
# Passenger = Base.classes.passenger
#
# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)
#
#
# #################################################
# # Flask Routes
# #################################################
#
# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/names<br/>"
#         f"/api/v1.0/passengers"
#     )
#
#
# @app.route("/api/v1.0/names")
# def names():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#
#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Passenger.name).all()
#
#     session.close()
#
#     # Convert list of tuples into normal list
#     all_names = list(np.ravel(results))
#
#     return jsonify(all_names)
#
#
# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#
#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()
#
#     session.close()
#
#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)
#
#     return jsonify(all_passengers)
#
#
# if __name__ == '__main__':
#     app.run(debug=True)
