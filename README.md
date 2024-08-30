<div align="center">
  <a href="https://www.kalina-fond.com" target="_blank">
    <img src="https://github.com/user-attachments/assets/7b72924b-30f1-49ec-90bf-9dbf35b81026" alt="Banner" width="100%">
  </a>
</div>

![GitHub Repo stars](https://img.shields.io/github/stars/Kalinka5/Kalina_foundation)

![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.kalina-fond.com%2Fhome%2F1&style=flat-square&color=yellow)
![OS Platforms](https://img.shields.io/badge/os-linux%20%7C%20macOS%20%7C%20windows-blue)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Kalinka5/Kalina_foundation/main)
![GitHub language count](https://img.shields.io/github/languages/count/Kalinka5/Kalina_foundation)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/Kalinka5/Kalina_foundation?color=%23c10000)

![PyPI - Version](https://img.shields.io/pypi/v/django?style=flat&logo=Django&color=green)
![PyPI - Version](https://img.shields.io/pypi/v/psycopg2-binary?style=plastic&logo=PostgreSQL&logoColor=white&labelColor=blue&color=green)
![PyPI - Version](https://img.shields.io/pypi/v/djangorestframework-simplejwt?label=JWT&color=%23ff0087)
![Node Current](https://img.shields.io/node/v/npm?color=%23177700)
![NPM Version](https://img.shields.io/npm/v/npm?color=red)
![NPM Version](https://img.shields.io/npm/v/react?label=React.js&color=%2380ffff)


Welcome to the **Kalina Foundation** repository. This project is a **full-stack web application** designed to support the *Kalina Foundation's mission*. The application provides a seamless experience across various *devices* and *screen sizes*, ensuring *accessibility and usability* for all users.

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
- [Authentication](#authentication)
- [Responsive Design](#responsive-design)
- [Email Verification](#email-verification)
- [Contributing](#contributing)
- [License](#license)

## 📖 Project Overview

*The Kalina Foundation* application is built using a **Django** backend with a **REST API** and a **React.js** frontend. The platform offers users the ability to *register*, *log in*, *view their profile*, *make donations*, and more.

## ✨ Features

- 🔑 User Authentication with JWT Tokens
- 📧 Email Verification
- 💳 Donation Processing
- 📱 Responsive Design for Mobile, Tablet, and PC
- ⚠️ Error Handling and 404 Page

## 🛠️ Technology Stack

- **Backend:** Django, Django REST framework
- **Frontend:** React.js
- **Authentication:** JWT Tokens
- **Email Service:** Django SMTP Server

## 💻 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/kalina_foundation.git
   cd kalina_foundation
   ```

2. **Backend Setup:**

   - Navigate to the backend directory:

   ```bash
   cd backend
   ```

   - Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

   - Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

   - Run database migrations:

   ```bash
   python manage.py migrate
   ```

   - Start the Django development server:

   ```bash
   python manage.py runserver
   ```

3. **Frontend Setup:**

   - Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

   - Install the required packages:

   ```bash
   npm install
   ```

   - Start the React development server:

   ```bash
   npm start
   ```

## 🚀 Usage

   - Visit the application at [this link](https://www.kalina-fond.com) or write url: www.kalina-fond.com
   - Register or log in to access your profile and make donations

## 📄 Pages

  1. 🔐 Login: User login page.
  2. 📝 Register: User registration page.
  3. 🏠 Main: Main landing page.
  4. 💰 Donate: Page for making donations.
  5. 👤 Profile: User profile page.
  6. 🚫 Error404: Page displayed for non-existent routes.
  7. 📧 Email Verification: Page for email verification.

## 🔒 Authentication

The application uses **JWT tokens** *for authentication*. Users must log in to *receive a token*, which is then used to *authenticate subsequent requests*.

## 📱 Responsive Design

<div align="center"><img src="https://github.com/user-attachments/assets/402cf361-f098-474f-b82f-2f20271d2542" alt="Frames" width="100%"></div>

The application is designed to be responsive and works across **multiple devices and screen sizes**, including:

  - **Mobile Devices**:
    - iPhone SE
    - iPhone XR
    - iPhone 12 Pro
    - iPhone 14 Pro Max
    - Pixel 7
    - Samsung Galaxy S8+
    - Samsung Galaxy S20 Ultra
    - Galaxy Z Fold 5
    - Samsung Galaxy A51/71
  - **Tablet Devices**:
    - Ipad Mini
    - Ipad Air
    - Ipad Pro
  - **Laptop Devices**

![Phone Frames](https://github.com/user-attachments/assets/0888c527-70e4-4b6b-a61d-a4c4dcc8dbd7)

<h2 align="center">Img. 1 Phone Frames</h2>

![Tablet frames](https://github.com/user-attachments/assets/89a83763-ebfc-4658-9a2e-83739b14989e)

<h2 align="center">Img. 2 Tablet Frames</h2>

![Laptop Frames](https://github.com/user-attachments/assets/5a4e5e4a-8221-487f-b36e-0c105b801e50)

<h2 align="center">Img. 1 Laptop Frames</h2>

## 📧 Email Verification


Email verification is implemented using the **Django SMTP server**. Upon registration, users receive a *verification email* with a *link* to verify their email address.

## 🤝 Contributing

We welcome contributions to the Kalina Foundation project. Please follow these steps to contribute:

  1. 🍴 Fork the repository
  2. 🌿 Create a new branch (git checkout -b feature-branch)
  3. ✏️ Make your changes
  4. 💾 Commit your changes (git commit -am 'Add new feature')
  5. 📤 Push to the branch (git push origin feature-branch)
  6. 🔄 Create a new Pull Request

## 📜 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](./LICENSE) file for details.

*Feel free to customize further based on specific project details or requirements!🎉*
