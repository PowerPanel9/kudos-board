import { useNavigate } from 'react-router-dom'
import './BoardCard.css'

/**
 * BoardCard — displays a single board with its image/gif, title, and category.
 * Pinterest-inspired: the card's height follows the natural aspect ratio of the
 * image, the title/category sit at the bottom of the image with no border, and
 * the "View Board" / "Delete" actions plus a greyed overlay appear on hover.
 *
 * Props:
 *   board    — object: { id, title, imageUrl, category, author }
 *   onDelete — function: called with the board id when the delete button is clicked
 */
function BoardCard({ board, onDelete, canDelete = false }) {
  const { id, title, imageUrl, category } = board
  const navigate = useNavigate()

  const openBoard = () => {
    navigate(`/boards/${id}`)
  }

  const handleDelete = async (e) => {
    // Stop the click from bubbling up to the card link.
    e.preventDefault()
    e.stopPropagation()
    await onDelete(id)
  }

  return (
    <article
      className="board-card"
      role="button"
      tabIndex={0}
      onClick={openBoard}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openBoard()
        }
      }}
      aria-label={`Open board ${title}`}
    >
      <div className="board-card__media">
        <img
          className="board-card__image"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />

        {/* Greyed-out overlay + actions, revealed on hover */}
        <div className="board-card__overlay">
          <div className="board-card__actions">
            <button
              type="button"
              className="board-card__view"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                openBoard()
              }}
            >
              View
            </button>
            {canDelete && (
              <button
                type="button"
                className="board-card__delete"
                onClick={handleDelete}
                aria-label={`Delete board ${title}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Title + category sit at the bottom of the image, borderless */}
      <div className="board-card__caption">
        <h3 className="board-card__title">{title}</h3>
        <span className="board-card__category">{category}</span>
      </div>
    </article>
  )
}

export default BoardCard
