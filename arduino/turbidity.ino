#define Vclear 2

class Turbidity {
public:
    Turbidity(int pin) {
        this->pin = pin;
    }

    int read() {
        float sensorValue = analogRead(pin);
        float voltage = sensorValue * (5.0 / 1023.0);
        float turbidity = 100.00 - (voltage/Vclear)*100;
    }

private:
    int pin;
};
