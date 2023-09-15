import csvtojson from 'csvtojson';
import fs from 'fs';

const PATH = './src/EventEmitter-Buffer-Streams/task-3'

const readStream = fs.createReadStream(PATH+'/csvdirectory/nodejs-hw1-ex1.csv');
const writeStream = fs.createWriteStream(PATH+'/txtdirectory/txtfile.txt');

csvtojson().fromStream(readStream).on('data', (data)=> {
  console.log(data);

  writeStream.write(data);
}).on('end', ()=> {
  console.log('done');
}).on('error',(error)=>{
  console.log(error);
})