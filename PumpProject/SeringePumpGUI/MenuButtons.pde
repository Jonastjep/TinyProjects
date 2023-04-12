void MenuButtons(){  
  all_cp5 = new ControlP5(this); //FORGETING THIS CREATES Null Pointer Exceptions
  
  ControlFont font = new ControlFont(source22);
  all_cp5.setFont(font);
  
  all_cp5.addButton("Control")
     .setPosition(80,20)
     .setSize(250,70)
     .setCaptionLabel("Control");
     
  all_cp5.addButton("Setup")
     .setPosition(370,20)
     .setSize(250,70);
     
  //Small aknowledgment of author
}
