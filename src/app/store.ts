type Action = {
    type: string,
    payload?: any
}

type Callback = (any) => any;

type Subscriber = {
    callback: Callback;
}

export class Store<S> {
    private subscribers: Array<Subscriber> = [];

    constructor(private reducer: (state: S, action: Action) => S, private state: S) {}

    dispatch(action: Action): void {
        const currentState = this.getState();
        this.state = this.reducer(currentState, action);
        if(currentState !== this.state) {
            this.subscribers.forEach((subscriber: Subscriber) => subscriber.callback(this.state));
        }        
    }

    getState(): S {
        return this.state;
    }

    subscribe(callback: (state: S) => any): () => void {
        this.subscribers = [...this.subscribers, { callback }];
        return () => this.unsubscribe(callback);
    }

    unsubscribe(unsubscribeCallback: (state: S) => any): void {    
        this.subscribers = this.subscribers.filter(({ callback }: Subscriber) => callback !== unsubscribeCallback);
    }    
}