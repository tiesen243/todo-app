import { Suspense } from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import TodoApp from '@/components/TodoApp'
import { Card, CardContent } from '@/components/ui/card'
import { todoService } from '@/lib/todoService'

export default async function Home() {
  const queryClient = new QueryClient()

  // Prefetch the todos query
  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
  })

  return (
    <main className="min-h-screen p-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<Loading />}>
          <TodoApp />
        </Suspense>
      </HydrationBoundary>
    </main>
  )
}

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[300px]">
        <CardContent className="flex justify-center p-6">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    </div>
  )
}
