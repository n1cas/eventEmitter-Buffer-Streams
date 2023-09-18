import csvtojson from 'csvtojson';
import fs from 'fs';
import path from 'path';

const pathReadStream = path.resolve('src', 'EventEmitter-Buffer-Streams', 'task-3', 'csvdirectory', 'nodejs-hw1-ex1.csv')
const pathWriteStream = path.resolve('src', 'EventEmitter-Buffer-Streams', 'task-3', 'txtdirectory','txtfile.txt')


const readStream = fs.createReadStream(pathReadStream);
const writeStream = fs.createWriteStream(pathWriteStream);

csvtojson().fromStream(readStream).on('data', (data)=> {
  console.log(data.toString());

  writeStream.write(data);
}).on('end', ()=> {
  console.log('done');
}).on('error',(error)=>{
  console.log(error);
})