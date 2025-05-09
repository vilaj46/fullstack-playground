"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import type { TTodo } from "@/shared/types"

import {
  useDeleteTodo,
  useGetAllTodos,
  usePostTodo,
  useToggleTodo,
} from "@/lib/modules/todo/todoHooks"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const Todos = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  </div>
)

function TodoList() {
  const [task, setTask] = useState("")
  const todosQueryResult = useGetAllTodos()
  const postTodoMutation = usePostTodo({
    onSuccess: () => setTask(""),
  })
  const deleteTodoMutation = useDeleteTodo()
  const toggleTodoMutation = useToggleTodo()

  const addTodo = () => {
    if (!task.trim()) {
      return
    }

    postTodoMutation.mutate(task)
  }

  const toggleComplete = (id: TTodo["id"]) => {
    toggleTodoMutation.mutate(id)
  }

  const deleteTodo = (id: TTodo["id"]) => {
    deleteTodoMutation.mutate(id)
  }

  if (todosQueryResult.isPending) {
    return "Loading..."
  }

  if (todosQueryResult.isError) {
    return "An error has occurred: " + todosQueryResult.error.message
  }

  return (
    <div className="border-4 border-gray-800 bg-blue-400 max-w-md mt-4 mx-auto p-4 rounded-lg shadow-xl text-gray-900">
      <h2 className="font-bold mb-4 text-center text-2xl">Todo List</h2>

      <div className="flex gap-2">
        <input
          className="border-4 border-gray-800 bg-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800"
          type="text"
          placeholder="New Task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="border-4 border-gray-800 bg-gray-100 cursor-pointer px-6 py-3 rounded-lg shadow-md transition-all hover:bg-gray-700 hover:text-gray-100"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <ul className="mt-4">
        {todosQueryResult.data.map((todo) => (
          <li
            key={todo.id}
            className="border-4 border-gray-800 bg-gray-100 flex items-center justify-between mt-2 px-4 py-2 rounded-lg shadow-md"
          >
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.task}
            </span>
            <div className="flex gap-2">
              <button
                className="border-4 border-gray-800 bg-gray-100 cursor-pointer px-4 py-1 rounded-lg shadow-md hover:bg-gray-700 hover:text-gray-100"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                className="border-4 border-red-800 bg-red-400 cursor-pointer px-4 py-1 rounded-lg shadow-md hover:bg-red-600 hover:text-gray-100"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
