import { TimeLogState, defaultTimeLogState } from "@/models/timeLog";
import { FormState, defaultFormState } from "@/models/form";
import { ProjectState, defaultProjectState } from "./project";
import { PayState, initialPayState } from "./payState";

export interface Resource<T> {
  isLoading: boolean
  keys: string[]
  data: {
    [key: string]: T
  }
}

export interface ResourceAction<T> {
  readonly type: string
  readonly payload: T
}

export interface AppState {
  timeLogState: TimeLogState
  formState: FormState
  projectState: ProjectState
  payState: PayState
}

export const defaultAppState: AppState = {
  timeLogState: defaultTimeLogState,
  formState: defaultFormState,
  projectState: defaultProjectState,
  payState: initialPayState
}