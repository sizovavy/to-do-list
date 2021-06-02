const debug: any = () => {};

let onError: any;

const _makeConnection: any = (browserSocket, head, port, hostname) => {
    const onSocket = (err, upstreamSocket) => {
        debug('received upstreamSocket callback for request %o', { port, hostname, err });

        // onError = (smterr: any) => {
        //     browserSocket.destroy(smterr);

        //     if (this._onError) {
        //         return this._onError(smterr, browserSocket, head, port);
        //     }
        // };

        if (err) {
            return onError(err);
        }

        upstreamSocket.setNoDelay(true);
        upstreamSocket.on('error', onError);

        browserSocket.emit('upstream-connected', upstreamSocket);

        browserSocket.pipe(upstreamSocket);
        upstreamSocket.pipe(browserSocket);
        upstreamSocket.write(head);

        return browserSocket.resume();
    };

    return onSocket;
};

describe('#_makeConnection', () => {
    it('should return #onSocket', () => {
        expect(_makeConnection()).toBeInstanceOf(Function);
    });

    describe('#onSocket', () => {
        let onSocket: any;

        let browserSocket: any;
        let upstreamSocket: any;

        const resume = 'resume';
        const err = 'error';
        const resultedError = 'resultedError';

        beforeEach(() => {
            browserSocket = {
                destroy: jest.fn().mockName('destroy'),
                emit: jest.fn().mockName('emit'),
                pipe: jest.fn().mockName('pipe'),
                resume: jest.fn().mockName('resume').mockReturnValue(resume),
            };

            upstreamSocket = {
                setNoDelay: jest.fn().mockName('setNoDelay'),
                on: jest.fn().mockName('on'),
                pipe: jest.fn().mockName('pipe'),
                write: jest.fn().mockName('write'),
            };
        });

        beforeEach(() => {
            onSocket = _makeConnection(browserSocket);
        });

        it('should return result of browser socket #resume', () => {            
            // onSocket(null, upstreamSocket); --why?
            expect(onSocket(null, upstreamSocket)).toBe(resume);
            expect(browserSocket.resume).toHaveBeenCalled(); // why? of course it has been called as we have got return value
        });

        it('should emit upstream connected socket with upstream socket', () => {
            console.log(browserSocket.emit)
            onSocket(null, upstreamSocket);
            
            expect(browserSocket.emit).toHaveBeenCalledWith('upstream-connected', upstreamSocket);
        });

        // it('should perform #onError if error is passed', () => {
        //     onError = jest.fn().mockName('onError');
        //     // expect(onErrorr).toHaveBeenCalled();
        //     console.log(onError)
            
        //     onSocket(err, upstreamSocket);
        //     console.log(onError)
        //     expect(onError).toHaveBeenCalledWith(err);
        // });

        it('should return result of #onError if error is passed', () => {
            onError = jest.fn().mockName('onError').mockReturnValue(resultedError);
            expect(onSocket(err, upstreamSocket)).toBe(resultedError);
        });

        it('should not perform events if error passed', () => {
            onSocket(err, upstreamSocket);

            expect(upstreamSocket.setNoDelay).not.toHaveBeenCalled();
            expect(upstreamSocket.on).not.toHaveBeenCalled();

            expect(browserSocket.emit).not.toHaveBeenCalled();

            expect(browserSocket.pipe).not.toHaveBeenCalled();
            expect(upstreamSocket.pipe).not.toHaveBeenCalled();
            expect(upstreamSocket.write).not.toHaveBeenCalled();

            expect(browserSocket.resume).not.toHaveBeenCalled();
        });
    });
});