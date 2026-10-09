import { createFileRoute } from '@tanstack/react-router'
import OpenAI from 'openai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const message = body?.message

          if (
            typeof message !== 'string' ||
            !message.trim() ||
            message.length > 4000
          ) {
            return Response.json(
              { error: 'Please enter a message up to 4000 characters.' },
              { status: 400 },
            )
          }

          const apiKey = process.env['OPENAI_API_KEY']

          if (!apiKey) {
            return Response.json(
              { error: 'OPENAI_API_KEY is missing from your server environment.' },
              { status: 500 },
            )
          }

          const openai = new OpenAI({ apiKey })

          const result = await openai.responses.create({
            model: 'gpt-4.1-mini',
            instructions:
              'You are a helpful AI Copilot. Be friendly, clear, and practical.',
            input: message.trim(),
          })

          return Response.json({ reply: result.output_text })
        } catch (error) {
          console.error('Chat API error:', error)

          return Response.json(
            { error: 'The AI request failed. Check your server terminal.' },
            { status: 500 },
          )
        }
      },
    },
  },
})