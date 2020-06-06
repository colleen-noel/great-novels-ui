import React from 'react'

export default ({ id, nameFirst, nameLast }) => (
  <div key={id}>
    {`${nameFirst} (${nameLast})`}
  </div>
)
