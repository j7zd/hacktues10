from flask import Flask, request
from os import getenv
from datetime import datetime
import requests

API_KEY = getenv("API_KEY")
send_url = getenv("SEND_URL")

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive_data():
    received = request.json
    # if request.headers.get("api_key") != API_KEY:
    #     return "Unauthorized", 401
    print(received, flush=True)

    currtime = datetime.now()

    data = {}
    data['UID'] = str(received['UID'])
    data['timestamp'] = currtime.strftime("%Y-%m-%d %H:%M:%S")
    data['wave_intensity'] = float(received['wave_intensity'])
    data['turbidity'] = float(received['turbidity'])
    data['water_temperature'] = float(received['water_temperature'])
    data['salinity'] = float(received['salinity'])
    data['air_temperature'] = float(received['air_temperature'])
    data['humidity'] = float(received['humidity'])
    data['pressure'] = float(received['pressure'])
    data['lat'] = float(received['latitude'])
    data['lng'] = float(received['longitude'])
    data['name'] = str(received['name'])

    requests.post(send_url, json=data)

    return 'OK'
