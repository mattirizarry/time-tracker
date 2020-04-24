/** @jsx createElement */

import { createElement, FC } from 'react'

interface Props {
  type: "create" | "delete"
}

const PlusIcon: FC<Props> = ({ type }) => {

  const _switchColor = () => {
    switch (type) {
      case "delete":
        return "#FA5252"
      case "create":
      default:
        return "#43b05c"
    }
  }

  return (
    <svg viewBox="0 0 50 50" height="24px" width="24px">
      <circle cx={25} cy={25} r={25} fill={ _switchColor() } />
      <path
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M25 13v25M37.5 25h-25"
      />
    </svg>
  )
}

export default PlusIcon