import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './scss/index.scss'
import App from './app'
import { RecoilRoot } from 'recoil';

const { VITE_BASE_URL } = import.meta.env

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter basename={VITE_BASE_URL}>
        <App />
      </BrowserRouter>
    </RecoilRoot>
    
  </React.StrictMode>,
)
