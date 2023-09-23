export class myEmitter {

  listeners: Record<string, Function[]> = {};

  public addListener(eventName: string, fn: Function): this {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  public on(eventName: string, fn: Function): this {
    return this.addListener(eventName, fn);
  };


  public removeListener(eventName: string, fn: Function): this {
    let lis = this.listeners[eventName];
    if (!lis) {
      return this;
    }

    for (let i = lis.length - 1; i > 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }
    return this;
  }

  public off(eventName: string, fn: Function): this {
    return this.removeListener(eventName, fn);
  };

  public once(eventName: string, fn: Function): this {
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
