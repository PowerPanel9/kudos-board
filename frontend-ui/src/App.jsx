import { useState } from 'react'
import './App.css'
import CardGrid from '../Components/CardGrid/CardGrid'
import CreateCardForm from '../Components/CreateCardForm/CreateCardForm'

const mockCards = [
  {
    id: 1,
    message: "Amazing presentation today! Your insights on the project were really helpful.",
    gifUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=500",
    author: "Sarah",
    upvotes: 12
  },
  {
    id: 2,
    message: "Thanks for helping me debug that issue!",
    gifUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300",
    author: "Mike",
    upvotes: 8
  },
  {
    id: 3,
    message: "Your dedication to the team is incredible. We're lucky to have you!",
    gifUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=450",
    author: "Emma",
    upvotes: 15
  },
  {
    id: 4,
    message: "Great job on the code review!",
    gifUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=350",
    author: "Alex",
    upvotes: 6
  },
  {
    id: 5,
    message: "You're awesome! Keep up the great work!",
    gifUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600",
    author: "Jordan",
    upvotes: 20
  },
  {
    id: 6,
    message: "Thank you for always being willing to help others learn. Your patience and kindness make such a difference.",
    gifUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=280",
    author: "Taylor",
    upvotes: 11
  },
  {
    id: 7,
    message: "Your positive attitude makes every day better!",
    gifUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=550",
    author: "Casey",
    upvotes: 9
  },
  {
    id: 8,
    message: "Congrats on shipping that feature!",
    gifUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=320",
    author: "Riley",
    upvotes: 14
  },
  {
    id: 9,
    message: "Team player of the month!",
    gifUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400",
    author: "Quinn",
    upvotes: 7
  }
]

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleDelete = (id) => console.log('Delete card:', id)
  const handleUpvote = (id) => console.log('Upvote card:', id)
  const handleSubmit = (data) => {
    console.log('Submit card:', data)
    setShowCreateForm(false)
  }
  const handleCancel = () => setShowCreateForm(false)

  return (
    <div className="App" style={{ background: '#f7f7f7', minHeight: '100vh', padding: '2rem', paddingTop: '6rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="add-card-btn-main"
            style={{
              padding: '0.6rem 1.5rem',
              background: '#aa3bff',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(170, 59, 255, 0.3)',
              transition: 'transform 0.2s, background 0.2s, box-shadow 0.2s'
            }}
          >
            Add Card
          </button>
        </div>

        <CardGrid cards={mockCards} onDeleteCard={handleDelete} onUpvote={handleUpvote} />
      </div>

      {showCreateForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={handleCancel}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreateCardForm boardId={1} onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
