// class Store {
//     dispatch(){}
//     subscribe(){} 
//     getState(){}
//     unsubscribe(){}
// }

// const store = new Store(reducer);
// store.subscribe()() //subscribe-unsubscribe

type action = {
    type: string,
    payload?: any
}

type callback = (any) => any;
type unsubscribe = (id: number) => void;

type subscriber = {
    id: number,
    callback: callback;
}

export class Store<S> {
    private subscribers: Array<subscriber> = [];

    constructor(private reducer: (state: S, action: action) => S, private state: S) {}

    dispatch(action: action): void {
        // state can be unchangable
        const currentState = this.getState();
        this.state = this.reducer(currentState, action);
        this.subscribers.forEach((subscriber: subscriber) => subscriber.callback(this.state));
    }

    getState(): S {
        return this.state;
    }

    subscribe(callback: callback): unsubscribe {
        // implement without id
        const id = Math.floor(Math.random() * (10**10));
        this.subscribers = [...this.subscribers, { id, callback }];
// avoid bind
        return this.unsubscribe.bind(this, id);
    }

    unsubscribe(id: number): void {
        this.subscribers = this.subscribers.filter(({ id }: subscriber) => id !== id);
    }    
}