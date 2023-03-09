export default function createUrl(endpoint: string) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://app.kudoku.id'
      : 'http://localhost:3000';

  return new URL(endpoint, host);
}
