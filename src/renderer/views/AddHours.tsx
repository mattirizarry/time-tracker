/** @jsx createElement */

import { createElement, FC, useState } from 'react'
import { connect } from 'react-redux'

import { updateProject } from '@/controllers/projectController'

import { AppState } from '@/models/app'
import { ProjectState } from '@/models/project'

interface Actions {
  _updateProject: typeof updateProject
}

interface Connected {
  _projects: ProjectState
}

const AddHours: FC<Actions & Connected> = ({ _projects, _updateProject }) => {

  const [ selectedCode, setSelectedCode ] = useState<string>("")
  const [ earnedHours, setEarnedHours ] = useState<number>(0)

  const _renderCodes = () => {
    return _projects.keys.map((key: string) => <option key={ key } value={key} />)
  }

  const _submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()

    let currentProject = { ..._projects.data[selectedCode] }

    if (earnedHours < 0 || selectedCode === "") return

    currentProject.achievedHours += earnedHours

    _updateProject(currentProject)

    setSelectedCode("")
    setEarnedHours(0)
  }

  return (
    <form className="add-earned-hours">
      <h1>Add your hours</h1>
      <section className="form-inputs">
        <input 
          value={ selectedCode } 
          onChange={ (e) => setSelectedCode(e.currentTarget.value) } 
          list="codes" 
          className="input medium" 
          placeholder={ _projects.keys.length < 1 ? "create a project" : "project code" } 
          disabled={ _projects.keys.length < 1 }
        />
        <datalist id="codes">
          { _renderCodes() }
        </datalist>
        <input 
          type="number" 
          className="input medium" 
          placeholder="hours" 
          value={ earnedHours }
          disabled={ _projects.keys.length < 1 }
          onChange={ (e) => setEarnedHours(parseInt(e.currentTarget.value)) }
        />
      </section>
      <button
        onClick={ _submitHandler }
        disabled={ _projects.keys.length < 1 }
      >{`Add ${ earnedHours } hours to ${ selectedCode || "_______" }`}</button>
    </form>
  )
}

const mapToState = (state: AppState): Connected => ({
  _projects: state.projectState
})

const mapDispatch: Actions = {
  _updateProject: updateProject
}

export default connect(mapToState, mapDispatch)(AddHours)