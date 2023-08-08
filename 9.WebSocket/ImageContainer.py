# 이미지 컨테이너 싱글톤으로 구현.
# 여기서 이미지 큐를 접근할 수 있음.

from RingBuffer import CircularQueue
import queue

class ImageContainer(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, "_instance"):         # 클래스 객체에 _instance 속성이 없다면
            print("__new__ is called\n")
            cls._instance = super().__new__(cls)  # 클래스의 객체를 생성하고 ImageContainer._instance로 바인딩
        return cls._instance                      # ImageContainer._instance를 리턴

    def __init__(self, size):
        cls = type(self)
        if not hasattr(cls, "_init"):             # ImageContainer 클래스 객체에 _init 속성이 없다면
            print("__init__ is called\n")
            self.ImageQueue = queue.Queue(maxsize=size)
            self.QueueSize = size
            cls._init = True