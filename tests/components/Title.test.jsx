import React from 'react'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { shallow } from 'enzyme'
import Title from '../../components/Title'

describe('Components - Title', () => {
  it('displays the title', () => {
    const wrapper = shallow(<Title />)

    expect(wrapper.find('Title').text()).to.equal('Great Novels')
  })
})
