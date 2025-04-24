
import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import AppRouter from './routes/AppRouter'



function App() {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}

export default App
