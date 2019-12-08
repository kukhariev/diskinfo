import { expect } from 'chai';
import { diskinfo } from '../src/';

describe(`${diskinfo.name} test:\n`, () => {
  it('should enumerate all file systems', async () => {
    const dfout = await diskinfo();
    console.log(dfout);
    expect(dfout[0]).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('should get current disk info (folder)', async () => {
    const dfout = await diskinfo('./');
    console.log(dfout);
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('should get current disk info (file)', async () => {
    const dfout = await diskinfo('package.json');
    console.log(dfout);
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });
  it('should fails if file path is wrong', async () => {
    let error: Error;
    try {
      const dfout = await diskinfo('NotExisting');
    } catch (err) {
      error = err;
    }
    expect(error).to.be.an.instanceof(Error);
    expect(error.message).to.have.lengthOf.at.least(3);
    console.log(error.message);
  });
});
