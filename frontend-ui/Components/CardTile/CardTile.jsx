import './CardTile.css';

function CardTile({ card, onDelete, onUpvote, isAuthenticated = false }) {
  return (
    <div className="card-tile">
      {card.gifUrl && <img src={card.gifUrl} alt="Card gif" className="card-image" />}

      <div className="card-overlay">
        <div className="card-text-box">
          <p className="card-message">{card.message}</p>
          {card.author && <p className="card-author">- {card.author}</p>}
        </div>
      </div>

      <div className="card-actions">
        {isAuthenticated ? (
          <button className="upvote-btn" onClick={() => onUpvote(card.id)}>
            Upvote ({card.upvotes})
          </button>
        ) : (
          <span className="upvote-count">Upvotes: {card.upvotes}</span>
        )}
      </div>

      {isAuthenticated && (
        <button className="delete-btn" onClick={() => onDelete(card.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </div>
  );
}

export default CardTile;
