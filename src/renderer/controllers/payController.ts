import { PayState, initialPayState } from "@/models/payState"

export enum payActions {
  UPDATE_PAY_STATE = 'tmk/pay/update_pay_state',
  UPDATE_TAX = 'tmk/pay/update_tax'
}

export const updatePayState = (payload: PayState) => ({
  type: payActions.UPDATE_PAY_STATE,
  payload
})

export const payReducer = (state: PayState = initialPayState, action: any) => {
  const { type, payload } = action

  if (!type) return state

  let newState = { ...state }

  switch (type) {
    case payActions.UPDATE_PAY_STATE:
      newState = payload
      return newState
    default: 
      return state
  }
}