import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ITask } from '../app/types/task';
import Modal from './modal';
import Context from './context/serverContext'
import { ButtonBlue, ButtonGray, ButtonGrayLight } from './button';
import { BsX } from 'react-icons/bs';

type Props = {
    show: boolean
    task?: ITask
}
export default function TaskCardEditor(prop: Props) {
    const { handClose, handleSubmit, formData, setFormData } = useContext(Context)
    const task = prop.task

    const handleChange = (event: ChangeEvent<any>) => {
        const target = event.target
        const { name, value } = target;

        if (name == 'file') {
            target.files
            setFormData({ ...formData, [name]: target.files });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    return (
        <Modal show={prop.show}>
            <div className="w-96 bg-white px-6 py-8">
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
                    <div className="mb-2 pb-2 border-b">{task ? 'Editar' : 'Nova'} tarefa</div>
                    <div className="flex">
                        <input className='flex-1 focus:outline-none px-3 py-1 border rounded'
                            type="text"
                            name='title'
                            onChange={handleChange}
                            defaultValue={task && task.title}
                            placeholder='Título' />
                    </div>
                    <div className="flex">
                        <textarea className='flex-1 focus:outline-none px-3 py-1 border rounded'
                            name='description'
                            onChange={handleChange}
                            defaultValue={task && task.description}
                            placeholder='Descrição' />
                    </div>
                    <div className="flex">
                        <input className='flex-1 focus:outline-none px-3 py-1 border rounded'
                            type='file'
                            multiple
                            name='file'
                            onChange={handleChange} />
                    </div>
                    <div className="flex">
                        <select className='flex-1 focus:outline-none px-3 py-1 border rounded'
                            name='status'
                            onChange={handleChange}
                            defaultValue={task ? task.status : ''}>
                            <option value="" disabled>-Selecine-</option>
                            <option>Pendente</option>
                            <option>Activo</option>
                            <option>Feito</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <ButtonBlue type='submit'>
                            {task ? 'Salvar' : 'Criar'}
                        </ButtonBlue>
                        <ButtonGrayLight type='reset' onClick={handClose}>
                            Fechar
                            <BsX />
                        </ButtonGrayLight>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
