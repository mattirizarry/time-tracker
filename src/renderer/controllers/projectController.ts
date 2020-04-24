import { ProjectState, defaultProjectState, Project } from "@/models/project"

export enum projectActions {
  CREATE_PROJECT = 'tmk/project/create',
  DELETE_PROJECT = 'tmk/project/delete',
  UPDATE_PROJECT = 'tmk/project/update'
}

export const createProject = (payload: Project) => ({
  type: projectActions.CREATE_PROJECT,
  payload
})

export const deleteProject = (payload: string) => ({
  type: projectActions.DELETE_PROJECT,
  payload
})

export const updateProject = (payload: Project) => ({
  type: projectActions.UPDATE_PROJECT,
  payload
})

export const projectReducer = (state: ProjectState = defaultProjectState, action: any) => {
  const { type, payload } = action

  if (!type || !payload) return state

  let newState = { ...state }

  switch (type) {
    case projectActions.CREATE_PROJECT:
      if (newState.keys.includes((payload as Project).code)) return state

      newState.keys.push((payload as Project).code)
      newState.data[(payload as Project).code] = { ...payload as Project }
      
      return newState
    case projectActions.DELETE_PROJECT:
      if (!newState.keys.includes(payload as string)) return state

      newState.keys = newState.keys.filter((key: string) => key !== payload as string)
      delete newState.data[payload as string]

      return newState
    case projectActions.UPDATE_PROJECT:
      if (!newState.keys.includes((payload as Project).code)) return state

      newState.data[(payload as Project).code] = { ...payload as Project }

      return newState
    default:
      return state
  }
}