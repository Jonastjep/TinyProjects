//############### FUNCTIONS FOR THE Control PAGE ###################//

//This function generates the interactive modules on the control page
void setControlPage(){
  control_cp5 = new ControlP5(this);
  CheckBox checkboxControl;
  
  ControlFont font = new ControlFont(source22);
  control_cp5.setFont(font);
     
  control_cp5.addButton("Run")
     .setPosition(60,398)
     .setSize(580,125);
     
  control_cp5.addButton("Stop")
     .setPosition(60,524)
     .setSize(168+18,125);
     
  control_cp5.addButton("Pause")
     .setPosition(265-18,524)
     .setSize(168+18+19,125);
     
  control_cp5.addButton("Sync")
     .setPosition(471-18,524)
     .setSize(168+19,125);
     
  checkboxControl = control_cp5.addCheckBox("PumpChoice")
                       .setPosition(80,312)
                       .setSize(60,60)
                       .setItemsPerRow(3)
                       .setSpacingColumn(150)
                       .addItem("  Pump 1",1)
                       .addItem("  Pump 2",2)
                       .addItem("  Pump 3",3);
                       
  control_cp5.addSlider("units1")
             .setRange(0,10)
             .setValue(5)
             .setPosition(200,175-15)
             .setSize(150,30)
             .setDecimalPrecision(1)
             .getCaptionLabel().toUpperCase(false); //WAY TO GET NORMALLY WRITTEN TEXT
  
  control_cp5.addSlider("units2")
             .setRange(0,10)
             .setValue(5)
             .setPosition(200,225-15)
             .setSize(150,30)
             .setDecimalPrecision(1)
             .getCaptionLabel().toUpperCase(false);
  
  
  control_cp5.addSlider("units3")
             .setRange(0,10)
             .setValue(5)
             .setPosition(200,275-15)
             .setSize(150,30)
             .setDecimalPrecision(1)
             .getCaptionLabel().toUpperCase(false);
             
  control_cp5.addTextfield("Amount1")
             .setPosition(465,175-15)
             .setSize(150,30)
             .setAutoClear(false)
             .getCaptionLabel().hide();
  
  control_cp5.addTextfield("Amount2")
             .setPosition(465,225-15)
             .setSize(150,30)
             .setAutoClear(false)
             .getCaptionLabel().hide();
             
  control_cp5.addTextfield("Amount3")
             .setPosition(465,275-15)
             .setSize(150,30)
             .setAutoClear(false)
             .getCaptionLabel().hide() //HOW TO NOT SHOW THE CAPTIONLABEL
             ;
             
  ShoutOut = control_cp5.addTextarea("txt")
                    .setPosition(220,660)
                    .setSize(500,50)
                    .setColor(color(128))
                    .setFont(source15);
                    
  ShoutOut.setText("Interface designed by Jonas Tjepkema");
}

//This function generates the text parts of the control page
void setControlPageTxt(){
  background(0);
  
  control_cp5.getController("units1").setCaptionLabel(unitList[unitChose]);
  control_cp5.getController("units2").setCaptionLabel(unitList[unitChose]);
  control_cp5.getController("units3").setCaptionLabel(unitList[unitChose]);
  
  fill(240, 240, 240);
  text("Pump 1",50,200-15);
  text("Pump 2",50,250-15);
  text("Pump 3",50,300-15);
  
  text("Speed",250,135);
  text("Amount",485, 135);
}

//#####################################################//
//############# Controller Functions ##################//
//#####################################################//

void Sync(){
  finalString = "<"; //opener
  
  mmSpeedConversion();
    
    println();
    print("         "); 
    print("ViNoC");
    print("    ");
    print("ViC");
    print("    ");
    print("Acc");
    print("    ");
    print("Amo");
    print("    ");
    print("Size");
    print("    ");
    println("On/Off (1/0)");
    
  for(int i = 0; i<3; i++){
    print("Pump"+(i+1)+"    ");
    print(syringeSpeedNoC[i]);
    print("    ");
    print(syringeSpeedC[i]);
    print("    ");
    print(syringeAcceleration[i]);
    print("    ");
    print(syringeAmount[i]);
    print("    ");
    print(syringeSize[i]);
    print("       ");
    println(pumpChoiceArray[i]);
    
    finalString += (str(syringeSpeedC[i])+",");
    finalString += (str(syringeAcceleration[i])+",");
    finalString += (str(syringeAmount[i])+",");
    finalString += (str(pumpChoiceArray[i]));
    
    if(i == 2){
      finalString += ">";
    }
    else{
      finalString += ",";
    }
  }  
  println();
  println(finalString);
  myPort.write(finalString); //SENDS THE FINAL STRING TO ARDUINO
}

void Run(){
  myPort.write("<R>");
}

void Stop(){
  myPort.write("<S>");
}

void Pause(){
  myPort.write("<P>");
}

void units1(float a){
  float temp =(int)(a*10);
  syringeSpeedNoC[0] = temp/10;
}

void units2(float a){
  float temp =(int)(a*10);
  syringeSpeedNoC[1] = temp/10; 
}

void units3(float a){
  float temp =(int)(a*10);
  syringeSpeedNoC[2] = temp/10;
}

void Amount1(String a){
  syringeAmount[0] = mmToStepsAmount(float(a),0.8);
}

void Amount2(String a){
  syringeAmount[1] = mmToStepsAmount(float(a),0.8);
}

void Amount3(String a){
  syringeAmount[2] = mmToStepsAmount(float(a),0.8);
}

void PumpChoice(float[] a) {
  pumpChoiceArray = int(a);
}
