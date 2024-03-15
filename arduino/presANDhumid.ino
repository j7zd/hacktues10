#include "dht.h"
#include <Wire.h>
#include <SFE_BMP180.h>
#define dht_apin A0

SFE_BMP180 bmp180;
dht DHT;
struct PresTemp {float pressure, temperature;};

void setup() {
  Serial.begin(9600);
  delay(1000);
}
void loop() {
  delay(5000);
}
void PresureAndTemperatureSetup() {
  bmp180.begin();
  return;
}

void HumiditySetup() {
  return;// this is only for aestetics and so all sensors and modules have an init
}
//all functions to measure are the same logic
struct PresTemp PresAndTempAir() {
  float pressure=0;//var for final sum
  float pressure_sum=0;//add up var for average
  float temperature = 0;
  float temperature_sum = 0;
  float sample[20] = {};//sample array 
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
  struct PresTemp prestemp = {pressure, temperature};
  return prestemp;
}
float HumidityAir() {
  float humidity=0;
  float humidity_sum=0;
  float sample[20] = {};
  int sample_size = 20;

  for (int i = 0; i < sample_size; i++) {
    DHT.read11(dht_apin);
    sample[i] = DHT.humidity;
    delay(50);
  }
  for (int i = 0; i < sample_size; i++) {
    humidity_sum += sample[i];
  }
  humidity = humidity_sum / sample_size;
  return humidity;
}
