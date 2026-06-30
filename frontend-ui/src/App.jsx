import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BoardGrid from '../board-components/BoardGrid'
import CreateBoardForm from '../board-components/CreateBoardForm'
import BoardPage from '../Components/BoardPage/BoardPage'
import Filter from '../Components/Filter';
import Header from '../Components/Header';
import Search from '../Components/Search';
import './App.css'

// --- Mock data: varied image heights to show the Pinterest masonry effect ---
const INITIAL_BOARDS = [
  { id: 1, title: 'Team Wins', category: 'Celebration', author: 'John', imageUrl: 'https://picsum.photos/id/1015/400/600' },
  { id: 2, title: 'Thanks Crew', category: 'Thank You', author: 'Jane', imageUrl: 'https://picsum.photos/id/1025/400/300' },
  { id: 3, title: 'Stay Inspired', category: 'Inspiration', author: 'Sam', imageUrl: 'https://picsum.photos/id/1035/400/500' },
  { id: 4, title: 'Q3 Launch', category: 'Celebration', author: 'Lee', imageUrl: 'https://picsum.photos/id/1040/400/250' },
  { id: 5, title: 'Mentor Love', category: 'Thank You', author: 'Pat', imageUrl: 'https://picsum.photos/id/1050/400/650' },
  { id: 6, title: 'Big Dreams', category: 'Inspiration', author: 'Kim', imageUrl: 'https://picsum.photos/id/1060/400/400' },
  { id: 7, title: 'Shipped It', category: 'Celebration', author: 'Ana', imageUrl: 'https://picsum.photos/id/1062/400/550' },
  { id: 8, title: 'Kudos All', category: 'Thank You', author: 'Max', imageUrl: 'https://picsum.photos/id/1074/400/350' },
]

function HomePage() {
  const [boards, setBoards] = useState(INITIAL_BOARDS)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')

  const handleDelete = async (id) => {
    setBoards((prev) => prev.filter((b) => b.id !== id))
  }

  const handleCreate = async (data) => {
    const newBoard = {
      id: Math.max(0, ...boards.map((b) => b.id)) + 1,
      ...data,
      // fall back to a random image if none provided
      imageUrl: data.imageUrl || `https://picsum.photos/400/${400 + (boards.length % 3) * 100}`,
    }
    setBoards((prev) => [newBoard, ...prev])
    setShowForm(false)
  }

  // The filter tabs are currently visual-only — they highlight the active tab
  // but don't affect which boards show. Filtering will be wired up once the
  // backend is implemented.
  const term = searchTerm.trim().toLowerCase()
  const visibleBoards = boards.filter((b) => {
    return !term || b.title.toLowerCase().includes(term)
  })

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

      <BoardGrid boards={visibleBoards} onDeleteBoard={handleDelete} />

      {showForm && (
        <CreateBoardForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:id" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
