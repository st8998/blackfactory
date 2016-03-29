import React from 'react'
import Stub from 'misc/stub'

export default ({ address }) => address ? <a href={`mailto:${address}`}>{address}</a> : <Stub />
