/* global btoa */

import rawTmpl from '!raw!./build_avatar_filter_tmpl.svg'
import bgColors from '!raw!./../bg_colors/bg_colors.css'

import { memoize } from 'ramda'

export default function register() {
  return this.filter('buildAvatar', /* @ngInject */ function ($interpolate) {
    const tmpl = $interpolate(rawTmpl)
    const colorRE = /(#\w{6})/g

    const colors = []
    let colorMatch
    while ((colorMatch = colorRE.exec(bgColors)) !== null) colors.push(colorMatch[1])

    const renderAvatar = memoize(function (name, color) {
      const svg = tmpl({ color: color, abbr: name })
      const base64Avatar = btoa(svg)
      return 'data:image/svg+xml;base64,' + base64Avatar
    })

    return function (model) {
      if (!model) return ''

      return renderAvatar('IE', colors[model.id % colors.length])
    }
  })
}
