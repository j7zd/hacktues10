#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial ESP8266(6, 5); // Rx, Tx

#define UID "qwerty"
#define NAME "6rek"
#define LONGTITUDE 69.6
#define LATITUDE 42.0

#define TDS_PIN A1
#define TEMP_PIN A3
#define TURBIDITY_PIN A0


const long writingTimer = 17000; // Interval to send data (in milliseconds)
unsigned long startTime = 0;

String myAPIkey = "1YJXB9J5RLDOURL6"; // Your Write API Key

void setup() {
  Serial.begin(115200);
  ESP8266.begin(9600);
  startTime = millis();
  connectToWiFi();

  // setup the sensors
  PresureAndTemperatureSetup();
  HumiditySetup();
  initTDS(TDS_PIN);
  turbiditySetup(TURBIDITY_PIN);
  //WaveSensorINIT();

  Serial.println("Finished init");
}

void loop() {

  double pressure, air_temperature;
  PresAndTempAir(air_temperature, pressure);
  double humidity = HumidityAir();
  double salinity = getTDS();
  double water_temperature = readTemperature(TEMP_PIN);
  double turbidity = readTurbidity();
  double wave_intensity = 0;
  
  String jsonData = "{\"uid\":\"" + String(UID) + "\",\"name\":\"" + String(NAME) + "\",\"longtitude\":" + String(LONGTITUDE, 6) + ",\"latitude\":" + String(LATITUDE, 6) + ",\"pressure\":" + String(pressure, 2) + ",\"air_temperature\":" + String(air_temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"salinity\":" + String(salinity, 2) + ",\"water_temperature\":" + String(water_temperature, 2) + ",\"turbidity\":" + String(turbidity, 2) + ",\"wave_intensity\":" + String(wave_intensity, 2) + "}";

  if (startTCPConnection()) {
    String jsonData = "{\"temp\":" + String(temperature, 2) + "}";
    sendHTTPPostRequest(jsonData);
  }
  
  delay(10000);
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  ESP8266.print("AT+CWJAP=\"Buoy\",\"shrekisloveshrekislife\"\r\n");
  long startTime = millis();
  while (millis() - startTime < 15000) { // 15 seconds timeout
    if (ESP8266.find("WIFI CONNECTED")) {
      Serial.println("WiFi Connected.");
      return;
    }
  }
  Serial.println("WiFi Connect Timeout.");
}

void sendToThingSpeak(float temperature) {
  if (startTCPConnection()) {
    String jsonData = "{\"temp\":" + String(temperature, 2) + "}";
    sendHTTPPostRequest(jsonData);
  }
}

bool startTCPConnection() {
  String cmd = "AT+CIPSTART=\"TCP\",\"192.168.61.236\",5000";
  ESP8266.println(cmd);
  if (ESP8266.find("Error")) {
    Serial.println("AT+CIPSTART error");
    return false;
  }
  return true;
}

void sendHTTPPostRequest(String jsonData) {
  String postRequest = "POST / HTTP/1.1\r\n";
  postRequest += "Host: 192.168.61.236\r\n";
  postRequest += "Connection: close\r\n";
  postRequest += "Content-Type: application/json\r\n";
  postRequest += "Content-Length: " + String(jsonData.length()) + "\r\n";
  postRequest += "\r\n";
  postRequest += jsonData;

  ESP8266.println("AT+CIPSEND=" + String(postRequest.length()));
  if (ESP8266.find(">")) {
    ESP8266.print(postRequest);
    Serial.println("Data sent: " + jsonData);
    ESP8266.println("AT+CIPCLOSE");
  } else {
    Serial.println("CIPSEND error");
  }
}
