import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ITask } from '../app/types/task';
import Modal from './modal';
import Context from '../components/context/serverContext'
import { ButtonBlue, ButtonGray, ButtonGrayLight } from './Button';
import { BsX } from 'react-icons/bs';

type Props = {
    show: boolean
    task?: ITask
}
export default function NewTaskCard(prop: Props) {
    const { handClose, handleSubmit, formData, setFormData } = useContext(Context)
    const task = prop.task

    const handleChange = (event: ChangeEvent<any>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <Modal show={prop.show}>
            <div className="w-96 bg-white px-6 py-8">
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
                    <div className="mb-2 pb-2 border-b">{task ? 'Editar' : 'Nova'} tarefa</div>
                    <div className="flex">
                        <input className='flex-1 focus:outline-none px-3 py-1 border rounded' type="text" name='title' onChange={handleChange} placeholder='Título' />
                    </div>
                    <div className="flex">
                        <textarea className='flex-1 focus:outline-none px-3 py-1 border rounded' name='description' onChange={handleChange} placeholder='Descrição' />
                    </div>
                    <div className="flex">
                        <select className='flex-1 focus:outline-none px-3 py-1 border rounded'
                            name='status'
                            onChange={handleChange}
                            defaultValue={''}>
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