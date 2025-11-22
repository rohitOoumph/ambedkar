import { NextRequest, NextResponse } from 'next/server'
import { getSystemPrompt } from '@/lib/ai-context'

// Models that don't support system messages (must use user message instead)
const MODELS_WITHOUT_SYSTEM_SUPPORT = [
  'google/gemma-3n-e2b-it:free',
  'google/gemma'
]

function formatMessagesForModel(messages: any[], systemPrompt: string, model: string) {
  // Remove any existing system messages from user messages
  const userMessages = messages.filter(m => m.role !== 'system')
  
  // Check if model supports system messages
  const supportsSystem = !MODELS_WITHOUT_SYSTEM_SUPPORT.some(noSysModel => model.includes(noSysModel))
  
  if (supportsSystem) {
    // Model supports system role - use it
    return [
      {
        role: 'system',
        content: systemPrompt
      },
      ...userMessages
    ]
  } else {
    // Model doesn't support system role - prepend as first user message
    return [
      {
        role: 'user',
        content: systemPrompt
      },
      ...userMessages
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    // Get system prompt with Ambedkar context and restrictions
    const systemPrompt = getSystemPrompt()

    // Model selection: Try Mistral first, fallback to Gemma
    const models = [
      'mistralai/mistral-small-3.2-24b-instruct:free',
      'google/gemma-3n-e2b-it:free'
    ]
    
    // Get preferred model from env or use first one
    const preferredModel = process.env.OPENROUTER_MODEL || models[0]
    const modelToUse = models.includes(preferredModel) ? preferredModel : models[0]

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Dr. B.R. Ambedkar - Architect of Modern India',
      'Content-Type': 'application/json',
    }

    // Format messages for primary model
    let messagesWithContext = formatMessagesForModel(messages, systemPrompt, modelToUse)

    // Try primary model first, then fallback if it fails
    let response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: modelToUse,
        messages: messagesWithContext,
      }),
    })

    // If primary model fails, try fallback model
    if (!response.ok && modelToUse === models[0]) {
      console.warn(`Primary model ${modelToUse} failed, trying fallback model ${models[1]}`)
      // Reformat messages for fallback model (might need different format)
      messagesWithContext = formatMessagesForModel(messages, systemPrompt, models[1])
      
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: models[1],
          messages: messagesWithContext,
        }),
      })
    }

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    return NextResponse.json({
      message: data.choices[0]?.message?.content || 'No response from AI',
    })
  } catch (error) {
    console.error('Error calling OpenRouter API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

