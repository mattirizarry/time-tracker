import { v4 } from 'uuid'

import { TimeLogState, defaultTimeLogState, TimeLog } from "@/models/timeLog"

export enum timeLogActions {
  CREATE_LOG = "tmk/log/create"
}

export const createTimeLog = (payload: TimeLog) => ({
  type: timeLogActions.CREATE_LOG,
  payload: payload
})

export const timeLogReducer = (state: TimeLogState = defaultTimeLogState, action: any) => {

  const {
    type,
    payload
  } = action

  if (!type || !payload) return state

  const newState = { ...state } 
  
  switch (type) {
    case timeLogActions.CREATE_LOG:
      let newKey = v4()
      newState.keys.push(newKey)
      newState.data[newKey] = payload

      return newState
    default: return state
  }
}