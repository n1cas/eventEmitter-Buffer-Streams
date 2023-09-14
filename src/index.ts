import {emitter} from './EventEmitter-Buffer-Streams/task-1/eventEmitter';

console.log('kek');

const eventEmitter = new emitter();

// listen to the event
eventEmitter.on('myEvent', () => {
    console.log('Data Received');
});

console.log(eventEmitter.listeners);

// publish an event
eventEmitter.emit('myEvent');


