/** @jsx createElement */

import { createElement, FC, useState } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import ProgressBar from '@/views/ui/ProgressBar'
import PlusIcon from '@/views/icons/PlusIcon'

import { deleteProject } from '@/controllers/projectController'

interface Props {
  code: string
  achievedHours: number
  goalHours: number
}

interface Actions {
  _deleteProject: typeof deleteProject
}

const ProjectProgress: FC<Props & Actions> = ({ _deleteProject, code, achievedHours, goalHours }) => {

  const [showDelete, toggleShowDelete] = useState<boolean>(false)

  return (
    <section 
      className="project-progress" 
      onMouseEnter={ () => toggleShowDelete(true) }
      onMouseLeave={ () => toggleShowDelete(false) }  
      key={ v4() }
    >
      { 
        showDelete 
          && 
        <button 
          className="delete-project"
          onClick={ () => _deleteProject(code) }
        >
          <PlusIcon type="delete" />
        </button> 
      }
      <section className="project-meta">
        <h1 className="project-code">{ code }
        </h1>
        <p className="project-goal-hours">{ `${ goalHours } hours` }</p>
      </section>
      <ProgressBar 
        earned={achievedHours}
        total={goalHours}
      />
    </section>
  )
}

const mapDispatch: Actions = {
  _deleteProject: deleteProject
}

export default connect(null, mapDispatch)(ProjectProgress)