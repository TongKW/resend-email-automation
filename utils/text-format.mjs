export function replacePlaceholders(text, args) {
  return text.replace(/\$\{(.*?)\}/g, (match, variable) => {
    return args[variable] !== undefined ? args[variable] : match;
  });
}
