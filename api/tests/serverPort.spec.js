import { server, port } from '../src/bin/www';
import {
    expect
} from 'chai';

let testEnv = {}
env.port = '3000';

describe('Server should be running correctly', () => {
    it('verifies if is running in the correct port', () => {
        expect(port).to.equal(testEnv.port);
    });
});