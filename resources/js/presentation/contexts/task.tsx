import React from 'react'
import { TaskController } from '../../app/controllers/TaskController'
import { ITask } from '../../app/types/task'
import { HttpClient } from '../../libs/http/http-client'
import { NotificationType } from '../components/notification'

type NotityProps = {
  result: boolean
  message: string
  type: string
  show: boolean
}

type selectedCardProps = [any, boolean]

type TaskContextProps = {
  handClose: () => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  handleSubmitDelete: (e: React.FormEvent) => Promise<void>
  handleShowEditor: () => void
  handleShowTask: () => void
  handleShowdelete: () => void
  setFormData: (formData: ITask) => void
  formData: ITask
  setSelectedCard: (selectedCard: selectedCardProps) => void
  selectedCard: selectedCardProps
  showModalDelete: boolean
  showModal: boolean
  notify: NotityProps
  setNotify: (notify: NotityProps) => void
  setShowModalDelete: (showModalDelete: boolean) => void
  setShowLoader: (showLoader: boolean) => void
  showLoader: boolean
  showModalDetail: boolean
  loadingData: boolean
  tasks: ITask[]
  setTasks: (tasks: ITask[]) => void
  loadTaskRequest: () => Promise<void>
  setSoftDelete: (softDelete: boolean) => void
  softDelete: boolean
}

type TaskProviderProps = {
  children: React.ReactElement
}

export const TaskContext = React.createContext({} as TaskContextProps)

export const TaskProvider = ({ children }: TaskProviderProps) => {

  const [tasks, setTasks] = React.useState<ITask[]>([])
  const [loadingData, setLoadingData] = React.useState<boolean>(true)
  const [showLoader, setShowLoader] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = React.useState<boolean>(false)
  const [showModalDetail, setShowModalDetail] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<ITask>({} as ITask)
  const [selectedCard, setSelectedCard] = React.useState<selectedCardProps>([0, false])
  const [softDelete, setSoftDelete] = React.useState<boolean>(false)
  const [notify, setNotify] = React.useState<NotityProps>({ result: false, message: '', type: '', show: false })


  const handleShowEditor = () => {
    setShowModal(true)
  }

  const handleShowdelete = () => {
    setShowModalDelete(true)
    setSoftDelete(false)
  }

  const handleShowTask = () => {
    setShowModalDetail(true)
  }

  const handClose = () => {
    setShowModal(false)
    setShowModalDelete(false)
    setShowModalDetail(false)
    setFormData({} as ITask)
    setTimeout(() => {
      setSelectedCard([0, false])
    }, 1500)
  }

  const loadTaskRequest = async () => {
    const { data } = await HttpClient.get({ uri: '/tasks' })
    setLoadingData(false)
    setTasks(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let response
    if (!formData.id || formData.id < 1) {
      response = await TaskController.create(formData)
    } else {
      response = await TaskController.update(formData)
    }

    console.log('response', response)

    const type = response.result ? NotificationType.SUCCESS : NotificationType.ERROR
    setNotify({ message: response.message, type, show: true, result: response.result })

    if (response.result) {
      handClose()
      loadTaskRequest()
    }
  }

  const handleSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await TaskController.delete(formData.id, softDelete)
    const type = response.result ? NotificationType.SUCCESS : NotificationType.ERROR

    setNotify({ message: response.message, type, show: true, result: response.result })

    if (response.result) {
      handClose()
      loadTaskRequest()
    }
  }

  return (
    <TaskContext.Provider value={{
      formData,
      handClose,
      handleSubmit,
      handleShowdelete,
      handleShowEditor,
      handleShowTask,
      loadTaskRequest,
      loadingData,
      setFormData,
      setShowLoader,
      showLoader,
      handleSubmitDelete,
      setTasks,
      tasks,
      setSoftDelete,
      softDelete,
      showModalDetail,
      notify,
      setNotify,
      selectedCard,
      setSelectedCard,
      setShowModalDelete,
      showModal,
      showModalDelete
    }}>
      {children}
    </TaskContext.Provider>
  )
}