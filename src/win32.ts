import * as path from 'path';
export const win32 = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const cells = row.replace(/\s+/g, '\t').split('\t');
        return {
          fstype: cells[0],
          size: +cells[3],
          used: +cells[3] - +cells[1],
          avail: +cells[1],
          pcent: Math.ceil((100 * (+cells[3] - +cells[1])) / +cells[3]) + '%',
          target: cells[2]
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
