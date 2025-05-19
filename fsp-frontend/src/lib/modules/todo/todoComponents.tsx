import type { ChangeEvent } from "react"
import { useRef } from "react"

import type { TTodo, TTodoSorting } from "@/shared/types"

import { todoSorting } from "@/shared/constants"

type TTodoFormProps = {
  filterValue: string
  onAddTask: () => void
  onChangeFilter: (filter: string) => void
  onChangeSort: (newSort: TTodoSorting) => void
  onChangeTask: (task: string) => void
  onSearchFilter: () => void
  sortValue: TTodoSorting
  value: string
}

const TodoForm = (props: TTodoFormProps) => {
  const timerRef = useRef<NodeJS.Timeout>(null)

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeFilter(e.target.value)

    if (typeof timerRef.current === "number") {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      props.onSearchFilter()
    }, 1000)
  }

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value

    if (newSort.length === 0) {
      props.onChangeSort(todoSorting.NONE)
      return
    }

    const isTodoSort = (sort: string): sort is TTodoSorting => {
      return Object.values(todoSorting).includes(sort as TTodoSorting)
    }

    if (!isTodoSort(newSort)) {
      return
    }

    props.onChangeSort(newSort)
  }

  return (
    <div className="flex gap-2">
      <input
        className="border-4 border-gray-800 bg-gray-100 px-4 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-800"
        type="text"
        placeholder="New Task..."
        value={props.value}
        onChange={(e) => props.onChangeTask(e.target.value)}
      />
      <button
        className="border-4 border-gray-800 bg-gray-100 cursor-pointer px-6 py-3 rounded-lg shadow-md transition-all hover:bg-gray-700 hover:text-gray-100"
        onClick={props.onAddTask}
      >
        Add
      </button>

      <input
        className="border-2 border-gray-400 bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 sm:max-w-xs"
        type="text"
        placeholder="Filter tasks..."
        value={props.filterValue}
        onChange={handleChangeFilter}
      />

      <select
        className="border-2 border-gray-400 bg-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
        value={props.sortValue}
        onChange={handleChangeSort}
      >
        <option value="">Sort by...</option>
        <option value={todoSorting.ID_ASC}>ID (Ascending)</option>
        <option value={todoSorting.ID_DESC}>ID (Descending)</option>
        <option value={todoSorting.ALPHA_ASC}>Alphabetical (A-Z)</option>
        <option value={todoSorting.ALPHA_DESC}>Alphabetical (Z-A)</option>
        <option value={todoSorting.COMPLETED_ASC}>
          Completed (False → True)
        </option>
        <option value={todoSorting.COMPLETED_ASC}>
          Completed (True → False)
        </option>
      </select>
    </div>
  )
}

type TTodoDeleteButtonProps = {
  onDelete: () => void
}

const TodoDeleteButton = (props: TTodoDeleteButtonProps) => {
  return (
    <button
      className="border-4 border-red-800 bg-red-400 cursor-pointer px-4 py-1 rounded-lg shadow-md hover:bg-red-600 hover:text-gray-100"
      onClick={props.onDelete}
    >
      Delete
    </button>
  )
}

type TTodoList = {
  todos: TTodo[]
  onToggleComplete: (id: number) => void
  onDeleteTodo: (id: number) => void
}

const TodoList = (props: TTodoList) => {
  return (
    <ul className="mt-4">
      {props.todos.map((todo) => (
        <li
          className="border-4 border-gray-800 bg-gray-100 flex items-center justify-between mt-2 px-4 py-2 rounded-lg shadow-md"
          key={todo.id}
        >
          <TodoTaskText
            id={todo.id}
            isComplete={todo.completed}
            task={todo.task}
          />
          <div className="flex gap-2">
            <TodoToggleButton
              isComplete={todo.completed}
              onToggleComplete={() => props.onToggleComplete(todo.id)}
            />
            <TodoDeleteButton onDelete={() => props.onDeleteTodo(todo.id)} />
          </div>
        </li>
      ))}
    </ul>
  )
}

type TTodoTaskText = {
  id: number
  isComplete: boolean
  task: string
}

const TodoTaskText = (props: TTodoTaskText) => {
  return (
    <span className={`${props.isComplete ? "line-through text-gray-500" : ""}`}>
      {props.id}: {props.task}
    </span>
  )
}

type TTodoToggleButtonProps = {
  isComplete: boolean
  onToggleComplete: () => void
}

const TodoToggleButton = (props: TTodoToggleButtonProps) => {
  return (
    <button
      className="border-4 border-gray-800 bg-gray-100 cursor-pointer px-4 py-1 rounded-lg shadow-md hover:bg-gray-700 hover:text-gray-100"
      onClick={props.onToggleComplete}
    >
      {props.isComplete ? "Undo" : "Done"}
    </button>
  )
}

export { TodoForm, TodoDeleteButton, TodoList, TodoTaskText, TodoToggleButton }
