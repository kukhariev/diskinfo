import * as path from 'path';
export const win32 = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const [fstype, avail, target, size] = row.split(/\s+/g);
        return {
          fstype,
          size: +size,
          used: +size - +avail,
          avail: +avail,
          pcent: `${Math.ceil((100 * (+size - +avail)) / +size)}%`,
          target
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
