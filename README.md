# Expense Tracker App Setup Guide

Follow the steps below to set up and run the Expense Tracker application on your local machine.

## Prerequisites
Ensure you have the following installed:
- Node.js and npm
- VS Code (or any preferred code editor)

## Installation Steps

### 1. Download and Open the Project
1. Download the ZIP file of the project.
2. Extract the ZIP file.
3. Open the `Expense-Tracker` folder in VS Code.

### 2. Set Up the Backend
1. Open the terminal in VS Code.
2. Navigate to the backend folder:
   ```sh
   cd backend
   ```
3. Install the required dependencies:
   ```sh
   npm install express mongoose cors nodemon
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. If the database connection is successful, you will see a message: **"DB Connected"**.

### 3. Set Up the Frontend
1. Open a new terminal or PowerShell in VS Code (do not close the backend terminal).
2. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
3. Install the necessary dependencies:
   ```sh
   npm install
   npm install axios styled-components chart.js moment react-chartjs-2 react-datepicker
   ```
4. Start the frontend server:
   ```sh
   npm start
   ```

### 4. Access the Application
Once both the backend and frontend servers are running, open your browser and go to:
```
http://localhost:3000
```
Enjoy using the Expense Tracker application!










