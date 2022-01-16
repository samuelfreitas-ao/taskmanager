import React, { useContext, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ITask } from '../app/types/task';
import { ButtonBlue, ButtonRed } from './button';

import Context from './context'
import TaskStatusCard from './task-status-card';

type Props = {
    task: ITask
    selected: boolean
}
export default function TaskCard(data: Props) {
    const { handleShowEditor, handleShowTask, handleShowdelete, setFormData, setSelectedCard, selectedCard } = useContext(Context)
    const task = data.task
    const handleEdit = () => {
        setFormData(task)
        handleShowEditor()
        setSelectedCard({ ...selectedCard, [task.id]: true })
    }

    const handleDelete = () => {
        setFormData(task)
        handleShowdelete()
        setSelectedCard({ ...selectedCard, [task.id]: true })
    }

    const handleDetail = () => {
        setFormData(task)
        handleShowTask()
        setSelectedCard({ ...selectedCard, [task.id]: true })
    }

    return (
        <div className={`flex ${selectedCard[task.id] ? 'bg-green-100' : 'bg-blue-50'} border ${selectedCard[task.id] ? 'border-green-200' : 'border-blue-100'} px-5 py-2 rounded-lg h-full bg-opacity-50`}>
            <div className="">
                <div className="font-semibold mb-2">
                    <button onClick={handleDetail} className='hover:underline'>
                        <span className="font-bold">{task.id}</span> {task.title}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    {/* <BsArchiveFill className='w-8' /> */}
                    Ficheiros
                    <div className="">{task.files.length}</div>
                </div>
                <TaskStatusCard status={task.status} />
                <div className="flex gap-3 mt-2">
                    <ButtonBlue onClick={handleEdit}>
                        <BsPencil />
                    </ButtonBlue>
                    <ButtonRed onClick={handleDelete}>
                        <BsTrash />
                    </ButtonRed>
                </div>
            </div>
        </div>
    )
}
