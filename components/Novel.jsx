import React from 'react'
import styled from 'styled-components'

const Novel = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`

export default ({ id, title, author }) => (
  <Novel key={id}>
    {`${title} by ${author.nameFirst} ${author.nameLast}`}
  </Novel>
)
