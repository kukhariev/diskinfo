export const posix = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const cols = row.replace(/[\s]+/g, ' ').split(' ');
        return {
          fstype: cols[0],
          size: +cols[1] * 1024,
          used: +cols[2] * 1024,
          avail: +cols[3] * 1024,
          pcent: cols[4],
          target: cols[5]
        };
      });
  };
  const args = file ? ['-kP', file] : ['-kP'];
  return { exe: 'df', args, parse };
};
