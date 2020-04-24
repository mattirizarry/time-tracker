/** @jsx createElement */

import { createElement, FC } from 'react'
import { connect } from 'react-redux'

import { AppState } from '@/models/app'
import { PayState } from '@/models/payState'
import { updatePayState } from '@/controllers/payController'
import { ProjectState } from '@/models/project'

interface Actions {
  _updatePayState: typeof updatePayState
}

interface Connected {
  _projectState: ProjectState
  _payState: PayState
}

const CalculatePay: FC<Actions & Connected> = ({ _updatePayState, _payState, _projectState }) => {

  const _calculatePay = (rate: number, tax: number) => {
    let earnedHours = 0 
    
    _projectState.keys.map((key: string) => { earnedHours += _projectState.data[key].achievedHours })

    let rateTimesEarned = rate * earnedHours
    let taxPercentage = tax / 100

    let totalPay = rateTimesEarned * (1 - taxPercentage)
    
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
        
    return formatter.format(totalPay)
  }

  return (
    <section className="calculate-pay">
      <section className="variable-inputs">
        <input 
          type="number" 
          className="input med" 
          value={ _payState.payRate } 
          placeholder="hourly rate"
          onChange={ (e) => _updatePayState({
            ..._payState,
            payRate: parseInt(e.currentTarget.value)
          })}
        />
        <span className="multiply">*</span>
        <input 
          type="number"
          className="input med"
          placeholder="est. tax %"
          value={ _payState.taxRate }
          onChange={ (e) => _updatePayState({
            ..._payState,
            taxRate: parseInt(e.currentTarget.value)
          })}
        />
      </section>
      <strong><span>=</span>{_calculatePay(_payState.payRate || 0, _payState.taxRate || 0)}</strong>
    </section>
  )
}

const mapToState = (state: AppState): Connected => ({
  _projectState: state.projectState,
  _payState: state.payState
})

const mapDispatch: Actions = {
  _updatePayState: updatePayState,
}

export default connect(mapToState, mapDispatch)(CalculatePay)