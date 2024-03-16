#include <Wire.h>
#include <Bonezegei_DHT11.h>

Bonezegei_DHT11 dht(11);

void HumiditySetup() {
  dht.begin();
}
void TempSetup(){
  dht.begin();
}
//all functions to measure are the same logic
double TemperatureAir() {
  double temperature=0;
  double temp_sum=0;
  double sample[5] = {};
  int sample_size = 5;
  dht.getData();

  for (int i = 0; i < sample_size; i++) {
    dht.getData();
    sample[i] = dht.getTemperature();
    delay(10);
  }

  for (int i = 0; i < sample_size; i++) {
    temp_sum += sample[i];
  }
  temperature = temp_sum / sample_size;
  return temperature;
}
double HumidityAir() {
  double humidity=0;
  double humidity_sum=0;
  double sample[5] = {};
  int sample_size = 5;

  for (int i = 0; i < sample_size; i++) {
    dht.getData();
    sample[i] = dht.getHumidity();
    delay(10);
  }

  for (int i = 0; i < sample_size; i++) {
    humidity_sum += sample[i];
  }
  humidity = humidity_sum / sample_size;
  return humidity;
}
