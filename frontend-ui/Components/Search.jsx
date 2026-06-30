import PropTypes from 'prop-types'

function Search({ value, onChange, onSubmit, onClear }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        className="search-barInput"
        type="text"

        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="search-barButton" type="submit">
        Search
      </button>
      <button className="search-barButton search-barButton--secondary" type="button" onClick={onClear}>
        Clear
      </button>
    </form>
  )
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default Search
