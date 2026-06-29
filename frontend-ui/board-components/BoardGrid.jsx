import BoardCard from './BoardCard'
import './BoardGrid.css'

/**
 * BoardGrid — Pinterest-style masonry container that renders all board cards.
 * Cards flow into responsive columns; because each BoardCard's height follows
 * its image, the layout packs like a Pinterest feed.
 *
 * Props:
 *   boards       — array of board objects
 *   onDeleteBoard — function: passed through to each BoardCard's onDelete
 */
function BoardGrid({ boards, onDeleteBoard }) {
  if (!boards || boards.length === 0) {
    return <p className="board-grid__empty">No boards yet — create one to get started!</p>
  }

  return (
    <div className="board-grid">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} onDelete={onDeleteBoard} />
      ))}
    </div>
  )
}

export default BoardGrid
