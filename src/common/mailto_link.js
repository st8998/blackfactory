import React from 'react'
import Stub from 'common/stub'

export default ({ address }) => address ? <a href={`mailto:${address}`}>{address}</a> : <Stub />
