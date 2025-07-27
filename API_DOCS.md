# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Optional error details"
}
```

## Endpoints

### Authentication (`/api/auth`)

#### Register User
- **POST** `/auth/register`
- **Access**: Public
- **Description**: Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profileImageUrl": "optional-image-url"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "profileImageUrl": null
    },
    "token": "jwt-token"
  },
  "message": "User registered successfully"
}
```

#### Login User
- **POST** `/auth/login`
- **Access**: Public
- **Description**: Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "profileImageUrl": null
    },
    "token": "jwt-token"
  },
  "message": "Login successful"
}
```

#### Get User Profile
- **GET** `/auth/profile`
- **Access**: Protected
- **Description**: Get current user profile

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "image-url",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Upload Profile Image
- **POST** `/auth/upload-image`
- **Access**: Public
- **Description**: Upload profile image
- **Content-Type**: `multipart/form-data`

**Request Body:**
```
image: [File]
```

**Response:**
```json
{
  "imageUrl": "http://localhost:5000/uploads/filename.jpg"
}
```

### Sessions (`/api/sessions`)

#### Get User Sessions
- **GET** `/sessions`
- **Access**: Protected
- **Description**: Get all sessions for the authenticated user

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "session-id",
      "user": "user-id",
      "role": "Software Engineer",
      "experience": "3-5 years",
      "topicsToFocus": "JavaScript, React, Node.js",
      "description": "Frontend development interview prep",
      "questions": ["question-id-1", "question-id-2"],
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Session
- **POST** `/sessions`
- **Access**: Protected
- **Description**: Create a new interview session

**Request Body:**
```json
{
  "role": "Software Engineer",
  "experience": "3-5 years",
  "topicsToFocus": "JavaScript, React, Node.js",
  "description": "Frontend development interview prep"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "session-id",
    "user": "user-id",
    "role": "Software Engineer",
    "experience": "3-5 years",
    "topicsToFocus": "JavaScript, React, Node.js",
    "description": "Frontend development interview prep",
    "questions": [],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Session created successfully"
}
```

#### Update Session
- **PUT** `/sessions/:id`
- **Access**: Protected
- **Description**: Update an existing session

**Request Body:**
```json
{
  "role": "Senior Software Engineer",
  "experience": "5+ years",
  "topicsToFocus": "System Design, JavaScript, React",
  "description": "Updated description"
}
```

#### Delete Session
- **DELETE** `/sessions/:id`
- **Access**: Protected
- **Description**: Delete a session and all associated questions

**Response:**
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

### Questions (`/api/questions`)

#### Get Questions
- **GET** `/questions?sessionId=session-id`
- **Access**: Protected
- **Description**: Get all questions for a specific session

**Query Parameters:**
- `sessionId` (required): The session ID

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "question-id",
      "Session": "session-id",
      "question": "What is closure in JavaScript?",
      "answer": "User's answer here",
      "note": "Additional notes",
      "isPinned": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Question
- **POST** `/questions`
- **Access**: Protected
- **Description**: Create a new question

**Request Body:**
```json
{
  "sessionId": "session-id",
  "question": "What is closure in JavaScript?",
  "answer": "User's answer here",
  "note": "Additional notes"
}
```

#### Update Question
- **PUT** `/questions/:id`
- **Access**: Protected
- **Description**: Update an existing question

**Request Body:**
```json
{
  "question": "Updated question",
  "answer": "Updated answer",
  "note": "Updated notes",
  "isPinned": true
}
```

#### Delete Question
- **DELETE** `/questions/:id`
- **Access**: Protected
- **Description**: Delete a question

**Response:**
```json
{
  "success": true,
  "message": "Question deleted successfully"
}
```

### AI Integration (`/api/ai`)

#### Generate Interview Questions
- **POST** `/ai/generate-questions`
- **Access**: Protected
- **Description**: Generate AI-powered interview questions

**Request Body:**
```json
{
  "role": "Software Engineer",
  "experience": "3-5 years",
  "topicsToFocus": "JavaScript, React, Node.js",
  "numberOfQuestions": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "Explain the concept of closures in JavaScript with an example.",
        "expectedAnswer": "A closure is a function that has access to variables in its outer scope even after the outer function has returned...",
        "difficulty": "Medium",
        "topic": "JavaScript"
      }
    ]
  }
}
```

#### Generate Concept Explanation
- **POST** `/ai/generate-explanation`
- **Access**: Protected
- **Description**: Generate AI explanation for a concept

**Request Body:**
```json
{
  "concept": "JavaScript Closures",
  "context": "Interview preparation",
  "level": "intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "explanation": "JavaScript closures are a fundamental concept...",
    "examples": ["Example code snippets"],
    "keyPoints": ["Key points to remember"]
  }
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

- **Authentication endpoints**: 5 requests per minute per IP
- **AI endpoints**: 10 requests per minute per user
- **Other endpoints**: 100 requests per minute per user

*Note: Rate limiting should be implemented in production*

## File Upload Specifications

### Profile Images
- **Allowed formats**: JPG, JPEG, PNG, GIF
- **Max file size**: 5MB
- **Storage location**: `/uploads` directory
- **URL format**: `{base_url}/uploads/{filename}`

## WebSocket Events (Future Enhancement)

For real-time features:
- `session:join` - Join a session room
- `session:leave` - Leave a session room
- `question:update` - Real-time question updates
- `session:update` - Real-time session updates

## SDK/Client Libraries

Example usage with Axios:

```javascript
import axios from 'axios';

// Set up base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Usage examples
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

const getSessions = async () => {
  const response = await api.get('/sessions');
  return response.data;
};

const generateQuestions = async (sessionData) => {
  const response = await api.post('/ai/generate-questions', sessionData);
  return response.data;
};
```

## Testing

### API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get sessions (with auth)
curl -X GET http://localhost:5000/api/sessions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Postman Collection

A Postman collection with all endpoints is available for testing. Import the collection and set up environment variables:
- `base_url`: `http://localhost:5000/api`
- `token`: Your JWT token after login