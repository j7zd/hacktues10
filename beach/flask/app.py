from flask import Flask, request
from os import getenv

API_KEY = getenv("API_KEY")

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive_data():
    data = request.json
    # if request.headers.get("api_key") != API_KEY:
    #     return "Unauthorized", 401
    print(data, flush=True)
    return 'OK'
