import { TimeLogState, defaultTimeLogState } from "@/models/timeLog";
import { FormState, defaultFormState } from "@/models/form";

export interface Resource<T> {
  isLoading: boolean
  keys: string[]
  data: {
    [key: string]: T
  }
}

export interface AppState {
  timeLogState: TimeLogState
  formState: FormState
}

export const defaultAppState: AppState = {
  timeLogState: defaultTimeLogState,
  formState: defaultFormState
}