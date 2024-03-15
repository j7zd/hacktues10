#include <Wire.h>
#include <SFE_BMP180.h>
#include <Bonezegei_DHT11.h>

SFE_BMP180 bmp180;
Bonezegei_DHT11 dht(11);

void PresureAndTemperatureSetup() {
  bmp180.begin();
  return;
}

void HumiditySetup() {
  dht.begin();
}
//all functions to measure are the same logic
void PresAndTempAir(double& temperature, double& pressure) {
  float pressure_sum=0;//add up var for average
  float temperature_sum = 0;
  int sample_size = 20, i = 0;
  
  double T, P;
  char status;
  
  while(i <= sample_size){

    status = bmp180.startTemperature();
    if (status != 0) {
        delay(status);
        status = bmp180.getTemperature(T);
        
        if (status != 0) {
          temperature_sum += T;
          status = bmp180.startPressure(2);
    
          if (status != 0) {
            delay(status);
            status = bmp180.getPressure(P, T);
            if(status!= 0)
              pressure_sum += P;
               }
             }
           }
    i += 1;
  }
  pressure = pressure_sum / sample_size;
  temperature = temperature_sum / sample_size;
}
double HumidityAir() {
  double humidity=0;
  double humidity_sum=0;
  double sample[10] = {};
  int sample_size = 10;

  for (int i = 0; i < sample_size; i++) {
    dht.getData();
    sample[i] = dht.getHumidity();
    delay(50);
  }
  for (int i = 0; i < sample_size; i++) {
    humidity_sum += sample[i];
  }
  humidity = humidity_sum / sample_size;
  return humidity;
}
