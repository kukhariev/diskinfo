# diskinfo

cross-platform Node.js "df \-kP"

<!-- [![npm version][npm-image]][npm-url] -->
[![Build status][travis-image]][travis-url]
[![Build status][appveyor-image]][appveyor-url]

## Install

```sh
npm install --save @dropb/diskinfo
```

## Usage

```js
// JS example (Windows)

const { diskinfo } = require('@dropb/diskinfo');

diskinfo().then(result => {
  console.log(result);
});
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
  }
];*/
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

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@dropb/diskinfo.svg
[npm-url]: https://www.npmjs.com/package/@dropb/diskinfo
[travis-image]: https://img.shields.io/travis/kukhariev/diskinfo/master.svg
[travis-url]: https://travis-ci.org/kukhariev/diskinfo
[appveyor-image]:https://ci.appveyor.com/api/projects/status/github/kukhariev/diskinfo
[appveyor-url]: https://ci.appveyor.com/project/kukhariev/diskinfo
