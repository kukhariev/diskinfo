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
const { diskinfo } = require('@dropb/diskinfo');

diskinfo().then(result => {
  console.log(result);
/*
[{
  fstype: 'udev',
  size: 1999568896,
  used: 0,
  avail: 1999568896,
  pcent: '0%',
  target: '/dev'
},
{
  fstype: 'tmpfs',
  size: 404099072,
  used: 15040512,
  avail: 389058560,
  pcent: '4%',
  target: '/run'
},
{
  fstype: '/dev/sda5',
  size: 107569381376,
  used: 100433367040,
  avail: 1648140288,
  pcent: '99%',
  target: '/'
},
 ...
*/
});
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@dropb/diskinfo.svg
[npm-url]: https://www.npmjs.com/package/@dropb/diskinfo
[travis-image]: https://img.shields.io/travis/kukhariev/diskinfo/master.svg
[travis-url]: https://travis-ci.org/kukhariev/diskinfo
[appveyor-image]:https://ci.appveyor.com/api/projects/status/github/kukhariev/diskinfo
[appveyor-url]: https://ci.appveyor.com/project/kukhariev/diskinfo
