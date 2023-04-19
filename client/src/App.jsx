import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <figure>
        <figcaption>Example DOM structure diagram</figcaption>
        <ul class="tree">
          <li><code>html</code>
            <ul>
              <li><code>head</code>
                <ul>
                  <li><code>title</code></li>
                </ul>
              </li>
              <li><code>body</code>
                <ul>
                  <li><code>header</code>
                    <ul>
                      <li><code>h1</code></li>
                      <li><code>p</code></li>
                    </ul>
                  </li>
                  <li><code>nav</code>
                    <ul>
                      <li><code>a</code></li>
                      <li><code>a</code></li>
                      <li><code>a</code></li>
                      <li><code>a</code></li>
                    </ul>
                  </li>
                  <li><code>main</code>
                    <ul>
                      <li><code>h1</code></li>
                      <li><code>article</code>
                        <ul>
                          <li><code>h2</code></li>
                          <li><code>p</code></li>
                          <li><code>p</code></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><code>aside</code>
                    <ul>
                      <li><code>h2</code></li>
                      <li><code>p</code></li>
                      <li><code>p</code>
                        <ul>
                          <li><code>a</code></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><code>footer</code>
                    <ul>
                      <li><code>nav</code>
                        <ul>
                          <li><code>a</code></li>
                          <li><code>a</code></li>
                          <li><code>a</code></li>
                          <li><code>a</code></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </figure>
    </div>
  )
}

export default App
