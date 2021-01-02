    # def polyPoint(self, vertices, px, py):
    #     collision = False
    #     next = 0
    #     for current in range(len(vertices)):
    #         next = current + 1
    #         if next == len(vertices):
    #             next = 0
    #         vc = vertices[current]
    #         vn = vertices[next]
            
    #         if (((vc.y > py and vn.y < py) or (vc.y < py and vn.y > py)) and (px < (vn.x - vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)):
    #             collision = not collision
    #     return collision
    
    # def lineLine(self, x1, y1, x2, y2, x3, y3, x4, y4):
    #     uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
    #     uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1))
        
    #     if (uA >= 0 and uA <= 1 and uB >= 0 and uB <= 1):
    #         return True
    #     return False
    
    # def polyLine(self, vertices, x1, y1, x2, y2):
    #     next = 0
    #     for current in range(len(vertices)):
    #         next = current + 1
    #         if next == len(vertices):
    #             next = 0
    #         x3 = vertices[current].x
    #         y3 = vertices[current].y
    #         x4 = vertices[next].x
    #         y4 = vertices[next].y
            
    #         hit = self.lineLine(x1, y1, x2, y2, x3, y3, x4, y4)
    #         if hit:
    #             return True
    #     return False
    
    # def polyPoly(self, p1, p2):
    #     next = 0
    #     for current in range(len(p1)):
    #         next = current + 1
    #         if next == len(p1):
    #             next = 0
    #         vc = p1[current]
    #         vn = p1[next]
            
    #         collision = self.polyLine(p2, vc.x,vc.y,vn.x,vn.y)
    #         if collision:
    #             return True
    #         collision = self.polyPoint(p1, p2[0].x, p2[0].y)
    #         if collision:
    #             return True
    #     return False
    
    
    
    
    
    #### OLD, LESS EFFICIENT WAY OF MOVING ####
    # def bwd(self):
    #     inter = self.dir
    #     inter.multi(self.vel_mag)
    #     self.pos.add(inter)

    # def fwd(self):
    #     inter = self.dir
    #     inter.multi(self.vel_mag)
    #     self.pos.sub(inter)

    # def turn(self, angle):
    #     self.vel.rotate(angle)
    ###########################################
