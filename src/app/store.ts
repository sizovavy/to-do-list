type Action = {
    type: string,
    payload?: any
}
interface one {
    name: string
}

interface one {
    id: number
}


type Subscriber<S> = (state: S) => void;

export class Store<S> {
    private subscribers: Array<Subscriber<S>> = [];

    constructor(private reducer: (state: S, action: Action) => S, private state: S) {}

    dispatch(action: Action): void {
        const state = this.reducer(this.state, action);

        if (state !== this.state) {
            this.state = state;
            this.subscribers.forEach((subscriber: Subscriber<S>) => subscriber(state));
        }        
    }

    getState(): S {
        return this.state;
    }

    subscribe(subscriber: Subscriber<S>): () => void {
        this.subscribers = [...this.subscribers, subscriber ];
        return () => this.unsubscribe(subscriber);
    }

    unsubscribe(unsubscriber: Subscriber<S>): void {
        this.subscribers = this.subscribers.filter((subscriber: Subscriber<S>) => subscriber !== unsubscriber);
    }    
}