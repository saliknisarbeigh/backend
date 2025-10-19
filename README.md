# Inspiro Backend API

Welcome to the Inspiro Backend API! This API provides access to Islamic content including Sahabas (Companions of the Prophet), Prophets, and Inspirational quotes.

## Base URL

```
https://inspiro-backend.vercel.app
```

## API Endpoints

### 1. Sahabas (Companions of the Prophet)

#### Get All Sahabas
- **Endpoint**: `GET /api/sahabas`
- **Description**: Retrieve a list of all Sahabas
- **Example Request**:
  ```bash
  curl https://inspiro-backend.vercel.app/api/sahabas
  ```
- **Example Response**:
  ```json
  [
    {
      "_id": "6123a1b234c5d60015d8e9f1",
      "name": "Abu Bakr As-Siddiq",
      "title": "The First Caliph",
      "description": "First Caliph of Islam and close companion of Prophet Muhammad (PBUH)",
      "image": "https://example.com/abu-bakr.jpg"
    }
  ]
  ```

#### Get Single Sahabi
- **Endpoint**: `GET /api/sahabas/:id`
- **Description**: Get details of a specific Sahabi
- **Example Request**:
  ```bash
  curl https://inspiro-backend.vercel.app/api/sahabas/6123a1b234c5d60015d8e9f1
  ```
- **Example Response**:
  ```json
  {
    "_id": "6123a1b234c5d60015d8e9f1",
    "name": "Abu Bakr As-Siddiq",
    "title": "The First Caliph",
    "description": "First Caliph of Islam and close companion of Prophet Muhammad (PBUH)",
    "image": "https://example.com/abu-bakr.jpg"
  }
  ```

### 2. Prophets

#### Get All Prophets
- **Endpoint**: `GET /api/prophets`
- **Description**: Retrieve a list of all Prophets
- **Example Request**:
  ```bash
  curl https://inspiro-backend.vercel.app/api/prophets
  ```
- **Example Response**:
  ```json
  [
    {
      "_id": "6123a1b234c5d60015d8e9f2",
      "name": "Muhammad (PBUH)",
      "title": "The Final Prophet",
      "description": "The last and final prophet sent by Allah to guide all of humanity",
      "image": "https://example.com/prophet-muhammad.jpg"
    }
  ]
  ```

#### Get Single Prophet
- **Endpoint**: `GET /api/prophets/:id`
- **Description**: Get details of a specific Prophet
- **Example Request**:
  ```bash
  curl https://inspiro-backend.vercel.app/api/prophets/6123a1b234c5d60015d8e9f2
  ```
- **Example Response**:
  ```json
  {
    "_id": "6123a1b234c5d60015d8e9f2",
    "name": "Muhammad (PBUH)",
    "title": "The Final Prophet",
    "description": "The last and final prophet sent by Allah to guide all of humanity",
    "image": "https://example.com/prophet-muhammad.jpg"
  }
  ```

### 3. Inspirational Content

#### Get All Inspirations
- **Endpoint**: `GET /api/inspires`
- **Description**: Retrieve a list of inspirational quotes
- **Query Parameters**:
  - `limit`: Number of items per page (default: 10)
  - `page`: Page number (default: 1)
- **Example Request**:
  ```bash
  curl 'https://inspiro-backend.vercel.app/api/inspires?limit=5&page=1'
  ```
- **Example Response**:
  ```json
  {
    "inspires": [
      {
        "_id": "6123a1b234c5d60015d8e9f3",
        "quote": "The best among you are those who have the best manners and character.",
        "source": "Prophet Muhammad (PBUH)"
      }
    ],
    "total": 1,
    "pages": 1
  }
  ```

#### Get Random Inspiration
- **Endpoint**: `GET /api/inspires/random`
- **Description**: Get a random inspirational quote
- **Example Request**:
  ```bash
  curl https://inspiro-backend.vercel.app/api/inspires/random
  ```
- **Example Response**:
  ```json
  {
    "_id": "6123a1b234c5d60015d8e9f3",
    "quote": "The best among you are those who have the best manners and character.",
    "source": "Prophet Muhammad (PBUH)"
  }
  ```

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Error details here"
}
```

#### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong on our end"
}
```

## Rate Limiting
- Public endpoints: 100 requests per 15 minutes
- No authentication required for any endpoints

## CORS
- Allowed Origins:
  - `https://inspiro-salik.vercel.app`
  - `http://localhost:5173` (for development)

## Development

### Prerequisites
- Node.js 14+
- npm or yarn
- MongoDB Atlas account

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
This API is deployed on Vercel. Any push to the `main` branch will trigger an automatic deployment.

## License
This project is licensed under the MIT License.
