//turbitity means the cloudiness of the water

#define Vclear 2

int turbidityPin;

void turbiditySetup(int pin) {
    turbidityPin = pin;
}

int readTurbidity() {
    float sensorValue = analogRead(turbidityPin);
    float voltage = sensorValue * (5.0 / 1023.0);
    float turbidity = 100.00 - (voltage/Vclear)*100;
}
