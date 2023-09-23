import axios from "axios";
import { myEmitter } from "../task-1/myEventEmitter";

export class WithTime extends myEmitter {
  async execute(asyncFunction: any, ...args: any): Promise<any> {
    this.emit('begin');
    console.log('Execution started');

    try {
      const startTime = Date.now();
      const data = await asyncFunction(...args);
      const endTime = Date.now();
      const timeTaken = endTime - startTime;

      this.emit('end', timeTaken);
      console.log(`Execution completed in ${timeTaken} ms`);

      if (data) {
        const jsonData = JSON.stringify(data);
        this.emit('data', jsonData);
        console.log('Data emitted:', jsonData);
      }
    } catch (error) {
      this.emit('error', error);
      console.error('Error occurred:', error);
    }
  }
}

export function fetchDataFromUrl(url: string): Promise<unknown> {
  return axios.get(url)
    .then((response: any) => response.data)
    .catch((error) => {
      throw error;
    });
}
