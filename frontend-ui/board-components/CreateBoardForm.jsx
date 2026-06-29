import { useState } from 'react'
import './CreateBoardForm.css'

const CATEGORIES = ['Celebration', 'Thank You', 'Inspiration']

/**
 * CreateBoardForm — modal form for creating a new board.
 *
 * Props:
 *   onSubmit — function: called with { title, category, author, imageUrl }
 *   onCancel — function: called when the user cancels / closes the modal
 *
 * State: controlled values for title, category, author, imageUrl.
 */
function CreateBoardForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Celebration')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Title and category are required per the spec.
    if (!title.trim() || !category) return
    await onSubmit({
      title: title.trim(),
      category,
      author: author.trim(),
      imageUrl: imageUrl.trim(),
    })
  }

  return (
    <div className="create-board__backdrop" onClick={onCancel}>
      <form
        className="create-board"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="create-board__heading">Create a New Board</h2>

        <label className="create-board__label">
          <span className="create-board__label-text">
            Title <span className="create-board__required">*</span>
          </span>
          <input
            type="text"
            className="create-board__input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Team Wins"
            required
          />
        </label>

        <label className="create-board__label">
          <span className="create-board__label-text">
            Category <span className="create-board__required">*</span>
          </span>
          <select
            className="create-board__input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="create-board__label">
          <span className="create-board__label-text">Author</span>
          <input
            type="text"
            className="create-board__input"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Optional"
          />
        </label>

        <label className="create-board__label">
          <span className="create-board__label-text">Image URL</span>
          <input
            type="text"
            className="create-board__input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <div className="create-board__actions">
          <button
            type="button"
            className="create-board__btn create-board__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="create-board__btn create-board__btn--submit"
          >
            Create Board
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBoardForm
