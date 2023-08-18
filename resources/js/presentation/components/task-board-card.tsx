import React from 'react'
import { ITask } from '../../app/types/task'

import TaskList, { TaskTitle } from './task-list'

type Props = {
  tasks: ITask[]
}
export default function TaskBoardCard(data: Props) {
  const pendingTasks = data.tasks.filter((task) => task.status === 'Pendente')
  const activeTasks = data.tasks.filter((task) => task.status === 'Activo')
  const doneTasks = data.tasks.filter((task) => task.status === 'Feito')

  return (
    <ul className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2">
      <li className="pending bg-gray-50">
        <TaskTitle text="Pendente" total={pendingTasks.length} />
        <TaskList tasks={pendingTasks} />
      </li>
      <li className="active bg-gray-50">
        <TaskTitle text="Activo" total={activeTasks.length} />
        <TaskList tasks={activeTasks} />
      </li>
      <li className="done bg-gray-50">
        <TaskTitle text="Feito" total={doneTasks.length} />
        <TaskList tasks={doneTasks} />
      </li>
    </ul>
  )
}
