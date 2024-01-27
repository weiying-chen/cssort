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
