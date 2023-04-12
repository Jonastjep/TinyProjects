public float pitchVal = 0.8;

//Converts the mm/s speed into steps/s and returns it
int mmpsToSteps(float speed){
  float a = speed;
  a = a * 200/pitchVal;
  return int(a);
}

float volumeToSteps(float speed, int unitType, float radiusSyringe){
  float a = speed;
    if(unitType == 1){
      a = (speed/(3.14149*radiusSyringe))*(200/pitchVal);
    }else if(unitType == 2){
      a = 60 * (speed/(3.14149*radiusSyringe))*(200/pitchVal);
    }else if(unitType == 3){
      a = ((speed/(3.14149*radiusSyringe))*(200/pitchVal))/1000;
    }
  return a;
}

int mmToStepsAmount(float mm, float pitch){
  return int((mm*200)/pitch);
}
void mmSpeedConversion(){
  for(int i=0; i<3; i++){
    syringeSpeedC[i] = mmpsToSteps(syringeSpeedNoC[i]);  //PITCH NEEDED HERE
  }
}
