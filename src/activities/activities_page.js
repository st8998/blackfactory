import './activities_page.css'
import $ from 'jquery'
import tmpl from './activities_page_tmpl.slim'
import * as activitiesActions from './activities_actions'
import { clone, pickAll } from 'ramda'
import { ActionCreators as undo } from 'redux-undo'

const sanitaize = pickAll(['id', 'color', 'name', 'abbr'])

const { floor, random } = Math


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

      Store.dispatch({ type: '@@INIT' })
      Store.dispatch(activitiesActions.request())

      Store.subscribe(function () {
        ctrl.pastSize = Store.getState().activities.past.length
        ctrl.futureSize = Store.getState().activities.future.length

        ctrl.cards = flowActivities(Store.getState().activities.present)
        ctrl.cardsHeight = cardsHeight(ctrl.cards)
      })

      this.undo = function () {
        Store.dispatch(undo.undo())
        Store.dispatch(activitiesActions.persist(Store.getState().activities.present))
      }
      this.redo = function () {
        Store.dispatch(undo.redo())
        Store.dispatch(activitiesActions.persist(Store.getState().activities.present))
      }

      $(document).on('keypress', function (e) {
        if (e.which === 26 && e.ctrlKey && e.shiftKey) {
          ctrl.redo()
        } else if (e.which === 26 && e.ctrlKey) {
          ctrl.undo()
        }
      })

      this.page.currentPage = 'activities'

      this.add = function () {
        Store.dispatch(activitiesActions.add({ color: floor(random() * 16) }, true))
      }
      this.remove = function (activity) {
        Store.dispatch(activitiesActions.remove(activity, true))
      }
      this.update = function (activity) {
        Store.dispatch(activitiesActions.update(sanitaize(activity), true))
      }
    }
  })
}
