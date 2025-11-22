# AI Chatbot Integration Documentation

This document explains how the OpenRouter AI integration was implemented for the "Ask Ambedkar" chatbot feature.

## Overview

The chatbot allows users to have real-time conversations with an AI assistant powered by OpenRouter AI. The integration uses a server-side API route to securely handle API keys and communicate with the OpenRouter service, while the frontend provides an intuitive chat interface.

## Architecture

The integration follows a **client-server architecture** with the following components:

```
┌─────────────────┐
│  Frontend       │
│  (AskAmbedkar   │
│   Component)    │
└────────┬────────┘
         │ HTTP POST
         │ /api/chat
         ▼
┌─────────────────┐
│  Next.js API    │
│  Route          │
│  /app/api/chat/ │
└────────┬────────┘
         │ HTTPS POST
         │ OpenRouter API
         ▼
┌─────────────────┐
│  OpenRouter AI  │
│  Service        │
└─────────────────┘
```

### Components

1. **Frontend Component** (`components/AskAmbedkar.tsx`)
   - React component with chat UI
   - Manages conversation state
   - Sends messages to API route
   - Displays AI responses

2. **API Route** (`app/api/chat/route.ts`)
   - Server-side endpoint
   - Handles OpenRouter API calls
   - Secures API key
   - Processes and returns responses

3. **Environment Configuration** (`.env.local`)
   - Stores sensitive API key
   - Configuration for site metadata

## Files Involved

### 1. Frontend Component
**File:** `components/AskAmbedkar.tsx`

This component provides the chat interface with:
- Floating action button to open chat
- Animated chat window
- Message display area
- Input field with send functionality
- Typing indicator
- Error handling

**Key Features:**
- Maintains conversation history in state
- Sends messages asynchronously via `fetch()`
- Updates UI based on API responses
- Handles errors gracefully

### 2. API Route
**File:** `app/api/chat/route.ts`

This Next.js API route handles:
- Receiving messages from frontend
- Validating request data
- Making authenticated requests to OpenRouter
- Processing and returning AI responses
- Error handling and logging

**Key Features:**
- Validates message array
- Retrieves API key from environment variables
- Includes required headers (Authorization, HTTP-Referer, X-Title)
- Uses the `google/gemma-3n-e2b-it:free` model
- Returns formatted responses

### 3. Environment Variables
**File:** `.env.local`

Contains:
- `OPENROUTER_API_KEY` - Your OpenRouter API key (kept secret)
- `NEXT_PUBLIC_SITE_URL` - Site URL for OpenRouter rankings
- `NEXT_PUBLIC_SITE_NAME` - Site name for OpenRouter rankings

