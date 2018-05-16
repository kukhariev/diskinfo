import { execFile } from 'child_process';
import { posix } from './posix';
import { win32 } from './win32';

const isWin = process.platform === 'win32';
export class DiskInfo {
  fstype: string;
  size: number;
  used: number;
  avail: number;
  pcent: any;
  target: string;
}
function diskinfo(file: string): Promise<DiskInfo>;
function diskinfo(): Promise<DiskInfo[]>;
function diskinfo(file?: string): Promise<DiskInfo | DiskInfo[]> {
  return new Promise((resolve, reject) => {
    const { exe, args, parse } = isWin ? win32(file) : posix(file);
    execFile(
      exe,
      args,
      { timeout: 0, encoding: 'utf8' },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject(new Error(stderr.trim()));
        } else {
          const data = parse(stdout);
          resolve(file ? data[0] : data);
        }
      }
    );
  });
}

export { diskinfo };
