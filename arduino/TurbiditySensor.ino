float Vclear = 2;
float turbidity = 0.00;
void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(A0);
  float voltage = sensorValue * (5.0 / 1023.0);
  turbidity = 100.00 - (voltage/Vclear)*100;
  Serial.print(turbidity);
  Serial.println("% ");
  delay(1000);

}
