import CardTile from '../CardTile/CardTile';
import './CardGrid.css';

function CardGrid({ cards, onDeleteCard, onUpvote, onAddCard, isAuthenticated = false }) {
  const hasCards = Boolean(cards && cards.length > 0)
  const emptyMessage = isAuthenticated
    ? 'No cards yet. Be the first to add one!'
    : 'No cards yet.'
  return (
    <div className="card-grid">
      {!hasCards && <p className="no-cards-message">{emptyMessage}</p>}
      {hasCards &&
        cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onUpvote={onUpvote}
            isAuthenticated={isAuthenticated}
          />
        ))}
      {isAuthenticated && (
        <button type="button" className="card-grid__add-tile" onClick={onAddCard} aria-label="Add card">
          +
        </button>
      )}
    </div>
  )
}

export default CardGrid;
