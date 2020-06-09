/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  afterEach, before, describe, it,
} from 'mocha'
import models from '../../models'
import { getAllNovels, getNovelByIdOrTitle } from '../../controllers/novels'
import { novelsList, singleNovel } from '../mocks/novels'

chai.use(sinonChai)

describe('Controllers - novels', () => {
  let sandbox
  let stubbedFindAll
  let stubbedFindOne
  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let response

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedFindAll = sandbox.stub(models.Novels, 'findAll')
    stubbedFindOne = sandbox.stub(models.Novels, 'findOne')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  afterEach(() => {
    sandbox.reset()
  })


  describe('getAllNovels', () => {
    it('retrieves a list of novels from the database and calls the response.send() with the list', async () => {
      stubbedFindAll.returns(novelsList)

      await getAllNovels({}, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        include: [
          { model: models.Authors },
          { model: models.Genres },
        ],
      })

      expect(stubbedSend).to.have.been.calledWith(novelsList)
    })
  })

  describe('getNovelByIdOrTitle', () => {
    it('retrieves the novel associated with the requested id or title from the database and calls response.send with it', async () => {
      stubbedFindOne.returns(singleNovel)
      const request = { params: { identifier: 'War and Peace' } }

      await getNovelByIdOrTitle(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: 'War and Peace' },
            { title: { [models.Sequelize.Op.like]: '%War and Peace%' } },
          ],
        },

        include: [
          { model: models.Authors },
          { model: models.Genres },
        ],
      })
      expect(stubbedSend).to.have.been.calledWith(singleNovel)
    })

    it('returns a 404 when the novel is not found in the database', async () => {
      stubbedFindOne.returns(null)
      const request = { params: { identifier: 'not-found' } }

      await getNovelByIdOrTitle(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({
        where: {
          [models.Sequelize.Op.or]: [
            { id: 'not-found' },
            { title: { [models.Sequelize.Op.like]: '%not-found%' } },
          ],
        },

        include: [
          { model: models.Authors },
          { model: models.Genres },
        ],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })
})
