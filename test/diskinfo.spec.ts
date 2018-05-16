import { expect } from 'chai';
import { diskinfo } from '../src/';

describe(`${diskinfo.name} test:\n`, () => {
  it('should enumerate file systems', async () => {
    const dfout = await diskinfo();
    console.log(dfout);
    expect(dfout[0]).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('async -> target', async () => {
    const dfout = await diskinfo('./');
    console.log(dfout);
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('async -> file', async () => {
    const dfout = await diskinfo('package.json');
    console.log(dfout);
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('should fails if target is bad', async () => {
    try {
      const dfout = await diskinfo('I`mNotExist');
    } catch (error) {
      expect(error).to.be.an.instanceof(Error);
      console.log(error.message);
    }
  });
});
