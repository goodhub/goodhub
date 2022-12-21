import { rm } from 'fs/promises';
import temp from 'temp';
const { mkdir, mkdirSync } = temp.track();
import { v4 } from 'uuid';


export interface File {
  path: string
}

export class WorkingFolder {
  path: string;
  constructor (path: string) {
    this.path = path;
  }

  cleanup = async () => {
    await rm(this.path, { recursive: true, force: true })
  }

  file = () => {
    return {
      path: `${this.path}/${v4()}`
    }
  }

  static init = async () => {
    const path = await WorkingFolder.makeTempFolder();
    return new WorkingFolder(path);
  }

  static makeTempFolder = async () => {
    return new Promise<string>((resolve, reject) => {
      mkdir('image-processing', (err, path) => {
        if (err) reject(err);
        resolve(path);
      })
    })
  }
  static makeTempFolderSync = () => {
    return mkdirSync('image-processing');
  }
}
