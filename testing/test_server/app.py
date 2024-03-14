from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['POST'])
def receive_data():
    data = request.get_data()
    print(data)
    print("Data received successfully")
    return data
