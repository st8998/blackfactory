import './projects_list.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { decorate } from 'core-decorators'
import cn from 'classnames'

import { map } from 'ramda'

import { requestAll as requestAllProjects, add as addProject } from 'projects/projects_actions'
import { activeArchivedProjectsSelector } from 'projects/projects_selectors'

import withLoading from 'misc/with_loading'
import snakeFlow from 'misc/snake_flow'

import Stub from 'common/stub'
import Loader from 'common/loader'

import ProjectListCard from './projects_list_card'

const { ceil } = Math

@connect(
  activeArchivedProjectsSelector,
  { requestAllProjects, addProject }
)
export default class ConnectedProjectsList extends Component {
  state = { loading: false, adding: false, filter: 'active' };

  @decorate(withLoading('loading'))
  componentWillMount() {
    return this.props.requestAllProjects()
  }

  @decorate(withLoading('adding'))
  handleAdd() {
    return this.props.addProject({}, true)
  }

  setFilter(filter) {
    this.setState({ filter })
  }

  render() {
    if (this.state.loading) return <div className="centered-container"><Loader /></div>

    const projects = this.props[this.state.filter]

    const positions = snakeFlow(340, 3, this.state.filter === 'active' ? 1 : 0, projects)

    const projectNodes = map(project => <ProjectListCard key={project.id} project={project} pos={positions[project.id]}/>)

    return (
      <div className="centered-container">
        <div className="section-header">
          <h3 className="section-header__title">Projects</h3>

          <div className="section-buttons">
            <div className="project-list__filters">
              <span className={cn('project-list__filter', { 'project-list__filter--active': this.state.filter === 'active' })}
                    onClick={this.setFilter.bind(this, 'active')}>Active</span>
              <span className={cn('project-list__filter', { 'project-list__filter--active': this.state.filter === 'archive' })}
                    onClick={this.setFilter.bind(this, 'archive')}>
                {`Archive (${this.props.archive.length})`}
              </span>
            </div>
          </div>
        </div>
        <div className="section-body">
          <ul className="projects-tiles" style={{ height: ceil((projects.length + 1) / 3) * 331 }}>
            {this.state.filter === 'active' ? <li className="project-tile project-tile--add-new" onClick={this::this.handleAdd}>
              <span className={cn('project-tile__add-new-hint',
                                { 'project-tile__add-new-hint-loading': this.state.adding })}>
                Create new Project
              </span>
            </li> : <Stub/> }

            { projectNodes(projects) }
          </ul>
        </div>
      </div>
    )
  }
}
