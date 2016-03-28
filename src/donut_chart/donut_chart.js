import './donut_chart.css'
import React from 'react'

export default function DonutChart({ value, maxValue = 100 }) {
  const offset = 440 + 12 - value * 440 / maxValue

  return (
    <svg className="donut-chart" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle className="donut-chart__back" r="41%" cy="81" cx="81" fill="none" />
        <circle className="donut-chart__front" style={{ strokeDashoffset: offset || 440 }} r="41%" cy="81" cx="81" fill="none" />
      </g>
    </svg>
  )
}

