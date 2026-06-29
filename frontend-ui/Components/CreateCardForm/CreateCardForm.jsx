import { useState } from 'react';
import './CreateCardForm.css';

function CreateCardForm({ boardId, onSubmit, onCancel }) {
  const [message, setMessage] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardData = {
      message,
      gifUrl,
      author: author.trim() || undefined
    };

    onSubmit(cardData);

    // Reset form
    setMessage('');
    setGifUrl('');
    setAuthor('');
  };

  return (
    <form className="create-card-form" onSubmit={handleSubmit}>
      <h3>Create New Card</h3>

      <div className="form-field">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          placeholder="Write your kudos message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows="4"
        />
      </div>

      <div className="form-field">
        <label htmlFor="gifUrl">GIF URL *</label>
        <input
          id="gifUrl"
          type="url"
          placeholder="https://media.giphy.com/..."
          value={gifUrl}
          onChange={(e) => setGifUrl(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="author">Your Name (optional)</label>
        <input
          id="author"
          type="text"
          placeholder="Anonymous"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">Create Card</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CreateCardForm;
