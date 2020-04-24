/** @jsx createElement */

import { createElement, FC, useState } from 'react'
import { connect } from 'react-redux'

import ProjectProgress from '@/views/ProjectProgress'
import CreateProject from '@/views/CreateProject'
import AddHours from '@/views/AddHours'
import CalculatePay from '@/views/CalculatePay'
import ProgressBar from '@/views/ui/ProgressBar'

import { AppState } from '@/models/app'
import { ProjectState } from '@/models/project'

interface Connected {
  _projects: ProjectState
}

const App: FC<Connected> = ({ _projects }) => {

  const [includeAllHours, setIncludeAllHours] = useState<boolean>(false)

  const _renderProjects = () => {
    return _projects.keys.map((key) => <ProjectProgress key={ key } { ..._projects.data[key] }/>  )
  }

  const _renderTotalProgress = () => {
    let earned = 0
    let total = 0

    _projects.keys.map((key) => {
      let {goalHours, achievedHours} = _projects.data[key]

      earned += achievedHours > goalHours && !includeAllHours ? goalHours : achievedHours
      total += goalHours
    })

    return (
      <section className="totals">
        <section className="total-numbers">
          <h1 className="earned">{ earned.toFixed(2) } earned of</h1>
          <h1 className="total">{ total } hours</h1>
        </section>
        <ProgressBar earned={ earned } total={ total } />
      </section>
    )
  }

  return (
    <section className="app">
      <main>
        <header>
          <CalculatePay />
        </header>
        <section className="dashboard">
          <AddHours />
        </section>
      </main>
      <aside>
        <header className="projects-header">
          <CreateProject />
        </header>
        <section className="projects">
          { _renderProjects() }
          <div className="arrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
        <footer>
          { _renderTotalProgress() }
          <button onClick={ () => setIncludeAllHours(!includeAllHours) } className="toggle">{ includeAllHours ? 'Show goals' : 'Show totals' }</button>
        </footer>
      </aside>
    </section>
  )
}

const mapToState = (state: AppState): Connected => ({
  _projects: state.projectState
})

export default connect(mapToState)(App)