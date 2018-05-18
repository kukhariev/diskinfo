export const posix = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const cells = row.replace(/[\s]+/g, '\t').split('\t');
        return {
          fstype: cells[0],
          size: +cells[1] * 1024,
          used: +cells[2] * 1024,
          avail: +cells[3] * 1024,
          pcent: cells[4],
          target: cells[5]
        };
      });
  };
  const args = file ? ['-kP', file] : ['-kP'];
  return { exe: 'df', args, parse };
};
