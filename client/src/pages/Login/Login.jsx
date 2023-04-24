import { useCallback, useEffect, useState } from "react"
import localforage from 'localforage'
import { useNavigate } from "react-router-dom";
import fetcher from "../../utils/fetcher";

function Login() {
  const [loading, setLoading] = useState(false)

  const handleLogin = useCallback(e => {
    e.preventDefault();

    setLoading(true)

    const body = new FormData(e.target);
   
    fetcher('/api/v1/login', {
      method: 'POST',
      body,
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        if (res.error) throw res;
        localforage.setItem('token', res.data.accessToken).then(() => {
          window.location.reload();
        })

      })
      .catch(e => {
        alert(e.message)
      })
      .finally(setLoading(false))

  })

  const navigate = useNavigate();
  useEffect(() => {
    localforage.getItem('token').then((token) => {
      if (!token) return;
      navigate('/')
    })
  }, [])

  return (
    <>
      <section className="flex flex-col h-screen items-center justify-center bg-slate-200">
        <form method="POST" action="/api/v1/login" onSubmit={handleLogin} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2"
              name="username"
              required
              placeholder="admin"
              autoCapitalize="off"
              autoComplete="off"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full h-10 rounded-lg px-4 outline-1 outline-blue-400 border-2 tracking-widest"
              name="password"
              required
              placeholder="123456"
              autoCapitalize="off"
              autoComplete="off"
              type="password"
            />
          </div>
          <div className="flex flex-col space-y-4 items-center justify-between">
            <button
              className={'w-full h-10 py-px px-8 rounded-full uppercase text-sm text-white font-semibold bg-blue-600'}
              type="submit">
              submit
            </button>
            <button
              className={'w-full h-10 py-px px-8 rounded-full uppercase text-sm text-white font-semibold bg-red-600'}
              type="submit">
              reset
            </button>
          </div>
        </form>
      </section>
      {loading && (
        <div className="absolute z-10 bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <h1 className="uppercase text-center text-white text-9xl">loading</h1>
        </div>
      )}
    </>
  )
}

export default Login