import React, { Component } from 'react'

import { Link } from 'react-router'

import Avatar from 'common/avatar'
import ProjectListCardActions from './project_list_card_actions'

export default function ({ project, pos }) {
  return (
    <li className="project-tile"
        style={{ transform: `translateX(${pos.x}px) translateY(${pos.y}px)` }}>
      <ProjectListCardActions project={project} />
      <Link to={`/projects/${project.id}`} className="project-tile__project-link">
        <Avatar {...project} />
        <h4 className="project-tile__name">{ project.name || 'Unnamed' }</h4>
        <span className="project-tile__dates">{`Jan 2016 — Jan 2016`}</span>

        <p className="project-tile__descr">{ project.descr }</p>
      </Link>
    </li>
  )
}
