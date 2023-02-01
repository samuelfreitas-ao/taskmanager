import React, { useContext, useState } from 'react'
import { ITask } from '../app/types/task'

import Context from './context'
import TaskCard from './task-card'

type Props = {
  tasks: ITask[]
}

export default function TaskList (data: Props) {
  const { handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard } = useContext(Context)

  return (
    <ul className=''>
      {data.tasks.length > 0 && data.tasks.map(task => (
        <li key={task.id} className='inline-block p-3'>
          <Context.Provider value={{ handClose, setFormData, handleShowEditor, handleShowTask, handleShowdelete, setSelectedCard, selectedCard }}>
            <TaskCard selected={selectedCard[task.id]} task={task} />
          </Context.Provider>
        </li>
      ))}
    </ul>
  )
}

type PropTitle = {
  text: string
  total: number
}
export function TaskTitile (data: PropTitle) {
  return <div className="p-2 font-semibold border-b pb-2">{data.text} (<small>{data.total}</small>)</div>
}
