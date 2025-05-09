import { TTodo } from "@/shared/types"
import todoModel from "@/modules/todo/todo.model"

const getAllTodos = () => todoModel.getAllTodos()

const createTodo = (task: TTodo["task"]) => todoModel.createTodo(task)

const deleteTodo = (id: TTodo["id"]) => todoModel.deleteTodo(id)

const toggleTodo = (id: TTodo["id"]) => todoModel.toggleTodo(id)

export default { getAllTodos, createTodo, deleteTodo, toggleTodo }
