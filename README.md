# Phone Authentication App

This is a simple Phone Authentication app built using **React** and **Firebase**. It allows users to authenticate using their phone numbers through OTP (One-Time Password) verification. The app uses Firebase Authentication service to send OTPs and verify them.

## Features

- **Phone Number Authentication**: Users can enter their phone number and receive an OTP for verification.
- **OTP Verification**: After receiving the OTP, users can enter it to verify their phone number.
- **Firebase Integration**: The app uses Firebase Authentication for sending OTPs and confirming them.
- **Recaptcha Integration**: The app uses Firebase's invisible reCAPTCHA to prevent bots from spamming the phone number authentication process.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Firebase**: Backend service for phone number authentication and OTP management.
- **HTML/CSS**: For basic webpage structure and styling.

## Getting Started

To run the app locally, follow these steps:

### Prerequisites

- You need to have **Node.js** and **npm** installed. If you don't have them, download and install from [Node.js official website](https://nodejs.org/).
- You also need to set up a **Firebase project**. If you don't have a Firebase account, you can sign up at [Firebase Console](https://console.firebase.google.com/).

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/phone-authentication-app.git
    ```

2. Change directory to your project folder:

    ```bash
    cd phone-authentication-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up Firebase:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Create a new project.
    - In the Firebase Authentication section, enable **Phone Authentication**.
    - Get your Firebase config by going to Project Settings > General > Firebase SDK snippet > Config.
    - Add your Firebase config to the `firebaseConfig` object in `App.js`.

5. Run the app:

    ```bash
    npm start
    ```

    This will start the development server and you can access the app at `http://localhost:3000`.
## Firebase Configuration
- To use Firebase in your project, you need to initialize it with your project's credentials. 
- Replace the values in the firebaseConfig object with your own Firebase project configuration.
```bash
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};
```
## Troubleshooting
- Make sure to enable Phone Authentication in your Firebase console.
- If you face issues with OTP, check that your app is registered with the correct Firebase project.
  Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit them (git commit -am 'Add feature').
- Push to the branch (git push origin feature-name).
- Open a Pull Request.
