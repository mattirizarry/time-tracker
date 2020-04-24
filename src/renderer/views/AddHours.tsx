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
  const [ dropdownActive, setDropdownActive ] = useState<boolean>(false)

  const _renderCodes = () => {
    return _projects.keys.map((key: string) => <li key={ key } onClick={ (e) => _codeHandler(key) }>{ key }</li>)
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

  const _codeHandler = (code: string) => {
    setSelectedCode(code)
    setDropdownActive(false)
  }

  const _dropdownHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setDropdownActive(!dropdownActive)
  }

  return (
    <form className="add-earned-hours">
      <h1>Add your hours</h1>
      <section className="form-inputs">
        <section className={`project-dropdown-codes ${ dropdownActive && 'active' }`}>
          <button
            onClick={ _dropdownHandler }
          >{ dropdownActive || !selectedCode ? "click to select code" : selectedCode }</button>
          <section className="dropdown-masonry">
            { _renderCodes() }
          </section>
        </section>
        {
          /*
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
          
          */
        }
        <input 
          type="number" 
          className="input medium" 
          placeholder="hours"
          pattern="[0-9]*"
          step="0.01" 
          value={ earnedHours }
          disabled={ _projects.keys.length < 1 }
          onChange={ (e) => setEarnedHours(parseFloat(e.currentTarget.value)) }
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