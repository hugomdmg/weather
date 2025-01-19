from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

from src.weather import coord_weather_blueprint, city_weather_blueprint

load_dotenv()
APP_URL = os.getenv("APP_URL", "*")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": APP_URL}})

app.register_blueprint(coord_weather_blueprint)
app.register_blueprint(city_weather_blueprint)


@app.route('/', methods=['GET'])
def hello():
    return jsonify({'message': 'hello from weather api'})




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
