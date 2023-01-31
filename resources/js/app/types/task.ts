import { IFile } from './file'

export type ITask = {
  id: number
  title: string
  description: string
  status: 'Activo' | 'Pendente' | 'Feito'
  created_at: Date
  updated_at: Date
  deleted_at: Date
  files: IFile[]
}
