import React from 'react'

export default ({ id, title }) => (
  <div key={id}>
    {`${title}`}
  </div>
)
