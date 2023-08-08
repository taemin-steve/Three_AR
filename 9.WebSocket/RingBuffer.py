# 데이터를 보관할 원형 큐.

class CircularQueue:
    def __init__(self,maxSize):
        self.queue =[None]*maxSize
        self.maxSize = maxSize
        self.head = 0 # 큐 시작
        self.tail = 0 # 큐 끝
        
    def enqueue(self, data):
        if self.queue[self.tail] is None: # 끝에가 비어있으면,
            self.queue[self.tail] = data  # 현재 데이터를 넣는다.
            self.tail = (self.tail+1)% self.maxSize  # tail의 index 조정
            return True
    
    # 큐 원소 삭제
    def dequeue(self):
        if self.queue[self.head] is not None: # 앞에가 비어있지 않으면
            data = self.queue[self.head]      # head에 있는 데이터를 꺼낸다.
            self.queue[self.head] = None      # head를 비운다.
            self.head = (self.head+1)% self.maxSize  # head의 index 조정.
            return data
    
    # 큐의 크기 찾기
    def size(self):
        if self.tail >= self.head:
            qSize = self.tail - self.head
        else:
            qSize = self.maxSize - (self.head- self.tail)
        return qSize
    