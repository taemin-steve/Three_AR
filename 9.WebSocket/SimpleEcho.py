# This is for WEBsocket
# 이 클래스가 하는 일 : 정한 포트번호와 주소로 서버를 엽니다. 그리고 데이터를 받을 수 있다.

from simple_websocket_server import WebSocketServer, WebSocket
from ImageContainer import ImageContainer
import cv2 as cv
import numpy as np
from PIL import Image 
import base64
from RingBuffer import CircularQueue

class SimpleEcho(WebSocket):
    def handle(self): 
        msg = self.data # self.data가 전송받은 데이터 입니다.
        #print(type(msg))
        #cv.imshow('image',msg)
        #cv.waitKey(1)
        #print(msg)
        
        img = cv.imdecode(np.fromstring(base64.b64decode(msg.split(',')[1]), np.uint8), cv.IMREAD_COLOR) # 받은 이미지 decode함.
       
        # 크기 넘어가면 앞에서 부터 가져옴. 
        #@print("qsize" + str(ImageContainer._instance.ImageQueue.qsize()))
        if ImageContainer._instance.ImageQueue.qsize() > 2:
            print("꽉찼어염.")
            ImageContainer._instance.ImageQueue.get() #앞에 꺼 빼기
            
        ImageContainer._instance.ImageQueue.put(img) # 큐에 데이터 저장.
        print("잉?")
        
    def connected(self): # 연결 했을 때
        print(self.address, 'connected')

    def handle_close(self): # 연결 닫아.
        print(self.address, 'closed')
