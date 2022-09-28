import { expect } from 'chai';
import { diskinfo } from '../src/';

describe('diskinfo', () => {
  it('should enumerate all file systems', async () => {
    const dfout = await diskinfo();
    expect(dfout[0]).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });

  it('should get current disk info (folder)', async () => {
    const dfout = await diskinfo('./');
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });

  it('should get current disk info (file)', async () => {
    const dfout = await diskinfo('package.json');
    expect(dfout).to.include.keys('fstype', 'size', 'used', 'avail', 'pcent', 'target');
  });

  it('should fails if file path is wrong', () => {
    diskinfo('NotExisting')
      .then(() => {
        throw new Error('Was not supposed to resolve!')
      })
      .catch((e) => {
        expect(e).to.be.an.instanceof(Error);
        expect(e.message).to.include('No such file or directory: "NotExisting"');
      })
  });
});
