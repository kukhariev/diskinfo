import { execFile } from 'child_process';
import { existsSync } from 'fs';
import { posix } from './posix';
import { win32 } from './win32';

/**
 * Info of the filesystem
 * @public
 */
export interface DiskInfo {
  /**
   * POSIX - File system type
   *
   * Win32 - Win32_LogicalDisk DriveType(as `String`!):
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

/**
 * @param file - get info of the filesystem containing the specified file or directory
 * @returns promise for an object with the info for the specified file or directory
 * @public
 */
function diskinfo(file: string): Promise<DiskInfo>;

/**
 * @returns promise for an array with the info for all mounted filesystem
 * @public
 */
function diskinfo(): Promise<DiskInfo[]>;

function diskinfo(file?: string): Promise<DiskInfo | DiskInfo[]> {
  return new Promise((resolve, reject) => {
    const isWin = process.platform === 'win32';
    if (file && !existsSync(file)) {
      reject(new Error(`No such file or directory: \`${file}\``));
    }
    const { exe, args, parse } = isWin ? win32(file) : posix(file);
    execFile(exe, args, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(new Error(stderr.trim() || error.message));
      } else {
        const info = parse(stdout);
        resolve(file ? info[0] : info);
      }
    });
  });
}

export { diskinfo };
