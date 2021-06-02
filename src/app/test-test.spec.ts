const testFn: any = (handlers, actions, callback, properties) => {
    const { a, b, c: { d } } = properties;
    
    if (handlers[actions] && d) {
        return callback().then((a) => a - 123);
    }
    
    const { val } = handlers.defaultAction(a, String(b));
    
    return val;
}

describe('#testFn', () => {
    let fnRes: any;
    let handlers: any;
    let defaultAction: any;
    let callback: any;

    let properties = {
        a: 1,
        b: 2,
        c: { 
            d: "d"
        }
    };

    let propertiesWithoutD = {
        a: 1,
        b: 2,
        c: {}
    };
    
    let actions = "actions";
    let val = "val";
    let promiseValue = 124;
    let promise = new Promise(jest.fn().mockName('promise').mockReturnValue(promiseValue));


    beforeEach(() => {
        defaultAction = jest.fn().mockName('defaultAction').mockReturnValue({ val });

        handlers = {
            actions,
            defaultAction
        };

        callback = jest.fn().mockName('callback').mockReturnValue(promise);
    });

    describe('action or d from properties are not passed',() => {
        describe('action is not passed', () => {
            beforeEach(() => {
                fnRes = testFn(handlers,null,callback,properties);
            });

            it('should return val', () => {
                expect(fnRes).toBe(val);
            });

            it('stringify properties.b', () => {
                expect(handlers.defaultAction.mock.calls[0][1]).toBe("2");
            });
    
            it('#handlers.defaultAction was called with properties.a and String(properties.b)', () => {                
                expect(handlers.defaultAction).toHaveBeenCalledWith(properties.a, String(properties.b));
            });
        });

        describe('d from properties is not passed', () => {
            beforeEach(() => {
                fnRes = testFn(handlers,actions,callback,propertiesWithoutD);
            });

            it('should return val', () => {
                expect(fnRes).toBe(val);
            });

            it('stringify properties.b', () => {
                expect(handlers.defaultAction.mock.calls[0][1]).toBe("2");
            });
    
            it('#handlers.defaultAction was called with properties.a and String(properties.b)', () => {                
                expect(handlers.defaultAction).toHaveBeenCalledWith(properties.a, String(properties.b));
            });

        });

        describe('d from properties and action are not passed', () => {
            beforeEach(() => {
                fnRes = testFn(handlers,null,callback,propertiesWithoutD);
            });

            it('should return val', () => {
                expect(fnRes).toBe(val);
            });

            it('stringify properties.b', () => {
                expect(handlers.defaultAction.mock.calls[0][1]).toBe("2");
            });
    
            it('#handlers.defaultAction was called with properties.a and String(properties.b)', () => {                
                expect(handlers.defaultAction).toHaveBeenCalledWith(properties.a, String(properties.b));
            });

        });
    });

    describe('action and d from properties are passed',() => {
        beforeEach(() => {
            fnRes = testFn(handlers,actions,callback,properties);
        });

        it('#handlers.defaultAction was not called', () => {
            expect(handlers.defaultAction).not.toHaveBeenCalled();
        });

        it('#callback was called', () => {
            expect(callback).toHaveBeenCalled();
        });
        
        // do we need this?
        it('should return Promise', () => {
            expect(fnRes).toBeInstanceOf(Promise);
        });

        it('#callback then function must return 1', () => {            
            fnRes.then(x => expect(x).toBe(1));
        });
    });
});
