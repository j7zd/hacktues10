float readTemperature(int sensorPin) {
  float vout = analogRead(sensorPin) * 5.0 / 1024;
  return (vout - 0.5) * 100; // Convert to temperature
}
