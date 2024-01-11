function createFetchInstance(
  baseUrl?: string,
): (path: RequestInfo, init?: RequestInit) => Promise<Response> {
  return async function (path: RequestInfo, init?: RequestInit): Promise<Response> {
    if (!baseUrl) {
      return fetch(path, init)
    }

    let url: string | Request
    if (typeof path === 'string') {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        url = path
      } else {
        url = new URL(path, baseUrl).toString()
      }
    } else {
      url = path
    }
    return fetch(url, init)
  }
}

const instance = createFetchInstance(process.env.NEXT_PUBLIC_HOST)

export default instance
