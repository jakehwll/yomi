const fetcher = (url: string) => fetch(url).then((r) => r.json())

const fetchPost = (url: string, query: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: query,
  }).then((r) => r.json())

export default fetcher
export { fetchPost }
