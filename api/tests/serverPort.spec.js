import { port } from '../src/bin/www';
import { expect } from 'chai';

let testEnv = {}
testEnv.port = process.env.PORT;

// eslint-disable-next-line no-undef
describe('Server should be running correctly', () => {
    // eslint-disable-next-line no-undef
    it('verifies if is running in the correct port', () => {
        expect(port).to.equal(testEnv.port);
    });
});