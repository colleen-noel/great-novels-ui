import { expect } from 'chai'
import {
  after, afterEach, before, describe, it,
} from 'mocha'
import { createSandbox } from 'sinon'
import { novelsList } from '../mocks/novels'
import * as NovelsActions from '../../actions/novels'
import { filterNovels, retrieveNovels } from '../../utils/novels'

describe('Utils - Novels', () => {
  let sandbox
  let stubbedFetchNovels

  before(() => {
    sandbox = createSandbox()

    stubbedFetchNovels = sandbox.stub(NovelsActions, 'fetchNovels')
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('filterNovels', () => {
    it('returns a list of novels that includes the search term', () => {
      const novels = [
        { title: 'Dracula' },
        { title: 'Great Expectations' },
        { title: 'Path of Daggers' },
      ]

      let filteredNovels = filterNovels(novels, 's')
      expect(filteredNovels.length).to.equal(2)

      filteredNovels = filterNovels(novels, 'g')
      expect(filteredNovels.length).to.equal(2)
    })

    it('returns an empty array when no novels match the search term', () => {
      const novels = [
        { title: 'Dracula' },
        { title: 'Great Expectations' },
        { title: 'Path of Daggers' },
      ]

      const filteredNovels = filterNovels(novels, 'j')
      expect(filteredNovels.length).to.equal(0)
    })
  })

  describe('retrieveNovels', () => {
    it('returns the novel title and full name of author from the API call', async () => {
      stubbedFetchNovels.returns(novelsList)

      const data = await retrieveNovels()
      expect(data).to.deep.equal(novelsList)
    })

    it('returns an array when the action returns bad data', async () => {
      stubbedFetchNovels.returns([])

      const data = await retrieveNovels()
      expect(data).to.deep.equal([])
    })
  })
})
