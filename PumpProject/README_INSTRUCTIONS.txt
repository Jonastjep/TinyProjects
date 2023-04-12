INSTRUCTIONS:
Unfortunately I missjudged the size of the inteface as I have a super highres screen and so it might be that the interface is not fully visible on your computer. I did not have time to fix the issue as it requires a total redesign of the interface, so if you are in htis situation, I would try to flip the screen and work like this if necessary. I'm really sorry for any inconvenience...

CONTROL PAGE:
On this page you can chose the speed of the pumping (for the moment only in mm/s) as well as the amount the pump should push (in mm). The three buttons underneith allow for the selection of the pumps that will be active.
After having selected all the necessary settings, it is important to SYNCHRONIZE the data by pushing on the SYNC button. You are then free to RUN the pumps. The PAUSE button interrupts the course of the pump but saves the current location and by pushing on RUN again it will continue to the previously selected distance. The STOP button will stop everything and you will have to enter new data and SYNC it again.
Once the programme has run it's course, you need to reselect new settings and do a new cycle of SYNC and RUN. 

SETUP PAGE:
For the moment the program works only with the mm unit functions, so it is useless to chose any type of units other than mm/s. This also makes it useless to chose any volumes of syringes, as they are just there to know which volume has to be used. On the setup page it is only necessary to fill the ACCELERATION fields (in mm/s^2). This depends on the viscosity of the liquid, as to not make the motor skip steps by going too fast too quickly. You have to experiment to find optimal values.


!!IMPORTANT!! Some quirks:
When entering an amount in the textfields, always click on ENTER to validate the amounts (for amounts and accelerations). Also after you have entered the last value, click somewhere else on the screen to deselect the field (otherwise when you go onto the other page, it will also put your entered value into the last text field). I will try to fix this in the future.
The distances are all linked to the PITCH of the threaded rod moving the syringe. For an M5 rod, the pitch can be 0.5mm for a fine thread od 0.8mm for a coarse thread. This setting can be changed in the "Computing" part of the processing code. You just have to change the "public float pitchVal = 0.8;" sentence.

