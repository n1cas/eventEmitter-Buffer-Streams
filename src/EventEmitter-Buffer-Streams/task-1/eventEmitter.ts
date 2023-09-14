import EventEmitter from 'events'
export class myEmitter {

  listeners: Record<string, any[]> = {};

  public addListener(eventName: string, fn: any): this {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  public on(eventName: string, fn: any): this {
    return this.addListener(eventName, fn);
  };


  public removeListener(eventName: string, fn: any): this {
    let lis = this.listeners[eventName];
    if (!lis) {
      return this;
    }

    for (let i = lis.length; i > 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }

  public off(eventName: string, fn: any): this {
    return this.removeListener(eventName, fn);
  };

  public once(eventName: string, fn: any): this {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    };
    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  public emit(eventName: string, ...args: any): boolean {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
      f(...args);
    });
    return true;
  }

  public listenerCount(eventName: string): number {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }

  public rawListeners(eventName: string) {
    return this.listeners[eventName];
  }
};


const emitter = new EventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

emitter.on('eventOne', c1); // Register for eventOne
emitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
emitter.once('eventOnce', () => console.log('eventOnce once fired'));
emitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
emitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));

emitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
emitter.emit('eventOnce');

emitter.emit('eventOne');
emitter.emit('init');
emitter.emit('init'); // Will not be fired
emitter.emit('eventOne');
emitter.emit('status', 200, 'ok');

// Get listener's count
console.log(emitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(emitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
emitter.off('eventOne', c1);
console.log(emitter.listenerCount('eventOne'));
emitter.off('eventOne', c2);
console.log(emitter.listenerCount('eventOne'));