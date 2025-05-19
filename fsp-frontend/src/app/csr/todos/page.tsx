"use client"

import { useState } from "react"

import type { TTodoSorting, TTodo } from "@/shared/types"

import { useTodos } from "@/lib/modules/todo/todoHooks"

import Pagination from "@/lib/components/Pagination"
import { TodoForm, TodoList } from "@/lib/modules/todo/todoComponents"
import { todoSorting } from "@/shared/constants"

const Todos = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [sort, setSort] = useState<TTodoSorting>(todoSorting.NONE)
  const [task, setTask] = useState("")

  const {
    errorMessage,
    getTodos,
    handleCreateTodo,
    handleDeleteTodo,
    handleToggleTodo,
    isError,
    isLoading,
    isInfiniteQuery,
    todosInfiniteQueryResult,
    todosQueryResult,
  } = useTodos({
    currentPage,
    onPostSuccess: () => setTask(""),
    filter,
    sort,
  })

  const addTodo = () => {
    if (!task.trim()) {
      return
    }

    handleCreateTodo(task)
  }

  const toggleComplete = (id: TTodo["id"]) => handleToggleTodo(id)

  const deleteTodo = (id: TTodo["id"]) => handleDeleteTodo(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>{errorMessage}</div>
  }

  const todos = getTodos()

  return (
    <div className="border-4 border-gray-800 bg-blue-400 max-w-md mt-4 mx-auto p-4 rounded-lg shadow-xl text-gray-900">
      <h2 className="font-bold mb-4 text-center text-2xl">Todo List</h2>
      <TodoForm
        filterValue={filter}
        onAddTask={addTodo}
        onChangeFilter={(newFilter) => setFilter(newFilter)}
        onChangeSort={(newSort: TTodoSorting) => {
          setSort(newSort)
        }}
        onChangeTask={(task) => setTask(task)}
        onSearchFilter={() => todosQueryResult.refetch()}
        sortValue={sort}
        value={task}
      />
      {isInfiniteQuery ? (
        <>
          <TodoList
            onDeleteTodo={(id: number) => deleteTodo(id)}
            onToggleComplete={(id: number) => toggleComplete(id)}
            todos={todos}
          />
          <button
            className="block hover:cursor-pointer m-auto"
            onClick={() => {
              if (!todosInfiniteQueryResult.hasNextPage) {
                return
              }
              todosInfiniteQueryResult.fetchNextPage()
            }}
          >
            Fetch more
          </button>
        </>
      ) : (
        <>
          <Pagination
            currentPage={currentPage}
            onPageChange={(nextPage) => {
              setCurrentPage(nextPage)
            }}
            totalPages={todosQueryResult.data?.pagination.totalPages ?? 0}
          />
          <TodoList
            onDeleteTodo={(id: number) => deleteTodo(id)}
            onToggleComplete={(id: number) => toggleComplete(id)}
            todos={todos}
          />
        </>
      )}
    </div>
  )
}

export default Todos
