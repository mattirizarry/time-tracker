/** @jsx createElement */

import { createElement, FC } from 'react'

import { TimeLog } from '@/models/timeLog'

const PunchItem: FC<TimeLog> = ({ logType, projectCode, timestamp }) => {

  const dateFromTimestamp = new Date(timestamp)

  return (
    <section className="punch-item">
      <p><strong>{ projectCode }</strong>{ logType }</p>
      <em>{ dateFromTimestamp.toLocaleString() }</em>
    </section>
  )
}

export default PunchItem