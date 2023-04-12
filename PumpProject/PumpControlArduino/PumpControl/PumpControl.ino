#include <AccelStepper.h>
#include <MultiStepper.h>

# define EN 8 // stepper motor enable , active low
# define DIR1 5
# define DIR2 6
# define DIR3 7
# define STP1 2
# define STP2 3
# define STP3 4

#define motorInterfaceType 1

float parsedData[12];
char runMode = 'O';
boolean inPause = false;
float pauseDist[3];

const byte numChars = 64;
char receivedChars[numChars];
char tempChars[numChars];
boolean newData = false;

AccelStepper step1 = AccelStepper(motorInterfaceType, STP1, DIR1);
AccelStepper step2 = AccelStepper(motorInterfaceType, STP2, DIR2);
AccelStepper step3 = AccelStepper(motorInterfaceType, STP3, DIR3);

void setup() {
  Serial.begin(9600);
  pinMode (DIR1, OUTPUT); pinMode (STP1, OUTPUT);
  pinMode (DIR2, OUTPUT); pinMode (STP2, OUTPUT);
  pinMode (DIR3, OUTPUT); pinMode (STP3, OUTPUT);
  pinMode (EN, OUTPUT);
  digitalWrite (EN, HIGH);  //THIS IS TO DISABLE THE STEPPERS WHEN NOT IN USE; COMMENT THIS AND LINES 43 and 67 TO CANCEL THIS FEATURE 
}

void loop() {
  reception();

  if (newData == true) {
    if (receivedChars[0] == 'R') {
      runMode = 'R';
      inPause = false;
      newData = false;
      digitalWrite(EN, LOW);
    }
    else if (receivedChars[0] == 'S') {
      stopAll();
      newData = false;
    }
    else if (receivedChars[0] == 'P') {
      pauseMotor();
      newData = false;
    }
    else {
      strcpy(tempChars, receivedChars);
      parseData();
      newData = false;

      synchronizeData();
    }
  }

  if (runMode == 'R' || runMode == 'S' || (runMode == 'P' && !inPause)) {
    runMotor();
  }
  
  if (! step1.isRunning() && ! step2.isRunning() && ! step3.isRunning()) { /* Dissables the motors after the run */
    digitalWrite(EN, HIGH);
    if(runMode == 'S'){
      step1.setCurrentPosition(0);
      step2.setCurrentPosition(0);
      step3.setCurrentPosition(0);
    }
    else if(runMode == 'P'){
      inPause = true;
      step1.move(pauseDist[0]);
      step2.move(pauseDist[1]);
      step3.move(pauseDist[2]);
    }
    else{
      runMode = 'O';
    }
  }

}


void synchronizeData() {
  step1.setCurrentPosition(0);
  step2.setCurrentPosition(0);
  step3.setCurrentPosition(0);

  /*
     Here we set the input values into the
     settings of the first stepper motor. We
     will then do the same to the other steppers
  */
  if (parsedData[3] == 0) {
    step1.setSpeed(0);
  }
  else {
    step1.setMaxSpeed(parsedData[0]);
    step1.setAcceleration(parsedData[1]);
    step1.move(parsedData[2]);
  }

  /* STEPPER 2 */
  if (parsedData[7] == 0) {
    step2.setSpeed(0);
  }
  else {
    step2.setMaxSpeed(parsedData[4]);
    step2.setAcceleration(parsedData[5]);
    step2.move(parsedData[6]);
  }

  /* STEPPER 3 */
  if (parsedData[11] == 0) {
    step3.setSpeed(0);
  }
  else {
    step3.setMaxSpeed(parsedData[8]);
    step3.setAcceleration(parsedData[9]);
    step3.move(parsedData[10]);
  }
}

void runMotor() {
  step1.run();
  step2.run();
  step3.run();
}

void pauseMotor() {
  runMode = 'P';
  //inPause = true;
  
  pauseDist[0] = step1.distanceToGo();
  pauseDist[1] = step2.distanceToGo();
  pauseDist[2] = step3.distanceToGo();

  step1.stop();
  step2.stop();
  step3.stop();
}

void stopAll() {
  runMode = 'S';
  step1.stop();
  step2.stop();
  step3.stop();
}

void reception() {
  static boolean recvGoing = false;
  static byte ndx = 0;
  char strtMark = '<';
  char endMark = '>';
  char rc;

  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();

    if (recvGoing == true) {
      if (rc != endMark) {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars) {
          ndx = numChars - 1;
        }
      }
      else {
        receivedChars[ndx] = '\0';
        recvGoing = false;
        ndx = 0;
        newData = true;
      }
    }
    else if (rc == strtMark) {
      recvGoing = true;
    }
  }
}

void parseData() {
  char * strtokIndx;

  strtokIndx = strtok(tempChars, ",");
  parsedData[0] = atof(strtokIndx);

  for (int i = 1; i < 12; i++) {
    strtokIndx = strtok(NULL, ",");
    parsedData[i] = atof(strtokIndx);
  }
}
