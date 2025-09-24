from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import uvicorn
from pynput.mouse import Controller
from fastapi.middleware.cors import CORSMiddleware
import qrcode
import socket
import mouse as ms

app = FastAPI()

def show_qr():
    ip = socket.gethostbyname(socket.gethostname())
    url = f"ws://{ip}:8000/cord"
    qr = qrcode.make(url)
    qr.show()

show_qr()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
mouse = Controller()
@app.websocket('/cord')
async def cordHandle(cd:WebSocket):
    try:
        await cd.accept();
        while True:
            cord = await cd.receive_text()
            try:
                x_str, y_str = cord.split(",")
                x, y = float(x_str), float(y_str)
                print(f"Touch Move: x={x}, y={y}")
                #mouse.move(x,y)
                ms.move(x,y,absolute=False,duration=0.005)
            except ValueError:
                print("Invalid format:", cord)
            
    except WebSocketDisconnect:
        print('connection ended')

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
