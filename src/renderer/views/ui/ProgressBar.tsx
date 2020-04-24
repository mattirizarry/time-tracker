/** @jsx createElement */

import { createElement, FC } from 'react' 

interface Props {
  earned: number
  total: number
}

const ProgressBar: FC<Props> = ({ earned, total }) => {
  return (
    <section className="progress-bar">
      <section className="progress-gained" style={{ width: `${ earned > total ? 100 : earned * 100 / total }%` }}>
      </section>
      <p className="achieved-hours">
        {`${ earned.toFixed(2) } hours`}
      </p>
    </section>
  )
}

export default ProgressBar