import React, { useContext, useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { ITask } from '../app/types/task'
import { ButtonBlue, ButtonRed } from './button'

import Context from './context'
import TaskCard from './task-card'
import TaskList, { TaskTitile as TaskListTitile } from './task-list'
import TaskStatusCard, { TaskStatusType } from './task-status-card'

type Props = {
  tasks: ITask[]
}
export default function TaskBoradCard (data: Props) {
  const { handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard } = useContext(Context)

  const taskPending = data.tasks.filter(task => task.status === 'Pendente')
  const taskActive = data.tasks.filter(task => task.status === 'Activo')
  const taskDone = data.tasks.filter(task => task.status === 'Feito')

  return (
    <Context.Provider value={{ handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard }}>
      <ul className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2">
        <li className='pending bg-gray-50'>
          <TaskListTitile text='Pendente' total={taskPending.length} />
          <TaskList tasks={taskPending} />
        </li>
        <li className='active bg-gray-50'>
          <TaskListTitile text='Activo' total={taskActive.length} />
          <TaskList tasks={taskActive} />
        </li>
        <li className='done bg-gray-50'>
          <TaskListTitile text='Feito' total={taskDone.length} />
          <TaskList tasks={taskDone} />
        </li>
      </ul>
    </Context.Provider>
  )
}
