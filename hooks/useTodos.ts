import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { todoService } from '@/lib/todoService'
import { Todo } from '@/types/todo'

export function useTodos() {
  const queryClient = useQueryClient()

  const { data: todos = [] } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: () => todoService.getTodos(),
    initialData: () => {
      return queryClient.getQueryData(['todos']) as Todo[]
    },
  })

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => todoService.addTodo(title),
    onSuccess: (newTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] = []) => [
        newTodo,
        ...oldTodos,
      ])
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: (todo: Todo) => todoService.toggleTodo(todo),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] = []) =>
        oldTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      )
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(['todos'], (oldTodos: Todo[] = []) =>
        oldTodos.filter((todo) => todo.id !== deletedId),
      )
    },
  })

  return {
    todos,
    addTodo: addTodoMutation.mutate,
    toggleTodo: toggleTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    isAddingTodo: addTodoMutation.isPending,
    isTogglingTodo: toggleTodoMutation.isPending,
    isDeletingTodo: deleteTodoMutation.isPending,
  }
}
