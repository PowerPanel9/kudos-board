import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import BoardGrid from '../board-components/BoardGrid'
import CreateBoardForm from '../board-components/CreateBoardForm'
import BoardPage from '../Components/BoardPage/BoardPage'
import Filter from '../Components/Filter';
import Header from '../Components/Header';
import Search from '../Components/Search';
import Login from '../Components/Login';
import { API_BASE_URL } from './config'
import { clearToken, getAuthHeaders, getToken, getUserIdFromToken } from './auth'
import './App.css'

function HomePage() {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const currentUserId = getUserIdFromToken()

  // Fetch boards from backend on component mount
  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        headers: {
          ...getAuthHeaders(),
        },
      })
      if (response.status === 401) {
        clearToken()
        navigate('/signin')
        return
      }
      const data = await response.json()
      setBoards(data)
    } catch (error) {
      console.error('Error fetching boards:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      })
      if (response.status === 401) {
        clearToken()
        navigate('/signin')
        return
      }
      if (response.ok) {
        setBoards((prev) => prev.filter((b) => b.id !== id))
      }
    } catch (error) {
      console.error('Error deleting board:', error)
    }
  }

  const handleCreate = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
      })
      if (response.status === 401) {
        clearToken()
        navigate('/signin')
        return
      }
      if (response.ok) {
        const newBoard = await response.json()
        setBoards((prev) => [newBoard, ...prev])
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  // Filter and search logic
  const term = searchTerm.trim().toLowerCase()
  const visibleBoards = boards.filter((b) => {
    const matchesSearch = !term || b.title.toLowerCase().includes(term)

    let matchesFilter = true
    if (activeFilter === 'All' || activeFilter === 'Recent') {
      matchesFilter = true
    } else if (activeFilter === 'Mine') {
      matchesFilter = currentUserId != null && b.ownerId === currentUserId
    } else {
      matchesFilter = b.category === activeFilter
    }

    return matchesSearch && matchesFilter
  })

  // Sort by date if "Recent" is selected
  const sortedBoards = activeFilter === 'Recent'
    ? [...visibleBoards].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6)
    : visibleBoards

  return (
    <div style={{ width: '100%', padding: 16, boxSizing: 'border-box' }}>
      <div className="toolbar">
        <div className="toolbar__left">
          <Filter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          <button
            type="button"
            className="create-board-btn"
            onClick={() => setShowForm(true)}
          >
            Create Board
          </button>
        </div>
        <div className="toolbar__right">
          <Search onSearch={setSearchTerm} />
        </div>
      </div>

      <BoardGrid
        boards={sortedBoards}
        onDeleteBoard={handleDelete}
        onAddBoard={() => setShowForm(true)}
        currentUserId={currentUserId}
      />

      {showForm && (
        <CreateBoardForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
    </div>
  )
}

function ProtectedRoute({ children }) {
  if (!getToken()) {
    return <Navigate to="/signin" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signin" element={getToken() ? <Navigate to="/" replace /> : <Login />} />
        <Route
          path="/"
          element={(
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/boards/:id"
          element={(
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          )}
        />
      </Routes>
      <footer className="app-footer">
        <span className="app-footer__title">Kudos Board</span>
        <span className="app-footer__team">Power Panel</span>
      </footer>
    </BrowserRouter>
  )
}

export default App;
