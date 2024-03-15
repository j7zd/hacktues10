from flask import Flask, request
from os import getenv

API_KEY = getenv("API_KEY")

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive_data():
    received = request.json
    # if request.headers.get("api_key") != API_KEY:
    #     return "Unauthorized", 401
    print(received, flush=True)

    data = {}
    data['wave_intensity'] = received['wave_intensity']
    data['turbidity'] = received['turbidity']
    data['water_temperature'] = received['water_temperature']
    data['salinity'] = received['salinity']
    data['air_temperature'] = received['air_temperature']
    data['humidity'] = received['humidity']
    data['pressure'] = received['pressure']

    return 'OK'
