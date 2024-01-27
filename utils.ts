export function cssToObj(css: string): Record<string, string | number> {
  css = css.replace(/^{([\s\S]*)}$/, '$1').trim();

  const rules = css.split(';');

  return rules.reduce((acc, rule) => {
    const [prop, value] = rule.split(':').map((part) => part.trim());

    if (prop && value) {
      const camelCaseProp = prop.replace(/-\w/g, (match) =>
        match[1].toUpperCase(),
      );
      acc[camelCaseProp] = /^\d+$/.test(value) ? parseInt(value, 10) : value;
    }

    return acc;
  }, {});
}

export function objToCSS(obj: Record<string, string>): string {
  const css = Object.entries(obj)
    .map(([key, value]) => {
      const kebabCaseKey = key.replace(
        /[A-Z]/g,
        (match) => '-' + match.toLowerCase(),
      );
      return `${kebabCaseKey}: ${value};`;
    })
    .join(' ');

  return `{ ${css} }`;
}

export function objToLines(obj: Record<string, string | number>, indent = 2) {
  const indentSpace = ' '.repeat(indent);

  return Object.keys(obj)
    .map((key) => {
      const value = typeof obj[key] === 'number' ? obj[key] : `'${obj[key]}'`;

      return `${indentSpace}${key}: ${value}`;
    })
    .join(',\n');
}

export function getIndent(lines: string[]) {
  if (lines.length === 0) return 0;

  const leadingWhitespace = lines[0].match(/^\s*/);

  return leadingWhitespace ? leadingWhitespace[0].length : 0;
}
