import React from "react"

const Tasks = React.lazy(() => import("../components/pages/task/Tasks"))
const TaskCreate = React.lazy(() => import("../components/pages/task/TaskCreate"))

const routes = [
    { path: "/", element: <Tasks /> },
    { path: "/pages/tarefa/listar", element: <Tasks /> },
    { path: "/pages/tarefa/listarconcluidas", element: <Tasks status="completed"/> },
    { path: "/pages/tarefa/listarnaoconcluidas", element: <Tasks  status="not_completed" /> },
    { path: "/pages/tarefa/cadastrar", element: <TaskCreate /> },
]
export default routes
