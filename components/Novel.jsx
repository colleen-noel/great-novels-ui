import React from 'react'

export default ({ id, title, author }) => (
  <div key={id}>
    {`${title} by ${author.nameFirst} ${author.nameLast}`}
  </div>
)
