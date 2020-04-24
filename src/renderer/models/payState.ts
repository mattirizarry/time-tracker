export interface PayState {
  payRate: number | undefined
  taxRate: number | undefined
}

export const initialPayState: PayState = {
  payRate: undefined,
  taxRate: undefined
}