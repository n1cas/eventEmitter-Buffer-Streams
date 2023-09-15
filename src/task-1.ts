import { myEmitter } from "./EventEmitter-Buffer-Streams/task-1/myEventEmitter";

const emitter = new myEmitter();

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
  emitter.on('status', (code: any, msg: any) => console.log(`Got ${code} and ${msg}`));
  
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