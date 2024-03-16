#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial ESP8266(5, 6); // Rx, Tx

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
  


  Serial.begin(9600);
  ESP8266.begin(9600);
  startTime = millis();
  //connectToWiFi();
  
  // setup the sensors
  HumiditySetup();
  TempSetup();

  initTDS(TDS_PIN);
  turbiditySetup(TURBIDITY_PIN);
  WaveSensorINIT();

  Serial.print("Finished init");
}

void loop() {
  double pressure=0, air_temperature=0;
  //PresAndTempAir(air_temperature, pressure);
  double humidity = 0;//HumidityAir();
  double salinity = 0;//getTDS();
  double water_temperature = 0;//readTemperature(TEMP_PIN);
  double turbidity = 0;//readTurbidity();
  double wave_intensity = 0;

  
  String json = "{\"UID\":\"" + String(UID) + "\",\"name\":\"" + String(NAME) + "\",\"longitude\":" + String(LONGTITUDE, 6) + ",\"latitude\":" + String(LATITUDE, 6) + ",\"pressure\":" + String(pressure, 2) + ",\"air_temperature\":" + String(air_temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"salinity\":" + String(salinity, 2) + ",\"water_temperature\":" + String(water_temperature, 2) + ",\"turbidity\":" + String(turbidity, 2) + ",\"wave_intensity\":" + String(wave_intensity, 2) + "}";
  Serial.println(json);

  ESP8266.println(json);

  
  delay(10000);
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  ESP8266.print("AT+CWJAP=\"Buoys\",\"shrekislove\"\r\n");
  long startTime = millis();
  while (millis() - startTime < 15000) { // 15 seconds timeout
    if (ESP8266.find("WIFI CONNECTED")) {
      Serial.println("WiFi Connected.");
      return;
    }
  }
  Serial.println("WiFi Connect Timeout.");
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

void sendHTTPPostRequest(const String jsonData) {
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
