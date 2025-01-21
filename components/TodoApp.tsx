'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useTodos } from '@/hooks/useTodos'
import { Todo } from '@/types/todo'

export default function TodoApp() {
  const [newTodo, setNewTodo] = useState('')
  const { todos, addTodo, toggleTodo, deleteTodo, isAddingTodo } = useTodos()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <Card className="mx-auto mt-10 max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Todo App</CardTitle>
        <ThemeToggle />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new todo"
              disabled={isAddingTodo}
            />
            <Button type="submit" disabled={isAddingTodo}>
              {isAddingTodo ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>

        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between rounded-lg border bg-card p-3"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo)}
                    id={`todo-${todo.id}`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`${
                      todo.completed ? 'text-muted-foreground line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
