import { Link } from 'react-router-dom'
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
function BoardCard({ board, onDelete }) {
  const { id, title, imageUrl, category } = board

  const handleDelete = async (e) => {
    // Stop the click from bubbling up to the card link.
    e.preventDefault()
    e.stopPropagation()
    await onDelete(id)
  }

  return (
    <article className="board-card">
      <div className="board-card__media">
        <img
          className="board-card__image"
          src={imageUrl}
          alt={title}
          loading="lazy"
        />

        {/* Greyed-out overlay + actions, revealed on hover */}
        <div className="board-card__overlay">
          <button
            type="button"
            className="board-card__delete"
            onClick={handleDelete}
            aria-label={`Delete board ${title}`}
          >
            Delete
          </button>

          <Link to={`/boards/${id}`} className="board-card__view">
            View Board
          </Link>
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
