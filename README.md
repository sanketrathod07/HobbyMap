# User Hobbies Management System using React Flow

This project is a User Management System that allows you to manage users with hobbies dynamically on a flow-based interface.

## Full Demo Video
[HobbyMap: User Hobbies Management System using React Flow](https://youtu.be/e5UBsOyRKl0)

## 🚀 Deployment
[Live Link ⭐](https://youtu.be/e5UBsOyRKl0)

## Test Login Credentials

username: admin

password: admin


**📖 API Documentation**

Endpoints
- GET /api/hobbieuser - Fetch all users
- POST /api/hobbieuser/addUser - Add a new user
- PUT /api/hobbieuser/update/:id - Update user hobbies
- DELETE /api/hobbieuser/delete/:id - Delete a user



## 🚀 Features

- Add, update, and delete users dynamically.
- Drag-and-drop hobbies onto users.
- Real-time updates to the dashboard.
- Interactive flow-based visualization.

## 🛠️ Tech Stack

- **Frontend**: React.js, React Flow, React Toastify
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: [Optional] Hosted on [Your Deployment Platform]


## ScreenShots
### 1. Login Page
![alt text](https://res.cloudinary.com/dq8b6vgab/image/upload/v1737038836/Screenshot_2025-01-16_201654_by8ly7.png)
### 2. Draggable Hobbies Card
![alt text](https://res.cloudinary.com/dq8b6vgab/image/upload/v1737038837/Screenshot_2025-01-16_201435_zg7ifj.png)
### 3. Add New User
![alt text](https://res.cloudinary.com/dq8b6vgab/image/upload/v1737038836/Screenshot_2025-01-16_201540_lpk52w.png)
### 4. New User Added
![alt text](https://res.cloudinary.com/dq8b6vgab/image/upload/v1737038837/Screenshot_2025-01-16_201641_qrkvbe.png)
### 5. Dashboard
![alt text](https://res.cloudinary.com/dq8b6vgab/image/upload/v1737038489/Screenshot_2025-01-16_201015_zlws8d.png)


## 🧰 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:

    Frontend:

    ```bash
    cd frontend
    npm install
    ```

    Backend:

    ```bash
    cd backend
    npm install
    ```

3. **Configure environment variables:**
Create .env files for both frontend and backend by following the provided .env.example.

4. **Run the application:**

    Frontend:

    ```bash
    cd frontend
    npm run dev
    ```

    Backend:

    ```bash
    cd backend
    node main.js
    ```

5. **Access the application:**
Open your browser at http://localhost:3000.

**📄 .env Example**
   ```bash
   # Backend .env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/user_management

   # Frontend .env
   REACT_APP_API_URL=http://localhost:5000
   ```
