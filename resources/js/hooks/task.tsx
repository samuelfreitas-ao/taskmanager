import React from "react"
import { TaskContext } from "../presentation/contexts/task"

export const useTask = () => React.useContext(TaskContext)