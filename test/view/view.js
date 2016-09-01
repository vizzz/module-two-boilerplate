/* eslint-env mocha */

import { assert } from 'chai'
import sinon from 'sinon'
import handleError from '../../src/error'
import { PAPIError } from '../../src/error'
import { loadUsers } from '../../src/userslist'

describe('handleError', function () {
    const testData = new PAPIError('Произошла ошибка')

    it('render custom message', function () {
        handleError(testData, document.body)
        assert.equal(document.body.innerHTML, 'Произошла ошибка', 'Wrong message')
    });
});

describe('make request', function() {
const data = ['111']

    beforeEach(function() {
        sinon.stub(window, 'fetch');
        window.fetch.returns(
            Promise.resolve({
                json() {return {status: 'ok',
                data: data}}
            })
        )
    })
    afterEach(function() {
        window.fetch.restore()
    })
    it('should call fetch with proper params', function(done) {
        loadUsers('vizzz13').then(function(resp) {
            assert.equal(resp, data)
        }).then(done, done)
    })
})
