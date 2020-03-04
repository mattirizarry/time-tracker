/** @jsx createElement */

import { createElement, FC } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import { TimeLogState } from '@/models/timeLog'
import { AppState } from '@/models/app'

import PunchItem from '@/views/PunchItem'

interface Connected {
  _timeLogState: TimeLogState
}

const PunchList: FC<Connected> = ({ _timeLogState }) => {

  const _renderPunches = () => {
    if (_timeLogState.keys.length === 0) return <h1>There are no punches yet...</h1>
    else return _timeLogState.keys.map((key: string) => <PunchItem key={ v4() } { ..._timeLogState.data[key] }/>)
  }

  return (
    <section className="punch-list container">
      <section className="punches">
        { _renderPunches() }
      </section>
    </section>  
  ) 
}

const mapToState = (state: AppState) => ({
  _timeLogState: state.timeLogState
})

export default connect(mapToState)(PunchList)