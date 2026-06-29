import CardTile from '../CardTile/CardTile';
import './CardGrid.css';

function CardGrid({ cards, onDeleteCard, onUpvote }) {
  return (
    <div className="card-grid">
      {cards.length === 0 ? (
        <p className="no-cards-message">No cards yet. Be the first to add one!</p>
      ) : (
        cards.map((card) => (
          <CardTile
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onUpvote={onUpvote}
          />
        ))
      )}
    </div>
  )
}

export default CardGrid;
