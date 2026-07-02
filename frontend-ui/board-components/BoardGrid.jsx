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
 *   onAddBoard   — function: opens the create-board form
 */
function BoardGrid({ boards, onDeleteBoard, onAddBoard }) {
  const hasBoards = Boolean(boards && boards.length > 0)
  return (
    <div className={`board-grid ${hasBoards ? '' : 'board-grid--empty'}`.trim()}>
      {hasBoards ? (
        <>
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} onDelete={onDeleteBoard} />
          ))}
          <button type="button" className="board-grid__add-tile" onClick={onAddBoard} aria-label="Add board">
            +
          </button>
        </>
      ) : (
        <>
          <p className="board-grid__empty">No boards found. Try another search, or create one below.</p>
          <button type="button" className="board-grid__add-tile" onClick={onAddBoard} aria-label="Add board">
            +
          </button>
        </>
      )}
    </div>
  )
}

export default BoardGrid
