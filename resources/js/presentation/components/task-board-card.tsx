import React from 'react'
import { ITask } from '../../app/types/task'

import TaskList, { TaskTitle } from './task-list'

type Props = {
  tasks: ITask[]
}
export default function TaskBoradCard (data: Props) {

  const taskPending = data.tasks.filter(task => task.status === 'Pendente')
  const taskActive = data.tasks.filter(task => task.status === 'Activo')
  const taskDone = data.tasks.filter(task => task.status === 'Feito')

  return (
    <ul className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2">
      <li className="pending bg-gray-50">
        <TaskTitle text="Pendente" total={taskPending.length} />
        <TaskList tasks={taskPending} />
      </li>
      <li className="active bg-gray-50">
        <TaskTitle text="Activo" total={taskActive.length} />
        <TaskList tasks={taskActive} />
      </li>
      <li className="done bg-gray-50">
        <TaskTitle text="Feito" total={taskDone.length} />
        <TaskList tasks={taskDone} />
      </li>
    </ul>
  )
}
