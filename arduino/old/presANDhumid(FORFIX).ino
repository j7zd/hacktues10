void setup() {
  Serial.begin(9600);
  delay(1000);
}
void PresureAndTemperatureSetup() {
  //here init the bmp180
  return;
}

void HumiditySetup() {
  return;// this is only for aestetics and so all sensors and modules have an init
}
//all functions to measure are the same logic
float PresureAir() {
  float preasure=0;//var for final sum
  float preasure_sum=0;//add up var for average
  float sample[20] = {};//sample array 
  int sample_size = 20;
  //taking the sample
  for (int i = 0; i < sample_size; i++) {
    sample[i] = //here add the preasure taking function
    delay(50)
  }
  //adding up the samle values
  for (int i = 0; i < sample_size; i++) {
    preasure_sum += sample[i];
  }
  //getting the average
  preasure = preasure_sum / sample_size;
  return preasure;
}
float TemperatureAir() {
  float temperature=0;
  float temperature_sum=0;
  float sample[20] = {};
  int sample_size = 20;

  for (int i = 0; i < sample_size; i++) {
    sample[i] = //here add the temperature taking function
    delay(50)
  }
  for (int i = 0; i < sample_size; i++) {
    temperature_sum += sample[i];
  }
  temperature = temperature_sum / sample_size;
  return temperature;
}
float HumidityAir() {
  float humidity=0;
  float phumidity_sum=0;
  float sample[20] = {};
  int sample_size = 20;

  for (int i = 0; i < sample_size; i++) {
    sample[i] = //here add the humidity taking function
    delay(50)
  }
  for (int i = 0; i < sample_size; i++) {
    humidity_sum += sample[i];
  }
  humidity = humidity_sum / sample_size;
  return humidity;
}

void loop() {
  
  delay(5000);
}
