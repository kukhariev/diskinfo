import { execFile } from 'child_process';
import { posix } from './posix';
import { win32 } from './win32';
export interface DiskInfo {
  /**
   * POSIX - File system type
   *
   * Win32 - DriveType:
   * - "0": Unknown
   * - "1": No Root Directory
   * - "2": Removable Disk
   * - "3": Local Disk
   * - "4": Network Drive
   * - "5": Compact Disc
   * - "6": RAM Disk
   */
  fstype: string;
  /**
   * Total size in bytes
   */
  size: number;
  /**
   * Used size in bytes
   */
  used: number;
  /**
   * Available size in bytes
   */
  avail: number;
  /**
   * Percentage of used divided by size
   */
  pcent: string;
  /**
   * Mount point
   */
  target: string;
}

function diskinfo(file: string): Promise<DiskInfo>;
function diskinfo(): Promise<DiskInfo[]>;
function diskinfo(file?: string): Promise<DiskInfo | DiskInfo[]> {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === 'win32';
    const { exe, args, parse } = isWin ? win32(file) : posix(file);
    execFile(exe, args, { timeout: 1000 }, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(new Error(stderr.trim() || error.message || 'undefined error' ));
      } else {
        const info = parse(stdout);
        resolve(file ? info[0] : info);
      }
    });
  });
}

export { diskinfo };
