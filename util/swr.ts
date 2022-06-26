/**
 * Returns a fetched URLs JSON output.
 * @param url
 * @returns
 */
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default fetcher
