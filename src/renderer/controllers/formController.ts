import { FormState, defaultFormState } from "@/models/form"

export enum formActions {
  UPDATE_FORM = 'tmk/form/update',
  CLEAR_FORM = 'tmk/form/clear'
}

export const updateForm = (key: string, value: any) => ({
  type: formActions.UPDATE_FORM,
  payload: [key, value]
})

export const clearForm = () => ({
  type: formActions.CLEAR_FORM,
  payload: true
})


export const formReducer = (state: FormState = defaultFormState, action: any) => {

  const {
    type,
    payload
  } = action

  if (!type || !payload)
    return state

  let newState = { ...state }

  switch (type) {
    case formActions.CLEAR_FORM:
      if (payload) return defaultFormState
      else return state
    case formActions.UPDATE_FORM: 
      newState[payload[0]] = payload[1]
      return newState
    default: return state
  }
}