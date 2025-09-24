# Mouse Controller (React Native + FastAPI)

A small project that allows controlling your computer's mouse from a mobile device using a React Native frontend and a FastAPI backend.

---

## Features

- Move the mouse cursor remotely.
- Use a mobile device camera to scan a QR code for server connection.
- Real-time communication via WebSocket.
- Lightweight and easy to set up.

---

## Tech Stack

- Backend: Python, FastAPI, WebSocket
- Frontend: React Native (mobile)
- Mouse control: pynput / mouse Python packages
- QR code generation: qrcode Python package

---

## Setup Instructions

### Backend (Python)

1. Navigate to the backend folder:
cd backend

2. Create a virtual environment (recommended):
# Linux/macOS
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate

3. Install dependencies:
pip install -r requirements.txt

4. Run the server:
python main.py

- The server will generate and display a QR code with the WebSocket URL.  
- Ensure your mobile device is on the same local network.

---

### Frontend (React Native)

1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Run the app on your device/emulator:
npx react-native run-android   # or npx react-native run-ios

4. Grant camera permission and scan the QR code displayed by the backend.  
- The app will connect via WebSocket and control the mouse in real-time.

---

## How It Works

1. Backend runs a FastAPI server and generates a QR code containing the WebSocket URL.  
2. Mobile frontend scans the QR code using the device camera.  
3. Mobile app connects to the backend over WebSocket.  
4. Mouse movements from the mobile device are transmitted to the backend and applied to your computer.

---

## Security Notes

- Only use on trusted local networks.  
- Do not expose the server publicly, as it allows remote mouse control.  
- Keep .env or sensitive configurations out of GitHub.

---

## License

This project is licensed under the MIT License.