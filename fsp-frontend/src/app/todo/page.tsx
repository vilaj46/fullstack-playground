"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { useGetAllTodos } from "@/lib/modules/todo/todoHooks"

const queryClient = new QueryClient()

const Todos = () => (
  <div>
    <h1>Todos :|</h1>
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  </div>
)

function TodoList() {
  const todosQueryResult = useGetAllTodos()

  if (todosQueryResult.isFetching) {
    return "Loading..."
  }

  if (todosQueryResult.data?.status === "error") {
    return "An error has occurred: " + todosQueryResult.data.errors.message
  }

  return todosQueryResult.data?.result.map((todo) => (
    <li key={todo.id}>
      {todo.id} - {todo.task}
    </li>
  ))
}

export default Todos
