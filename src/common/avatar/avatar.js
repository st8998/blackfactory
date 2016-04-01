import React from 'react'

import './avatar.css'
import tmpl from '!raw!./build_avatar_tmpl.svg'
import bgColors from '!raw!./../bg_colors.css'

import { memoize, match, tail, join, compose } from 'ramda'

const colors = match(/(#\w{6})/g, bgColors)

const nameToAbbr = compose(
  join(''),
  tail,
  match(/(?:\s*(\w).*?\s+(\w).*)|(?:^\s*(\w)(\w).*)|(\w)/)
)

const renderAvatar = memoize(function (name, id) {
  const color = colors[id % colors.length]
  const abbr = nameToAbbr(name)

  const svg = tmpl.replace('{{color}}', color).replace('{{abbr}}', abbr)
  const base64Avatar = btoa(svg)
  return 'data:image/svg+xml;base64,' + base64Avatar
})

export default function Avatar({ avatar, name = 'NA', id = 16 }) {
  const src = avatar || renderAvatar(name, id)

  return (
    <span className="avatar">
      <img className="avatar__pic" src={ src } />
    </span>
  )
}
