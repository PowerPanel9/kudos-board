const FILTER_OPTIONS = ['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'];

function Filter({ activeFilter, onFilterChange }) {
  return (
    <nav className="filter-nav" aria-label="Card filters">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter-button ${activeFilter === option ? 'filter-button--active' : ''}`}
          onClick={() => onFilterChange(option)}
        >
          {option}
        </button>
      ))}
    </nav>
  );
}

export default Filter;