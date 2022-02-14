import {createStore} from "../../src/modules/store";

const mWoman = () => {
    return createStore({
        beautiful: 60,
        actions: {
            dressUp() {
                this.core.updateData({
                    beautiful: 90,
                });
            },
        },
    });
};

describe("core/store", function () {
    describe("createStore", () => {
        it("test base", function () {
            const dWoman = mWoman();
            const observer = jest.fn();

            expect(createStore({}).actions).toEqual({});
            expect(dWoman).toMatchObject({beautiful: 60});
            expect(dWoman.core.pickData()).toEqual({beautiful: 60});

            const unObserveData = dWoman.core.observeData(observer);
            dWoman.actions.dressUp();

            expect(dWoman).toMatchObject({beautiful: 90});

            expect(observer).toBeCalledTimes(1);
            expect(observer.mock.calls[0]).toEqual([{beautiful: 60}]);
            unObserveData();
            dWoman.actions.dressUp();
            expect(observer).toBeCalledTimes(1);
        });
        it("test extends", function () {
            const mWife = createStore(
                {
                    money: 100,
                    actions: {
                        buyClothes() {
                            this.core.updateData({
                                money: 30,
                                beautiful: 100,
                            });
                        },
                    },
                },
                mWoman()
            );

            expect(mWife.core.pickData()).toEqual({beautiful: 60, money: 100});

            mWife.core.baseActions.dressUp();
            expect(mWife.core.pickData()).toEqual({beautiful: 90, money: 100});

            mWife.actions.buyClothes();
            expect(mWife.core.pickData()).toEqual({beautiful: 100, money: 30});

            // @ts-ignore
            expect(() => createStore({}, {})).toThrow("BaseStore is not a store");
        });
    });
});
