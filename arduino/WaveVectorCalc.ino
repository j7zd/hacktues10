#include <Wire.h>
#include <Adafruit_MMA8451.h>
#include <Adafruit_Sensor.h>

Adafruit_MMA8451 mma = Adafruit_MMA8451();

const int numReadings = 15;  // Number of readings to average
float readingsX[numReadings]; // Array to store readings for X
float readingsY[numReadings]; // Array to store readings for Y
float readingsZ[numReadings]; // Array to store readings for Z
int index = 0; // Index for the current reading
float totalX = 0; // Total for X
float totalY = 0; // Total for Y
float totalZ = 0; // Total for Z
float averageX = 0; //var for seperating the averaging data from the processing X 
float averageY = 0; //var for seperating the averaging data from the processing X 
float averageZ = 0; //var for seperating the averaging data from the processing X 
int finalX = 0;
int finalY = 0;
int finalZ = 0;
int Vector = 0;

void setup(void) {
  Serial.begin(9600);
  
  Serial.println("Adafruit MMA8451 test!");
  
  //initializing communication
  if (! mma.begin()) {
    Serial.println("Couldnt start");
    while (1);
  }
  Serial.println("MMA8451 found!");
  
  mma.setRange(MMA8451_RANGE_2_G);
  
  Serial.print("Range = "); Serial.print(2 << mma.getRange());  
  Serial.println("G");
}

void loop() {
  // Read the 'raw' data in 14-bit counts
  mma.read();

  /* Get a new sensor event */ 
  sensors_event_t event; 
  mma.getEvent(&event);
  
  // Subtract the oldest reading
  totalX -= readingsX[index];
  totalY -= readingsY[index];
  totalZ -= readingsZ[index];
  
  // Store the new readings
  readingsX[index] = event.acceleration.x;
  readingsY[index] = event.acceleration.y;
  readingsZ[index] = event.acceleration.z;
  
  // Add the new readings
  totalX += readingsX[index];
  totalY += readingsY[index];
  totalZ += readingsZ[index];
  // Move to the next index
  index = (index + 1) % numReadings;
  //getting average
  averageX = totalX / numReadings;
  averageY = totalY / numReadings;
  averageZ = totalZ / numReadings;
  //offsets sum
  averageX += -0.2;
  averageY += 0.30;
  averageZ += -10;
  // removing the last decimal because it is too static and generates unwanted noise
  finalX = averageX * 10;
  finalY = averageY * 10;
  finalZ = averageZ * 10;
  /* Display the results (acceleration is measured in m/s^2)  FOR DEBUG*/
  /*
  Serial.print("X: \t"); Serial.print(finalX); Serial.print("\t");
  Serial.print("Y: \t"); Serial.print(finalY); Serial.print("\t");
  Serial.print("Z: \t"); Serial.print(finalZ); Serial.print("\t");
  Serial.println("m/s^2 ");
  */
  Vector = finalX + finalY + finalZ;
  //Vector *= -1; //sesor may be upside-down so this can be enabled depends on code but i wont remove it before i know its position in the robot
  Serial.println(Vector);
  delay(10);
}
