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

type reducer = (state?: any, action?: action) => any;
type callback = (any) => any;
type unsubscribe = (id: number) => void;

type subscriber = {
    id: number,
    callback: callback;
}

export class Store {
    reducer: reducer;
    state;
    subscribers: Array<subscriber> = [];

    constructor(reducer: reducer) {
        this.reducer = reducer;
        this.state = this.reducer();
    }

    dispatch(action: action): void {
        const currentState = this.getState();
        this.state = this.reducer(currentState, action);
        this.subscribers.forEach((subscriber: subscriber) => subscriber.callback(this.state))        
    }

    getState(): any {
        return this.state;
    }

    subscribe(callback: callback): unsubscribe {
        const id = Math.floor(Math.random()*10**10);
        this.subscribers = [...this.subscribers, { id, callback }];

        return this.unsubscribe.bind(this, id);
    }

    unsubscribe(id: number): void {
        this.subscribers = this.subscribers.filter((subscriber: subscriber) => subscriber.id !== id);
    }    
}