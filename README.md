# Nail-It - AI-Powered Interview Preparation Platform

Nail-It is an intelligent interview preparation platform that helps users practice technical interviews with AI-generated questions and explanations. The platform provides personalized interview sessions based on role, experience level, and focus topics.

## 🚀 Features

- **User Authentication**: Secure registration and login system
- **AI-Powered Questions**: Generate interview questions using Google Generative AI and OpenAI
- **Interview Sessions**: Create and manage personalized interview sessions
- **Question Management**: Save, edit, and pin important questions
- **AI Explanations**: Get detailed explanations for concepts and answers
- **File Upload**: Support for profile images and documents
- **Responsive Design**: Modern UI built with React and TailwindCSS

## 🏗️ Architecture

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md).

### Quick Overview
- **Frontend**: React 19 + Vite + TailwindCSS
- **Backend**: Node.js + Express.js + MongoDB
- **AI Integration**: Google Generative AI + OpenAI
- **Authentication**: JWT-based authentication

## 🛠️ Technology Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Google Generative AI & OpenAI integration
- Multer for file uploads

### Frontend
- React 19.1.0
- Vite 7.0.4 (Build tool)
- TailwindCSS 4.1.11 (Styling)
- Framer Motion (Animations)
- React Router DOM (Navigation)
- Axios (HTTP client)

## 📁 Project Structure

```
Nail-It/
├── backend/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middlewares/        # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point
└── frontend/Nail-It/       # React frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── context/        # State management
    │   ├── pages/          # Page components
    │   └── utils/          # Utilities
    └── public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Google Generative AI API key
- OpenAI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nagendrakathi/Nail-It.git
   cd Nail-It
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend/Nail-It
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/nail-it
   JWT_SECRET=your-jwt-secret-key
   GEMINI_API_KEY=your-google-ai-key
   OPENAI_API_KEY=your-openai-key
   PORT=5000
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

2. **Start the Frontend**
   ```bash
   cd frontend/Nail-It
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/upload-image` - Upload profile image

### Session Management
- `GET /api/sessions` - Get user sessions (protected)
- `POST /api/sessions` - Create new session (protected)
- `PUT /api/sessions/:id` - Update session (protected)
- `DELETE /api/sessions/:id` - Delete session (protected)

### Question Management
- `GET /api/questions` - Get questions for session (protected)
- `POST /api/questions` - Create new question (protected)
- `PUT /api/questions/:id` - Update question (protected)
- `DELETE /api/questions/:id` - Delete question (protected)

### AI Integration
- `POST /api/ai/generate-questions` - Generate interview questions (protected)
- `POST /api/ai/generate-explanation` - Generate concept explanations (protected)

## 🔧 Development

### Code Style
- ESLint configuration for both frontend and backend
- Consistent file naming conventions
- Component-based architecture for React

### Database Schema
The application uses MongoDB with three main collections:
- **Users**: User authentication and profile data
- **Sessions**: Interview session configurations
- **Questions**: Individual questions and answers

For detailed schema information, see [ARCHITECTURE.md](./ARCHITECTURE.md#data-models).

## 🚀 Deployment

### Production Considerations
- Use environment variables for all sensitive data
- Set up proper CORS configuration
- Implement rate limiting
- Use HTTPS in production
- Set up monitoring and logging

### Recommended Deployment Stack
- **Frontend**: Vercel, Netlify, or static hosting
- **Backend**: Heroku, Railway, or VPS
- **Database**: MongoDB Atlas or self-hosted MongoDB
- **File Storage**: AWS S3 or similar cloud storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nagendra Kathi** - [nagendrakathi](https://github.com/nagendrakathi)

## 🙏 Acknowledgments

- Google Generative AI for AI-powered question generation
- OpenAI for additional AI capabilities
- React team for the amazing frontend framework
- Express.js community for the robust backend framework

## 📞 Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.

---

**Happy Interview Preparation! 🎯**