import axios from 'axios'

import { Todo } from '@/types/todo'

export class TodoService {
  private static instance: TodoService
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos'

  private constructor() { }

  public static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService()
    }
    return TodoService.instance
  }

  private generateId(): number {
    // Combine timestamp with random number to ensure uniqueness
    return parseInt(`${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-9))
  }

  public async getTodos(): Promise<Todo[]> {
    const { data } = await axios.get<Todo[]>(this.API_URL)
    // Limiting to first 10 todos for better performance
    return data.slice(0, 10)
  }

  public async addTodo(title: string): Promise<Todo> {
    const { data } = await axios.post<Todo>(this.API_URL, {
      title,
      completed: false,
      userId: 1,
    })

    // Override the API response with our generated ID
    return {
      ...data,
      id: this.generateId(),
    }
  }

  public async toggleTodo(todo: Todo): Promise<Todo> {
    await axios.patch<Todo>(`${this.API_URL}/${todo.id}`, {
      completed: !todo.completed,
    })
    return { ...todo, completed: !todo.completed }
  }

  public async deleteTodo(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`)
  }
}

// Export a singleton instance
export const todoService = TodoService.getInstance()
