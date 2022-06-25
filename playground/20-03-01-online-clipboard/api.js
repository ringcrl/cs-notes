export default function getApi() {
  const isProd = !location.href.includes('localhost');
  if (isProd) {
    return '';
  }

  return 'http://localhost:2333';
}
