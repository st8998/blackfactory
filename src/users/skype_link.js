import React from 'react'

export default ({ skypeName }) => <a href={`skype:${skypeName}?chat`}>{skypeName}</a>
