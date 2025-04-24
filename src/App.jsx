import './App.css'
import { AuthProvider } from './context/auth/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  )
}

export default App