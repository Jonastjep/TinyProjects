import serial

port = "/dev/ttyUSB0"
baudrate = 115200

ard = serial.Serial(port = port, baudrate = baudrate)

head = {
  "@": ["ROTA", ["X","Y"]],
  "&": ["SENS", ["Light","Temp","Pres"]],
  "#": ["GYRO", ["Ax","Ay","Az","Gx","Gy","Gz"]]
}

for i in range(30):
  data = ard.readline()[:-2].decode("utf-8")
  output = head[data[0]][0] + ' : ' + data[1:-1]
  print(output)

