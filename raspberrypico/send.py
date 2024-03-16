import network
import time
import urequests
import ujson
from machine import UART

uart = UART(1, 9600)
uart.init(9600, bits=0, parity=None, stop=1)

print("Connecting to WiFi", end="")
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("Buoy", "shrekisloveshrekislife")
while not wlan.isconnected():
  print(".", end="")
  time.sleep(0.5)
print(" Connected!")
print(wlan.ifconfig())

while True:
    json = uart.read()
    if json is None:
        continue
    print(json)
    r = urequests.post("http://192.168.61.236:5000", headers = {'content-type': 'application/json'}, data=json[:-2])
