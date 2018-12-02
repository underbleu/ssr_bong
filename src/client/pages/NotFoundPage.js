import React from 'react'

const NotFoundPage = ({ staticContext = {} }) => {

  staticContext.notFound = true

  return <h1>Oops 404 ;(</h1>
}

export default {
  component: NotFoundPage,
}