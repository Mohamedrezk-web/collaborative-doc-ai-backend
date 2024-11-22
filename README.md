# Orange Thunder Backend

Orange Thunder Backend is a serverless backend application built on **Cloudflare Workers** using the **Hono framework**. It provides AI-powered endpoints for question answering and document translation, leveraging the **OpenAI API** and Cloudflare's AI models.

## Features

- **AI-Powered Question Answering**: Answer questions based on the provided document content using OpenAI's GPT model.
- **Document Translation**: Translate summarized document content into any target language.
- **Serverless and Scalable**: Runs on Cloudflare Workers for optimal performance.
- **CORS Enabled**: Ensures smooth interaction with front-end clients.

---

## API Endpoints

### 1. `/chat-to-document`

- **Method**: `POST`
- **Description**: Answer a question about a given document.
- **Request Body**:
  ```json
  {
  	"documentData": "The text of the document",
  	"question": "Your question about the document"
  }
  ```
