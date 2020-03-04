/** @jsx createElement */

import { createElement, FC } from 'react'

import PunchForm from '@/views/PunchForm'
import PunchList from '@/views/PunchList'

const App: FC = () => {
  return (
    <section className="app">
      <PunchForm />
      <PunchList />
    </section>
  )
}

export default App