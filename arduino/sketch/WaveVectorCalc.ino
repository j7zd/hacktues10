#include <Adafruit_MMA8451.h>
#include <Adafruit_Sensor.h>

Adafruit_MMA8451 mma = Adafruit_MMA8451();


bool DEBUG_VAR = true;
bool DEBUG_SEE_VAL = false;


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
  CalculateWaves();
  Serial.println("end of setup");
  }

float CalculateWaves()
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
  float finalX = 0;
  float finalY = 0;
  float finalZ = 0;
  float Vector = 0;
  float VectorWaves[200] = {};
  float tmp = 0;
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
    
    // removing the last decimal because it is too static and generates unwanted noise
    finalX = round(averageX * 10.0) / 10.0;
    finalY = round(averageY * 10.0) / 10.0;
    finalZ = round(averageZ * 10.0) / 10.0;
    //offsets sum
    finalX += 0;
    finalY += 0;
    finalZ += 0;
    //only For debuging (maybe) when the sensor is upside down
    if(DEBUG_VAR){
      finalX *= -1;
      finalY *= -1;
      finalZ *= -1;
  }
    // display the results  FOR DEBUG
    if(DEBUG_SEE_VAL){
      Serial.print("X: \t"); Serial.print(finalX); Serial.print("\t");
      Serial.print("Y: \t"); Serial.print(finalY); Serial.print("\t");
      Serial.print("Z: \t"); Serial.print(finalZ); Serial.print("\t");
      Serial.println();
    }
    Vector = finalX + finalY + finalZ;
    VectorWaves[i] = Vector;
    delay(50);
  }
  //end of collecting data
  //now begining data averaging and getting the averagefor 10 sec
  for (int x = 0; x < SampleSize; x++) {
    tmp += VectorWaves[x];
  }

  return abs(tmp / SampleSize);


}
