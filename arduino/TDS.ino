#include <EEPROM.h>
#include "GravityTDS.h"

GravityTDS gravityTds; // Global GravityTDS object

// Initialization function
void initTDS(int pin) {
    gravityTds.setPin(pin);
    gravityTds.setAref(5.0);  // Set the analog reference voltage
    gravityTds.setAdcRange(1024);  // Set the ADC resolution
    gravityTds.begin();  // Initialize the sensor
}

// Function to get the TDS value
float getTDS() {
    gravityTds.update();  
    return gravityTds.getTdsValue();  // Return the TDS value
}
