
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
)
