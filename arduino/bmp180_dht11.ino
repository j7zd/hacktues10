#include "dht.h"
#include <Wire.h>
#include <SFE_BMP180.h>
#define dht_apin A0 

SFE_BMP180 bmp180;
dht DHT;
int Altitude = 0;

void setup(){
  Serial.begin(9600);
  bmp180.begin();
  delay(1000);
  
}
void loop(){
    char status;
    double T, P;

    DHT.read11(dht_apin);
    Serial.print("Humidity = ");
    Serial.print(DHT.humidity);
   
    status = bmp180.startTemperature();
  
    if (status != 0) {
      delay(1000);
      status = bmp180.getTemperature(T);
  
      if (status != 0) {
        status = bmp180.startPressure(3);
  
        if (status != 0) {
          delay(status);
          status = bmp180.getPressure(P, T);
  
          if (status != 0) {
            float comp = bmp180.sealevel(P, Altitude);
            
            Serial.print("Pressure: ");
            Serial.print(comp);
            Serial.println(" hPa");
  
            Serial.print("Temperature: ");
            Serial.print(T);
            Serial.println(" C\n"); 
          }
        }
      }
    }
      delay(5000);
} 
