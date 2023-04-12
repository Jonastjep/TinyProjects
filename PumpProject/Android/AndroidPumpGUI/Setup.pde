//############### FUNCTIONS FOR THE SETUP PAGE ###################//

//This function generates the interactive modules on the setup page
void setSetupPage(){
  setup_cp5 = new ControlP5(this);
  
  ControlFont font = new ControlFont(source22);
  setup_cp5.setFont(font);
  
  units = setup_cp5.addRadioButton("UnitsRadio")
                   .setPosition(175,175-10)
                   .setSize(40,40)
                   .setItemsPerRow(4)
                   .setSpacingColumn(75)
                   .addItem("mm/s",0)
                   .addItem("mL/s",1)
                   .addItem("mL/min",2)
                   .addItem("microL/s",3);
                   
  size1 = setup_cp5.addRadioButton("SyringeSize1")
                   .setPosition(175,250-20)
                   .setSize(40,40)
                   .setItemsPerRow(3)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("1ml",1)
                   .addItem("3ml",3)
                   .addItem("5ml",5)
                   .addItem("10ml",10)
                   .addItem("20ml",20)
                   .addItem("30ml",30);
                   
  type1 = setup_cp5.addRadioButton("SyringeType1")
                   .setPosition(520,250-20)
                   .setSize(40,40)
                   .setItemsPerRow(1)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("BD",1)
                   .addItem("BRAUN",3);
                   
  size2 = setup_cp5.addRadioButton("SyringeSize2")
                   .setPosition(175,375-30)
                   .setSize(40,40)
                   .setItemsPerRow(3)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("p2 1ml",1) 
                   .addItem("p2 3ml",3)
                   .addItem("p2 5ml",5)
                   .addItem("p2 10ml",10)
                   .addItem("p2 20ml",20)
                   .addItem("p2 30ml",30);
                   
  type2 = setup_cp5.addRadioButton("SyringeType2")
                   .setPosition(520,375-30)
                   .setSize(40,40)
                   .setItemsPerRow(1)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("p2 BD",1)
                   .addItem("p2 BRAUN",3);
                   
  setup_cp5.getController("p2 1ml").setCaptionLabel("1ml");
  setup_cp5.getController("p2 3ml").setCaptionLabel("3ml");
  setup_cp5.getController("p2 5ml").setCaptionLabel("5ml");
  setup_cp5.getController("p2 10ml").setCaptionLabel("10ml");
  setup_cp5.getController("p2 20ml").setCaptionLabel("20ml");
  setup_cp5.getController("p2 30ml").setCaptionLabel("30ml");
  setup_cp5.getController("p2 BD").setCaptionLabel("BD");
  setup_cp5.getController("p2 BRAUN").setCaptionLabel("BRAUN");
           
  size3 = setup_cp5.addRadioButton("SyringeSize3")
                   .setPosition(175,500-40)
                   .setSize(40,40)
                   .setItemsPerRow(3)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("p3 1ml",1) 
                   .addItem("p3 3ml",3)
                   .addItem("p3 5ml",5)
                   .addItem("p3 10ml",10)
                   .addItem("p3 20ml",20)
                   .addItem("p3 30ml",30);
                   
  type3 = setup_cp5.addRadioButton("SyringeType3")
                   .setPosition(520,500-40)
                   .setSize(40,40)
                   .setItemsPerRow(1)
                   .setSpacingColumn(75)
                   .setSpacingRow(15)
                   .addItem("p3 BD",1)
                   .addItem("p3 BRAUN",3);
                   
  setup_cp5.getController("p3 1ml").setCaptionLabel("1ml");
  setup_cp5.getController("p3 3ml").setCaptionLabel("3ml");
  setup_cp5.getController("p3 5ml").setCaptionLabel("5ml");
  setup_cp5.getController("p3 10ml").setCaptionLabel("10ml");
  setup_cp5.getController("p3 20ml").setCaptionLabel("20ml");
  setup_cp5.getController("p3 30ml").setCaptionLabel("30ml");
  setup_cp5.getController("p3 BD").setCaptionLabel("BD");
  setup_cp5.getController("p3 BRAUN").setCaptionLabel("BRAUN");
  
  setup_cp5.addTextfield("AccPump1")
             .setPosition(60,650-70)
             .setSize(160,30)
             .setAutoClear(false);
  
  setup_cp5.addTextfield("AccPump2")
             .setPosition(270,650-70)
             .setSize(160,30)
             .setAutoClear(false);
  
  setup_cp5.addTextfield("AccPump3")
             .setPosition(480,650-70)
             .setSize(160,30)
             .setAutoClear(false);
}

//This function generates the text parts of the setup page 
void setSetupPageTxt(){
  background(0);
  
  fill(240, 240, 240);
  
  text("Parameter Setup",240,140);
  
  text("Units",50,200-10);
  
  text("Syringe 1\n Volume",30,285-20);
  text("Syringe 2\n Volume",30,410-30);
  text("Syringe 3\n Volume",30,535-40);
  
  setup_cp5.getController("AccPump1").setCaptionLabel(" Acceleration\nPump 1 ("+unitList[unitChose]+"^2)");
  setup_cp5.getController("AccPump2").setCaptionLabel(" Acceleration\nPump 2 ("+unitList[unitChose]+"^2)");
  setup_cp5.getController("AccPump3").setCaptionLabel(" Acceleration\nPump 3 ("+unitList[unitChose]+"^2)");
  
}

//#####################################################//
//############# Controller Functions ##################//
//#####################################################//

//This one looks at the int that one of the RadioButtons makes and transfers it
//to a global variable, which in turn allows for the change of the units label 
//on the control screen (when nothing is chosen, value is -1)
void UnitsRadio(int a){
  if(a != -1){
    unitChose = a;
  }
  else{
    unitChose = 4;
  }
}

void SyringeSize1(int a){
  syringeSize[0]=a;
}

void SyringeSize2(int a){
  syringeSize[1]=a;
}

void SyringeSize3(int a){
  syringeSize[2]=a;
}


void AccPump1(String a){
  syringeAcceleration[0] = int(a);
}

void AccPump2(String a){
  syringeAcceleration[1] = int(a);
}

void AccPump3(String a){
  syringeAcceleration[2] = int(a);
}
