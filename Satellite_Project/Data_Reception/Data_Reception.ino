// Include RadioHead Amplitude Shift Keying Library
#include <RH_ASK.h>
// Include dependant SPI Library 
#include <SPI.h> 
 
// Create Amplitude Shift Keying Object
RH_ASK rf_driver;
 
void setup()
{
    // Initialize ASK Object
    rf_driver.init();
    // Setup Serial Monitor
    Serial.begin(115200);
}
 
void loop()
{
    // Set buffer to size of expected message
    uint8_t buf[50];
    uint8_t buflen = sizeof(buf);
    memset(buf, 0, sizeof(buf)); // This sets the memory of the char array to 0 everywhere
    // Check if received packet is correct size
    if (rf_driver.recv(buf, &buflen))
    {
      
      // Message received with valid checksum
      Serial.println((char*)buf);
    }
    
}
