import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

// Create an OpenAI client configured for OpenRouter
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '',
  headers: {
    'HTTP-Referer': 'https://dinidugardens.lk', // Required by OpenRouter
    'X-Title': 'Dinidu Quotation Generator', // Optional
  }
})

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'OpenRouter API key is missing. Please add OPENROUTER_API_KEY to your .env file.' },
      { status: 500 }
    )
  }

  try {
    const { prompt, clientName, eventDate, items } = await req.json()

    const systemPrompt = `You are an expert event manager for "Dinidu Gardens & Caterers", a premium banquet hall and catering service in Seeduwa, Sri Lanka.
Your task is to write a warm, professional, and persuasive letter (2-3 short paragraphs) to include in a quotation. 
The letter should address the client directly. Do not include the itemized table in your response, just the prose letter.
Do not include sender or receiver address blocks at the top, just start with the greeting (e.g. "Dear [Name],").
Make it sound premium and hospitable.`

    const userPrompt = `Client Name: ${clientName || 'Valued Client'}
Event Date: ${eventDate || 'TBD'}
Quotation Details: ${items.map((i: any) => `${i.quantity}x ${i.description} (LKR ${i.price})`).join(', ')}

Additional Instructions from User: ${prompt}

Please write the quotation letter based on these details.`

    const { text } = await generateText({
      model: openrouter('meta-llama/llama-3-8b-instruct:free'), // Defaulting to a free capable model on OpenRouter
      system: systemPrompt,
      prompt: userPrompt,
    })

    return NextResponse.json({ text })
  } catch (error: any) {
    console.error('AI Generation Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate text. Ensure your OpenRouter API key is valid.' },
      { status: 500 }
    )
  }
}
