import localforage from "localforage";

const fetcher = (url, { query = null, method = 'GET', body = null }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const requestInfo = {
        method,
        headers: {}
      }

      const token = await localforage.getItem('token')

      if (token !== null) {
        requestInfo.headers['Authorization'] = `Bearer ${token}`
      }
    
      if (query !== null) {
        query = new URLSearchParams(query).toString();
        url += `?${query}`
      }
      
      if (body !== null && method !== 'GET') {
        body.forEach((value, key, _body) => {
          if (!value) _body.delete(key);
        })
        body = Object.fromEntries(body);
        requestInfo.body = JSON.stringify(body)
        requestInfo.headers["Content-Type"] = "application/json"
      }
  
      return resolve(fetch(url, requestInfo))
      
    } catch (error) {
      return reject(error)
    }
  })
}

export default fetcher