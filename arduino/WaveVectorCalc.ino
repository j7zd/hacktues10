#include <Wire.h>
#include <Adafruit_MMA8451.h>
#include <Adafruit_Sensor.h>

Adafruit_MMA8451 mma = Adafruit_MMA8451();

void setup(void) {
  Serial.begin(9600);


}

void WaveSensorINIT()
{
  //magic commands that make initalisaton
  Serial.println("Wave sensor(accselerometer) int start");
  if (! mma.begin()) {
    Serial.println("Couldnt start");
    while (1);
  }
  mma.setRange(MMA8451_RANGE_2_G);
  Serial.println("Senesor is INIT-ed");
  }

int CalculateWaves()
{
  //const variables for sample size and averaging
  const int SampleSize = 200;
  const int numReadings = 15;
  //inst needed for calculating
  float readingsX[numReadings]; // array to store readings for X
  float readingsY[numReadings];
  float readingsZ[numReadings];
  int index = 0; // index for the current reading
  float totalX = 0;
  float totalY = 0;
  float totalZ = 0;
  float averageX = 0; //var for seperating the averaging data from the processing X
  float averageY = 0;
  float averageZ = 0;
  int finalX = 0;
  int finalY = 0;
  int finalZ = 0;
  int Vector = 0;
  int VectorWaves[200] = {};
  int tmp;
  //gathering data for 10 secounds to get theaverage movement of the wave (up and down)
  for (int i = 0 ; i < 200 ; i++) {
    // read the 'raw' data in 14-bit counts
    mma.read();

    // get a new sensor event(data)
    sensors_event_t event;
    mma.getEvent(&event);

    // subtract the oldest reading
    totalX -= readingsX[index];
    totalY -= readingsY[index];
    totalZ -= readingsZ[index];

    // store the new readings
    readingsX[index] = event.acceleration.x;
    readingsY[index] = event.acceleration.y;
    readingsZ[index] = event.acceleration.z;

    // add the new readings
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
    // display the results  FOR DEBUG
    /*
      Serial.print("X: \t"); Serial.print(finalX); Serial.print("\t");
      Serial.print("Y: \t"); Serial.print(finalY); Serial.print("\t");
      Serial.print("Z: \t"); Serial.print(finalZ); Serial.print("\t");
    */
    Vector = finalX + finalY + finalZ;
    Vector *= -1; //sesor may be upside-down so this can be enabled depends on code but i wont remove it before i know its position in the robot
    VectorWaves[i] = Vector;
    delay(50);
  }
  //end of collecting data
  //now begining data averaging and getting the averagefor 10 sec
  for (int x = 0; x < SampleSize; x++) {
    tmp += VectorWaves[x];
  }

  return tmp / SampleSize;


}
void loop() {
  int i = CalculateWaves();
  Serial.println(i);
  delay(2000);
}
