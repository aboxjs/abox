import {throwError} from "../../src/utils/throwError";

describe('utils/throwError', function () {
    describe('throwError', () => {
        it('test throwError', () => {
            expect(() => throwError('error')).toThrow('error');
        });
    })
});
