export function decode(value: string): string {
  const buff = Buffer.from(value, 'base64');

  return buff.toString('utf-8');
}

export function encode(value: string): string {
  return window.btoa(unescape(encodeURIComponent(value)));
}
