from simple_websocket_server import WebSocketServer, WebSocket
from SimpleEcho import SimpleEcho
from ImageContainer import ImageContainer

import cv2 as cv
import numpy as np
from PIL import Image 
import base64
import threading
import time

PORT_NUMBER = 3000 # port 3000

if __name__ =="__main__":
    imageContainer =  ImageContainer(3) # 데이터 저장하는 큐. 인스턴스는 스태틱형. 모든 코드에서 접근 가능.
    
    server = WebSocketServer('localhost', PORT_NUMBER, SimpleEcho) # port 3000
    
    t1 = threading.Thread(target=server.serve_forever) # 서버를 여는 스레드
    t1.start() #데이터 받아오는 스레드 시작!

    while(True):
        if ImageContainer._instance.ImageQueue.qsize() > 0 :
            img = ImageContainer._instance.ImageQueue.get()
            print("여기는 메인이에용!")
            cv.namedWindow('image',cv.WINDOW_NORMAL)
            cv.imshow("image",img)
            cv.waitKey(1)
            time.sleep(0.1)
            
        
             


    
    