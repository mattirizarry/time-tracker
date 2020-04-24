/** @jsx createElement */

import { createElement, FC, useState } from 'react'
import { connect } from 'react-redux'

import PlusIcon from '@/views/icons/PlusIcon'
import { createProject } from '@/controllers/projectController'

interface Actions {
  _createProject: typeof createProject
}

const CreateProject: FC<Actions> = ({ _createProject }) => {

  const [code, setCode] = useState<string>("")
  const [goalHours, setGoalHours] = useState<number>(20)

  const _submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (code === "") return

    _createProject({
      code: code,
      goalHours: goalHours,
      achievedHours: 0
    })

    setCode('')
    setGoalHours(20)
  }

  return (
    <form className="create-project">
      <h1>add a new project</h1>
      <section className="fields">
        <input 
          className="input med" 
          placeholder="code" 
          type="text" 
          value={ code }
          onChange={ (e) => setCode(e.currentTarget.value) }
        />
        <input 
          className="input small" 
          placeholder="goal" 
          type="number" 
          value={ goalHours }
          min={ 1 }
          max={ 99 }
          onChange={ (e) => setGoalHours(parseInt(e.currentTarget.value))}  
        />
      </section>
      <button onClick={ _submitHandler } >
        <PlusIcon type="create" />
      </button>
    </form>
  )
}

const mapDispatch: Actions = {
  _createProject: createProject
}

export default connect(null, mapDispatch)(CreateProject)