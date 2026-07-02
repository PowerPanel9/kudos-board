import CardTile from '../CardTile/CardTile';
import './CardGrid.css';

function CardGrid({ cards, onDeleteCard, onUpvote, onAddCard }) {
  const hasCards = Boolean(cards && cards.length > 0)
  return (
    <div className="card-grid">
      {!hasCards && <p className="no-cards-message">No cards yet. Be the first to add one!</p>}
      {hasCards &&
        cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onUpvote={onUpvote}
          />
        ))}
      <button type="button" className="card-grid__add-tile" onClick={onAddCard} aria-label="Add card">
        +
      </button>
    </div>
  )
}

export default CardGrid;
