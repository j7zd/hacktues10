#include <EEPROM.h>
#include "GravityTDS.h"

// This is a class for mesuring water cuality. PPM is the unit of mesurement
class TDS {
    private:
        GravityTDS gravityTds;
    public:
        TDS(int pin) {
            gravityTds.setPin(pin);
            gravityTds.setAref(5.0); 
            gravityTds.setAdcRange(1024);  
            gravityTds.begin(); 
        }

        float getTDS() {
            gravityTds.update();  
            return gravityTds.getTdsValue();  
        }
};
