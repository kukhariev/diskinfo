export const posix = (file: string) => {
  const parse = (stdout: string) => {
    return stdout
      .trim()
      .split('\n')
      .slice(1)
      .map(row => {
        const [first, target] = row.split(/%\s+/);
        const [fstype, size, used, avail, pcent] = first.split(/\s+/);
        return {
          fstype,
          size: +size * 1024,
          used: +used * 1024,
          avail: +avail * 1024,
          pcent,
          target
        };
      });
  };
  const args = file ? ['-kP', file] : ['-kP'];
  return { exe: 'df', args, parse };
};
