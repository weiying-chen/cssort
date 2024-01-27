export function cssToObj(css: string): Record<string, string> {
  const obj = {};
  const rules = css.split(';');

  rules.forEach((rule) => {
    const [prop, value] = rule.split(':').map((part) => part.trim());
    if (prop && value) {
      const camelCaseProp = prop.replace(/-\w/g, (match) =>
        match[1].toUpperCase(),
      );
      obj[camelCaseProp] = value;
    }
  });

  return obj;
}

export function objToCSS(obj: Record<string, string>): string {
  let css = '';

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const kebabCaseKey = key.replace(
        /[A-Z]/g,
        (match) => '-' + match.toLowerCase(),
      );

      css += `${kebabCaseKey}: ${obj[key]}; `;
    }
  }

  return css.trim();
}

export function objToIndented(
  obj: Record<string, string | number>,
  indent = 2,
) {
  const indentSpace = ' '.repeat(indent);

  return Object.keys(obj)
    .map((key) => {
      const value = typeof obj[key] === 'number' ? obj[key] : `'${obj[key]}'`;

      return `${indentSpace}${key}: ${value}`;
    })
    .join(',\n');
}

export function getIndentation(lines: string[]) {
  if (lines.length === 0) return 0;

  const leadingWhitespace = lines[0].match(/^\s*/);

  return leadingWhitespace ? leadingWhitespace[0].length : 0;
}
