import weatherReducer from '../js/reducers/weatherReducer';
import { expect } from 'chai';

describe('Weather reducer', () => {

    it('should return empty state', () => {
        expect(JSON.stringify(weatherReducer([], { type: '' }))).to.equal(JSON.stringify([]));
    });

    it('should return changed state', () => {
        const action = {
            type: 'FETCH_RESULTS',
            payload: { list: [{ name: 'test' }] }
        };
        expect(JSON.stringify(weatherReducer([], action))).to.equal(JSON.stringify([{ name: 'test' }]));
    });

});