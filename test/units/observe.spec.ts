import {Observable} from '../../src/utils/observe'

describe('utils/observe', function () {
    describe('Observable', () => {
      it('test addObserver', function () {
        const observable = new Observable();
        const observer = jest.fn();

        // @ts-ignore
        expect(()=>observable.addObserver(null)).toThrow('observer is not a function')
        // @ts-ignore
        expect(()=>observable.addObserver(undefined)).toThrow('observer is not a function')
        // @ts-ignore
        expect(()=>observable.addObserver(1)).toThrow('observer is not a function')

        observable.addObserver(observer);
        observable.addObserver(()=>{});
        expect(observable.observes[0] ).toBe(observer)

        observable.addObserver(observer);
        expect(observable.observes.length ).toBe(2)
      });
      it('test removeObserver', function () {
        const observable = new Observable();
        const observer = jest.fn();

        observable.addObserver(observer);
        observable.addObserver(()=>{});
        observable.removeObserver(observer)
        expect(observable.observes.length ).toBe(1)
      });
      it('test notifyObservers', function () {
        const observable = new Observable();
        const observer = jest.fn();

        observable.addObserver(observer);
        observable.notifyObservers({a:1},{b:2})

        expect(observer).toBeCalledTimes(1);
        expect(observer.mock.calls.length).toBe(1);
        expect(observer.mock.instances).toEqual([{a:1}]);
        expect(observer.mock.calls[0]).toEqual([{b:2}]);
      });
    })
})
