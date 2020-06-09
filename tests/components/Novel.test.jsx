import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { describe, it } from 'mocha'
import Novel from '../../components/Novel'

describe('Components - Novel', () => {
  it('displays the title of the novel and the full name of the author', () => {
    const wrapper = shallow(<Novel id={1} title="Dracula" author={{ nameFirst: 'Bram', nameLast: 'Stoker' }} />)

    expect(wrapper.text()).to.equal('Dracula by Bram Stoker')
  })
})
