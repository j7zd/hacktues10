#include <SoftwareSerial.h>
SoftwareSerial ESP8266(2, 3); // Rx, Tx

const long writingTimer = 17000; // Interval to send data (in milliseconds)
unsigned long startTime = 0;

const int sensorPin = A0;
float temperature;

String myAPIkey = "1YJXB9J5RLDOURL6"; // Your Write API Key

void setup() {
  Serial.begin(9600);
  ESP8266.begin(9600);
  startTime = millis();
  connectToWiFi();
}

void loop() {
  if (millis() - startTime > writingTimer) {
    temperature = readTemperature();
    sendToThingSpeak(temperature);
    startTime = millis();
  }
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

float readTemperature() {
  float vout = analogRead(sensorPin) * 5.0 / 1024;
  return (vout - 0.5) * 100; // Convert to temperature
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
