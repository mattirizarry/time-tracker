/** @jsx createElement */

import { createElement, FC } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import { updateForm, clearForm } from '@/controllers/formController'
import { createTimeLog } from '@/controllers/timeLogController'

import { AppState } from '@/models/app'
import { FormState } from '@/models/form'

import { projectCodes } from '@/config/constants'
import { TimeLog } from '@/models/timeLog'

interface Connected {
  _formState: FormState
}

interface Actions {
  _updateForm: typeof updateForm
  _clearForm: typeof clearForm
  _createTimeLog: typeof createTimeLog
}


const PunchForm: FC<Connected & Actions> = ({ _formState, _updateForm, _clearForm, _createTimeLog }) => {

  const _handleUpdateForm = (id: string, value: any) => {
    _updateForm(id, value)
  }

  const _handleSubmitForm = () => {

    const newPunch = { ..._formState as TimeLog, timestamp: new Date().getTime() }

    _createTimeLog(newPunch)
    _clearForm()
  }

  const _renderProjectOptions = () => {
    return Object.values(projectCodes).map((value: string) => <option key={ v4() } value={ value }>{ value }</option>)
  }

  return (
    <section className="punch-form container">
      <h2>Enter a new punch</h2>
      <fieldset>
        <label>Project</label>
        <select 
          defaultChecked={ false }
          defaultValue={ projectCodes.UNICORN }
          value={ _formState.projectCode }
          onChange={ (e) => _handleUpdateForm('projectCode', e.currentTarget.value) }
        >
          { _renderProjectOptions() }
        </select>
        <label>Start</label>
        <input 
          onChange={ (e) => _handleUpdateForm('logType', e.currentTarget.value) }

          type="radio" 
          name="type" 
          value="start" 
        />
        <label>End</label>
        <input 
          onChange={ (e) => _handleUpdateForm('logType', e.currentTarget.value) }

          type="radio" 
          name="type" 
          value="end" 
        />
      </fieldset>
      <button
        onClick={ _handleSubmitForm }
      >Submit</button>
    </section>
  )
}

const mapToState = (state: AppState) => ({
  _formState: state.formState
})

const mapDispatch = {
  _updateForm: updateForm,
  _clearForm: clearForm,
  _createTimeLog: createTimeLog
}

export default connect(mapToState, mapDispatch)(PunchForm)