import { Resource } from "./app";

export interface Project {
  code: string
  achievedHours: number
  goalHours: number
}

export type ProjectState = Resource<Project>

export const defaultProjectState: ProjectState = {
  isLoading: false,
  keys: [],
  data: {}
}