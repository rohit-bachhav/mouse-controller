# Mouse Controller

A small project that allows you to control your computer's mouse using a **React frontend** and a **FastAPI backend**.

## Features

- Move the mouse cursor programmatically.
- Perform mouse clicks.
- Simple and lightweight setup.

## Tech Stack

- **Frontend:** React.js
- **Backend:** FastAPI (Python)
- **Communication:** HTTP API

## Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the server:
   ```bash
   uvicorn main:app --reload
   ```
4. The backend will run at `http://localhost:8000`.

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Usage

- Use the UI to move the mouse or perform clicks.
- Ensure the backend server is running before using the frontend.

## Security Note

- This project allows control of your system's mouse. Use responsibly.
- Do **not expose** this API publicly as it can allow remote control.

## License

This project is licensed under the MIT License.
