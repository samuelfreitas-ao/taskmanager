import React, { useContext, useState } from 'react';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { ITask } from '../app/types/task';
import { ButtonBlue, ButtonRed } from './button';

import Context from './context'

type Props = {
    task: ITask
    selected: boolean
}
export default function TaskCard(data: Props) {
    const { handleShowEditor, handleShowdelete, setFormData, setSelectedCard, selectedCard } = useContext(Context)
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

    return (
        <div className={`flex ${selectedCard[task.id] ? 'bg-green-100' : 'bg-blue-50'} border ${selectedCard[task.id] ? 'border-green-200' : 'border-blue-100'} px-5 py-2 rounded-lg h-full`}>
            <div className="">
                <div className="font-semibold mb-2">
                    <span className="font-bold">{task.id}</span> {task.title}
                </div>
                <div className="flex items-center gap-2">
                    {/* <BsArchiveFill className='w-8' /> */}
                    Ficheiros
                    <div className="">{task.files.length}</div>
                </div>
                <div className="flex gap-3 mt-2">
                    <div className="">Estado</div>
                    <div className="">{task.status}</div>
                </div>
                <div className="flex gap-3">
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
