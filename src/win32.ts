import * as path from 'path';
export const win32 = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const cols = row.replace(/[\s]+/g, '\t').split('\t');
        return {
          fstype: cols[0],
          size: +cols[3] * 1024,
          used: (+cols[3] - +cols[1]) * 1024,
          avail: +cols[1] * 1024,
          pcent: Math.ceil(100 * (+cols[3] - +cols[1]) / +cols[3]) + '%',
          target: cols[2]
        };
      });
  };
  const exe = 'WMIC';
  const args = [
    'LOGICALDISK',
    'WHERE',
    'NOT SIZE=NULL',
    'GET',
    'NAME,',
    'DRIVETYPE,',
    'SIZE,',
    'FREESPACE'
  ];

  if (file) {
    const diskName = path.parse(path.resolve(file)).root.split('\\')[0];
    args[2] = `NOT SIZE=NULL AND NAME="${diskName}"`;
  }
  return { exe, args, parse };
};
