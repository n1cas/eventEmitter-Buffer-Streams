import { WithTime, fetchDataFromUrl } from "./EventEmitter-Buffer-Streams/task-2/withTime";

const withTime = new WithTime();


withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

console.log(withTime.rawListeners("end"));

withTime.execute(fetchDataFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');
