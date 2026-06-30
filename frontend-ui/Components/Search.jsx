import { useState } from 'react'

function Search({ onSearch }) {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(value)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <button className="search-bar__button" type="submit" aria-label="Search">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search boards..."
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
          onSearch(event.target.value)
        }}
      />
    </form>
  )
}

export default Search
