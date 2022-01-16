import React, { FormEvent, useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs'
import { ITask } from '../../app/types/task';
import Layout from '../../components/layout';
import TaskCardEditor from '../../components/task-card-editor';
import TaskCard from '../../components/task-card';
import { HttpClient } from '../../libs/http/http-client';
import LoadingPage from '../loading';

import Context from '../../components/context'
import { ButtonBlue } from '../../components/button';
import { TaskController } from '../../app/controllers/TaskController';
import { TaskCardDelete } from '../../components/task-card-delete';

export default function Tasks() {
    const [tasks, setTaks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [formData, setFormData] = useState<ITask>({} as ITask)
    const [selectedCard, setSelectedCard] = useState<[any, boolean]>([0, false])

    useEffect(() => {
        loadData()
    }, []);

    const handleShowEditor = () => {
        setShowModal(true)
    }

    const handleShowdelete = () => {
        setShowModalDelete(true)
    }

    const loadData = () => {
        HttpClient.get({
            uri: '/tasks',
            callback: (response: any) => {
                setLoading(false)
                setTaks(response.data)
            }
        })
    }

    const handClose = () => {
        setShowModal(false)
        setShowModalDelete(false)
        setFormData({} as ITask)
        setTimeout(() => {
            setSelectedCard([0, false])
        }, 1500);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let response
        if (!formData.id || formData.id < 1) {
            response = await TaskController.create(formData)
        } else {
            response = await TaskController.update(formData)
        }
        console.log(response.message);
        if (!response.result) {
        } else {
            handClose()
            loadData()
        }
    }

    const handleSubmitDelete = async (e: FormEvent) => {
        e.preventDefault()
        const response = await TaskController.delete(formData.id)

        if (!response.result) {
        } else {
            handClose()
            loadData()
        }
    }

    if (loading) {
        return <LoadingPage />
    }
    return (
        <Layout>
            <div>
                <div className="mb-5 font-semibold text-3xl">Tarefas (<small>{tasks.length}</small>)</div>
                <div className="mb-2">
                    <ButtonBlue onClick={handleShowEditor}>
                        <BsPlusCircle />
                        Nova
                    </ButtonBlue>
                </div>
                <Context.Provider value={{ handClose, handleSubmit, setFormData, formData }}>
                    <TaskCardEditor show={showModal} task={formData} />
                </Context.Provider>

                <Context.Provider value={{ handClose, handleSubmitDelete }}>
                    <TaskCardDelete show={showModalDelete} task={formData} />
                </Context.Provider>
                {tasks.length < 1 ?
                    <div className=""></div>
                    :
                    <div className="">
                        <ul className='grid grid-cols-3 gap-4'>
                            {tasks.map((task) => (
                                <li key={task.id} className=''>
                                    <Context.Provider value={{ handClose, setFormData, handleShowEditor, handleShowdelete, setSelectedCard, selectedCard }}>
                                        <TaskCard selected={selectedCard[task.id]} task={task} />
                                    </Context.Provider>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        </Layout>
    )
}
