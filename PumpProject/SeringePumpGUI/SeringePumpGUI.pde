import controlP5.*;

//#####SERIAL USER INTERFACE PART #####//
import processing.serial.*;
import static javax.swing.JOptionPane.*;
 
Serial myPort;        // The serial port
 
final boolean debug = true;
//######################################//


ControlP5 control_cp5, setup_cp5, all_cp5;
RadioButton units, size1, size2, size3, type1, type2, type3;
Textarea ShoutOut;

PFont source15, source22, source32;

boolean showControl = false; //variable that permits the view of the control page if 0 and setup if 1

String unitList[] = {"mm/s","ml/s","ml/min","microL/s","[units]"};
int unitChose = 4;

int syringeSize[] = {0,0,0}; //Array to keep syringe sizes as global variables syringe1, 2 and 3 in order
float syringeSpeedNoC[] = {0,0,0};
float syringeSpeedC[] = {0,0,0};
float syringeAcceleration[] = {0,0,0};
float syringeAmount[] = {0,0,0};
int pumpChoiceArray[] = {0,0,0};

String finalString;

void setup(){
  
  String COMx, COMlist = "";
  
  size(700,690);
  textSize(32);
  
  source32 = createFont("Source Sans Pro Semibold", 32);
  source22 = createFont("Source Sans Pro Semibold", 22);
  source15 = createFont("Source Sans Pro Semibold", 15);
  textFont(source32);
  
  //initiates the visual parts
  MenuButtons();
  setControlPage();
  setSetupPage();
  setup_cp5.hide();
  
  //############ COM SERIAL PART ####################//
  try {
    if(debug) printArray(Serial.list());
    int i = Serial.list().length;
    if (i != 0) {
      if (i >= 2) {
        // need to check which port the inst uses -
        // for now we'll just let the user decide
        for (int j = 0; j < i;) {
          COMlist += char(j+'a') + " = " + Serial.list()[j];
          if (++j < i) COMlist += ",  ";
        }
        COMx = showInputDialog("Which COM port is correct? (a,b,..):\n"+COMlist);
        if (COMx == null) exit();
        if (COMx.isEmpty()) exit();
        i = int(COMx.toLowerCase().charAt(0) - 'a') + 1;
      }
      String portName = Serial.list()[i-1];
      if(debug) println(portName);
      myPort = new Serial(this, portName, 9600); // change baud rate to your liking
      //myPort.bufferUntil('\n'); // buffer until CR/LF appears, but not required..
    }
    else {
      showMessageDialog(frame,"Device is not connected to the PC");
      exit();
    }
  }
  catch (Exception e)
  { //Print the type of error
    showMessageDialog(frame,"COM port is not available (may\nbe in use by another program)");
    println("Error:", e);
    exit();
  }
  //###########################################################//
}

void draw(){
  if(showControl == false){
    setControlPageTxt();
  }else{
    setSetupPageTxt();
  }
}

//##################################################//
//################# FUNCTIONS ######################//
//##################################################//

//Functions with the name of modules (buttons, sliders, etc) fire when the 
//modules are used and have inherent values that are hard coded

//This manages what happens when the Setup button is pushed
//It puts you onto the setup page by hiding the content of the control page
void Setup(){
  showControl = true;
  control_cp5.hide();
  setup_cp5.show();
}

//This manages what happens when the Control button is pushed
//It puts you onto the control page by hiding the content of the setup page
void Control(){
  showControl = false;
  control_cp5.show();
  setup_cp5.hide();
}
