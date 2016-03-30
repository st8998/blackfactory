import React from 'react'
import Stub from 'misc/stub'

export default ({ skypeName }) => skypeName ? <a href={`skype:${skypeName}?chat`}>{skypeName}</a> : <Stub />
