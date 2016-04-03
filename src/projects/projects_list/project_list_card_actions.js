import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'core-decorators'
import cn from 'classnames'

import { map, addIndex } from 'ramda'

import withLoading from 'misc/with_loading'

import Loader from 'common/loader'
import Dropdown from 'common/dropdown'

import { update as updateProject, remove as removeProject } from 'projects/projects_actions'

@connect(
  null,
  { archiveProject: (id) => updateProject(id, { archived: 1 }, true),
    unArchiveProject: (id) => updateProject(id, { archived: 0 }, true),
    removeProject: (id) => removeProject(id, true)
  }
)
export default class TeamUserActions extends Component {
  state = { loading: false };

  @decorate(withLoading())
  handleAction(action) {
    return action()
  }

  render() {
    const { project, archiveProject, unArchiveProject, removeProject } = this.props
    const actionButton = <span className="button button--gear button--borderless" />

    const projectActions = []
    if (project.archived) {
      projectActions.push(['UnArchive', unArchiveProject.bind(this, project.id)])
      projectActions.push(['Permanently remove', removeProject.bind(this, project.id)])
    } else {
      projectActions.push(['Archive', archiveProject.bind(this, project.id)])
    }

    const actionNodes = addIndex(map)(([title, action], idx) =>
      <li key={idx} className="action-list__action"
          onClick={this.handleAction.bind(this, action)}>{title}</li>)

    return this.state.loading ? <span className="team__user-actions"><Loader /></span> :
      <span className="project-tile__actions">
        <Dropdown actionButton={actionButton} corner="right">
          <ul className="action-list">
            { actionNodes(projectActions) }
          </ul>
        </Dropdown>
      </span>
  }
}
