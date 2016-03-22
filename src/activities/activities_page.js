import './activities_page.css'
import tmpl from './activities_page_tmpl.slim'
import { loadActivities } from 'db'
import * as activitiesActions from './activities_actions'
import { clone } from 'ramda'

function flowActivities(activities) {
  let x = 250
  let y = 0
  let toRight = true
  const cards = []

  for (let i = 0; i < activities.length; i++) {
    const card = clone(activities[i]) 

    card.x = x
    card.y = y

    x = toRight ? x + 250 : x - 250
    if (x > 750) {
      toRight = false
      x = 750
      y += 250
    }
    if (x < 0) {
      toRight = true
      x = 0
      y += 250
    }
    
    cards.push(card)
  }

  return cards
}

function cardsHeight(cards) {
  return `${Math.ceil((cards.length + 1) / 4) * 250}px`
}

export default function register() {
  return this.component('activitiesPage', {
    template: tmpl,
    bindings: { page: '=' },
    controller: /* @ngInject */ function ($scope, Store) {
      const ctrl = this

      loadActivities(Store)

      Store.subscribe(function () {
        ctrl.cards = flowActivities(Store.getState().activities)
        ctrl.cardsHeight = cardsHeight(ctrl.cards)
      })

      this.page.currentPage = 'activities'

      this.add = function () {
        Store.dispatch(activitiesActions.add({ color: Math.floor(Math.random()*16) }))
      }
      this.remove = function (activity) {
        Store.dispatch(activitiesActions.remove(activity))
      }
      this.update = function (activity) {
        Store.dispatch(activitiesActions.update(activity))
      }
    }
  })
}
