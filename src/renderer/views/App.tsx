/** @jsx createElement */

import { createElement, FC } from 'react'

import PunchForm from '@/views/PunchForm'

const App: FC = () => {
  return (
    <section className="app">
      <PunchForm />
    </section>
  )
}

export default App