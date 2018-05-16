# diskinfo

>Disk usage info on both *nix (via `df`) and Windows (via `WMIC`) systems

<!-- [![npm version][npm-image]][npm-url] -->
[![Build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]

## Install

```sh
npm install @dropb/diskinfo
```

## Usage

```js
// JS example (Windows)

const { diskinfo } = require('@dropb/diskinfo');

diskinfo().then(result => console.log(result));
/* OUTPUT:
[{
    fstype: '3',
    size: 189879426220032,
    used: 53218675523584,
    avail: 136660750696448,
    pcent: '29%',
    target: 'C:'
  },
  {
    fstype: '2',
    size: 16431471132672,
    used: 4540711567360,
    avail: 11890759565312,
    pcent: '28%',
    target: 'F:'
  },
  {
    fstype: '4',
    size: 110151046529024,
    used: 108627465601024,
    avail: 1523580928000,
    pcent: '99%',
    target: 'V:'
  }]
*/
```

```ts
// Typescript example (Ubuntu)

import { diskinfo, DiskInfo } from '@dropb/diskinfo';

async function run() {
  const result: DiskInfo = await diskinfo('./');
  console.log(result)
}
run();
/* OUTPUT:
{ fstype: '/dev/sda1',
  size: 47242534912,
  used: 21033943040,
  avail: 23785177088,
  pcent: '47%',
  target: '/' }
*/

```

## API

```ts
declare function diskinfo(file: string): Promise<DiskInfo>;
declare function diskinfo(): Promise<DiskInfo[]>;

interface DiskInfo {
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
```

## License

[MIT](LICENSE)

## Links

* [df](https://www.gnu.org/software/coreutils/manual/html_node/df-invocation.html)
* [Win32_LogicalDisk WMI class](https://msdn.microsoft.com/en-us/library/windows/desktop/aa394173(v=vs.85).aspx)

[npm-image]: https://img.shields.io/npm/v/@dropb/diskinfo.svg
[npm-url]: https://www.npmjs.com/package/@dropb/diskinfo
[travis-image]: https://img.shields.io/travis/kukhariev/diskinfo/master.svg
[travis-url]: https://travis-ci.org/kukhariev/diskinfo
[appveyor-image]:https://ci.appveyor.com/api/projects/status/github/kukhariev/diskinfo
[appveyor-url]: https://ci.appveyor.com/project/kukhariev/diskinfo
