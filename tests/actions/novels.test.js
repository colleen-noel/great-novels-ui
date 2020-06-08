import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { expect } from 'chai'
import { before, describe, it } from 'mocha'
import { novelsList } from '../mocks/novels'
import { fetchNovels } from '../../actions/novels'

describe('Actions - Novels', () => {
  let mockAxios

  before(() => {
    mockAxios = new MockAdapter(axios)
  })

  describe('fetchNovels', () => {
    it('returns the novel name and author from the API', async () => {
      mockAxios.onGet().reply(200, novelsList)

      const data = await fetchNovels('titles')

      expect(data).to.deep.equal(novelsList)
    })

    it('returns an empty array when the API returns a non-200 status code', async () => {
      mockAxios.onGet().reply(404, 'Not Found')

      const data = await fetchNovels('Not Found')

      expect(data).to.deep.equal([])
    })
  })
})
