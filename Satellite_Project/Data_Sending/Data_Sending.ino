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

  Serial.begin(115200);
}

void loop()
{
  while(!Serial.available());
  String arrive = Serial.readString();
  char msg[arrive.length()];
  arrive.toCharArray(msg, arrive.length());
  Serial.println(msg);
  rf_driver.send((uint8_t *)msg, strlen(msg));
  rf_driver.waitPacketSent();
  
}
