
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          message: 'Backend is ready!',
        })
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const name = body.name

          if (typeof name !== 'string' || !name.trim()) {
            return Response.json(
              { error: 'Please provide a name.' },
              { status: 400 },
            )
          }

          return Response.json({
            success: true,
            message: `Hello, ${name.trim()}! Your backend received your input.`,
          })
        } catch {
          return Response.json(
            { error: 'Invalid request body.' },
            { status: 400 },
          )
        }
      },
    },
  },
})
