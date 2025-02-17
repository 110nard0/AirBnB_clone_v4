#!/usr/bin/python3
""" Starts a Flash Web Application """
from os import environ
import uuid
from flask import Flask, render_template

from models import storage
from models.amenity import Amenity
from models.city import City
from models.place import Place
from models.review import Review
from models.state import State

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error):
    """Remove the current SQLAlchemy Session"""
    storage.close()


@app.route('/101-hbnb/', strict_slashes=False)
def hbnb():
    """Display a webpage for the AirBnB clone"""
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)

    st_ct = []
    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    reviews = storage.all(Review).values()
    reviews = sorted(reviews, key=lambda k: k.created_at)

    return render_template('101-hbnb.html',
                           states=st_ct, amenities=amenities,
                           places=places, reviews=reviews,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    """main function that starts server"""
    app.run(host='0.0.0.0', port=5000)
