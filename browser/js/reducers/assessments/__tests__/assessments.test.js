'use strict'

import { expect } from 'chai'
import { byId, isFetching } from '../index'

describe('Assessments Reducer', () => {

  describe('byId', () => {
    const id = '1'
    const assessment = { id, name: 'Test' }
    const loadAction = { type: 'LOAD_ASSESSMENTS_SUCCESS', assessments: [assessment] }

    it('provides the initial state', () => {
      expect(byId(undefined, {})).to.deep.equal({})
    })

    it('handles LOAD_ASSESSMENTS_SUCCESS action', () => {
      const nextState = byId(undefined, loadAction)
      expect(nextState[id]).to.deep.equal(assessment)
    })

  })
})