**Security Note:** This file is automatically ignored by git (via `.gitignore`)

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the project root:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Dr. B.R. Ambedkar - Architect of Modern India
```

### 2. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for an account
3. Generate an API key
4. Add it to `.env.local`

### 3. Install Dependencies

No additional dependencies are required. The integration uses:
- `fetch` (built-in Node.js/Next.js)
- `next/server` (Next.js built-in)
- React hooks (built-in)

### 4. Start Development Server

```bash
npm run dev
```

The API route will be available at `/api/chat` and the chatbot will be accessible via the floating button.

## How It Works

### Step-by-Step Flow

1. **User Input**
   - User types a message in the chat input
   - Clicks send or presses Enter

2. **Frontend Processing**
   - `handleSend()` function is triggered
   - Message is added to local state
   - Input field is cleared
   - Typing indicator is shown

3. **API Request**
   - Frontend sends POST request to `/api/chat`
   - Request body includes conversation history (messages array)
   - Headers include Content-Type: application/json

4. **Server-Side Processing**
   - API route receives the request
   - Validates the messages array
   - Retrieves API key from environment variables
   - Prepares OpenRouter API request with:
     - Authorization header with Bearer token
     - HTTP-Referer and X-Title headers
     - Model specification: `google/gemma-3n-e2b-it:free`
     - Messages array in request body

5. **OpenRouter API Call**
   - Server makes POST request to OpenRouter
   - OpenRouter processes the request
   - Returns AI-generated response

6. **Response Processing**
   - API route extracts response content
   - Formats it for frontend consumption
   - Returns JSON with message content

7. **Frontend Update**
   - Frontend receives response
   - Adds AI message to conversation
   - Hides typing indicator
   - User can continue conversation

### Code Example

**Frontend Request:**
```typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: updatedMessages,
  }),
})
```

**API Route Request to OpenRouter:**
```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL,
    'X-Title': process.env.NEXT_PUBLIC_SITE_NAME,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemma-3n-e2b-it:free',
    messages: messages,
  }),
})
```

## Configuration

### Changing the AI Model

To use a different OpenRouter model, edit `app/api/chat/route.ts`:

```typescript
body: JSON.stringify({
  model: 'your-preferred-model-id', // Change this
  messages: messages,
}),
```

Popular free models:
- `google/gemma-3n-e2b-it:free` (current)
- `meta-llama/llama-3.2-3b-instruct:free`
- `microsoft/phi-3-mini-128k-instruct:free`

### Adding System Prompts

To customize the AI's behavior, add a system message at the start of the conversation:

```typescript
const messages = [
  {
    role: 'system',
    content: 'You are an AI assistant helping users learn about Dr. B.R. Ambedkar...'
  },
  ...userMessages
]
```

You can add this in the API route or modify the frontend to include it.

## Security Considerations

### API Key Protection

✅ **Secure:** API key is stored server-side only
- Never exposed to the browser
- Not included in client-side code
- Protected by Next.js environment variable system

✅ **Best Practices:**
- `.env.local` is in `.gitignore`
- API key never appears in network requests from browser
- Server-side validation prevents unauthorized access

### Error Handling

- API route includes comprehensive error handling
- Frontend gracefully handles API failures
- User-friendly error messages (no sensitive info exposed)
- Errors are logged server-side for debugging

## Troubleshooting

### Chat Not Working

1. **Check Environment Variables**
   ```bash
   # Verify .env.local exists and has API key
   cat .env.local
   ```

2. **Restart Development Server**
   - Environment variables load on server start
   - Restart after adding/updating `.env.local`

3. **Check API Key**
   - Verify key is correct on OpenRouter dashboard
   - Ensure no extra spaces or quotes

4. **Check Browser Console**
   - Look for error messages in browser DevTools
   - Check Network tab for failed requests

### Common Errors

**"OpenRouter API key not configured"**
- Solution: Add `OPENROUTER_API_KEY` to `.env.local` and restart server

**"Failed to get response from AI"**
- Solution: Check API key validity, verify OpenRouter service status

**"No response from AI"**
- Solution: Check OpenRouter API response format, verify model availability

## API Route Details

### Endpoint
`POST /api/chat`

### Request Body
```json
{
  "messages": [
    {
      "role": "user",
      "content": "What is the meaning of life?"
    }
  ]
}
```

### Response
```json
{
  "message": "AI response text here..."
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## Future Enhancements

Potential improvements:

1. **Streaming Responses**
   - Implement Server-Sent Events (SSE) for real-time streaming
   - Show responses as they're generated

2. **Conversation Persistence**
   - Save conversations to database
   - Allow users to view chat history

3. **Enhanced Context**
   - Add system prompts about Dr. Ambedkar
   - Include relevant context from the site content

4. **Model Selection**
   - Allow users to choose different AI models
   - Show model capabilities/limitations

5. **Rate Limiting**
   - Implement rate limiting to prevent abuse
   - Track API usage and costs

## References

- [OpenRouter API Documentation](https://openrouter.ai/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [OpenRouter Models](https://openrouter.ai/models)

---

**Last Updated:** Integration completed with OpenRouter AI using the `google/gemma-3n-e2b-it:free` model.

