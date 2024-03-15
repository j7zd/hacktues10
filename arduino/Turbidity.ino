//turbitity means the cloudiness of the water

#define Vclear 2

int turbidityPin;

void turbiditySetup(int pin) {
    turbidityPin = pin;
}

int readTurbidity() {
    const int numReadings = 20;
    float sum = 0;
    for (int i = 0; i < numReadings; i++) {
        float sensorValue = analogRead(turbidityPin);
        float voltage = sensorValue * (5.0 / 1023.0);
        float turbidity = 100.00 - (voltage/Vclear)*100;
        sum += turbidity;
    }
    return sum / numReadings;
}
