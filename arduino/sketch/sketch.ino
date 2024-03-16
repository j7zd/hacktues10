#include <SoftwareSerial.h>
#include <ArduinoJson.h>
SoftwareSerial ESP8266(5, 6); // Rx, Tx

#define UID qwerty
#define NAME 6rek
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

String senseAndJson() {
  double pressure=0, air_temperature=0;
  //PresAndTempAir(air_temperature, pressure);
  double humidity = 0;//HumidityAir();
  double salinity = 0;//getTDS();
  double water_temperature = 0;//readTemperature(TEMP_PIN);
  double turbidity = 0;//readTurbidity();
  double wave_intensity = 0;
  
  const String json = "{\"uid\":\"" + String(UID) + "\",\"name\":\"" + String(NAME) + "\",\"longtitude\":" + String(LONGTITUDE, 6) + ",\"latitude\":" + String(LATITUDE, 6) + ",\"pressure\":" + String(pressure, 2) + ",\"air_temperature\":" + String(air_temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"salinity\":" + String(salinity, 2) + ",\"water_temperature\":" + String(water_temperature, 2) + ",\"turbidity\":" + String(turbidity, 2) + ",\"wave_intensity\":" + String(wave_intensity, 2) + "}";
  
  return json;
}

String senseAndJson() {
  double pressure=0, air_temperature=0;
  //PresAndTempAir(air_temperature, pressure);
  double humidity = 0;//HumidityAir();
  double salinity = 0;//getTDS();
  double water_temperature = 0;//readTemperature(TEMP_PIN);
  double turbidity = 0;//readTurbidity();
  double wave_intensity = 0;
  
  const String json = "{\"uid\":\"" + String(UID) + "\",\"name\":\"" + String(NAME) + "\",\"longtitude\":" + String(LONGTITUDE, 6) + ",\"latitude\":" + String(LATITUDE, 6) + ",\"pressure\":" + String(pressure, 2) + ",\"air_temperature\":" + String(air_temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"salinity\":" + String(salinity, 2) + ",\"water_temperature\":" + String(water_temperature, 2) + ",\"turbidity\":" + String(turbidity, 2) + ",\"wave_intensity\":" + String(wave_intensity, 2) + "}";
  
  return json;
}

void loop() {
  double pressure=0, air_temperature=0;
  //PresAndTempAir(air_temperature, pressure);
  double humidity = 0;//HumidityAir();
  double salinity = 0;//getTDS();
  double water_temperature = 0;//readTemperature(TEMP_PIN);
  double turbidity = 0;//readTurbidity();
  double wave_intensity = 0;

  
  if (startTCPConnection()) {
    String json = "{\"uid\":\"" + String(UID) + "\",\"name\":\"" + String(NAME) + "\",\"longtitude\":" + String(LONGTITUDE, 6) + ",\"latitude\":" + String(LATITUDE, 6) + ",\"pressure\":" + String(pressure, 2) + ",\"air_temperature\":" + String(air_temperature, 2) + ",\"humidity\":" + String(humidity, 2) + ",\"salinity\":" + String(salinity, 2) + ",\"water_temperature\":" + String(water_temperature, 2) + ",\"turbidity\":" + String(turbidity, 2) + ",\"wave_intensity\":" + String(wave_intensity, 2) + "}";
    Serial.println(json);
    sendHTTPPostRequest(json);
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
Static worker unexpectedly exited with code: null and signal: SIGTERM
=> using new database connection
Cycle 1: Random data for Buoy-0-1710553731874 added successfully
Cycle 2: Random data for Buoy-1-1710553746665 added successfully
Cycle 3: Random data for Buoy-2-1710553758658 added successfully
Static worker unexpectedly exited with code: null and signal: SIGTERM
=> using new database connection
Cycle 1: Random data for Buoy-0-1710553792350 added successfully
Cycle 2: Random data for Buoy-1-1710553808043 added successfully
Cycle 3: Random data for Buoy-2-1710553819635 added successfully
Static worker unexpectedly exited with code: null and signal: SIGTERM
> Build error occurred
Error: Static page generation for /api/generaterandomdata is still timing out after 3 attempts. See more info here https://nextjs.org/docs/messages/static-page-generation-timeout
    at onRestart (/vercel/path0/web/buoyeing/node_modules/next/dist/build/index.js:738:39)
    at /vercel/path0/web/buoyeing/node_modules/next/dist/lib/worker.js:95:40
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async /vercel/path0/web/buoyeing/node_modules/next/dist/export/index.js:523:20
    at async Span.traceAsyncFn (/vercel/path0/web/buoyeing/node_modules/next/dist/trace/trace.js:105:20)
    at async /vercel/path0/web/buoyeing/node_modules/next/dist/export/index.js:521:24
    at async Promise.all (index 3)
    at async exportAppImpl (/vercel/path0/web/buoyeing/node_modules/next/dist/export/index.js:513:21)
    at async /vercel/path0/web/buoyeing/node_modules/next/dist/export/index.js:673:16
    at async Span.traceAsyncFn (/vercel/path0/web/buoyeing/node_modules/next/dist/trace/trace.js:105:20)
Error: Command "npm run build" exited with 1