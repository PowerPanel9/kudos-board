import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardGrid from '../CardGrid/CardGrid';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import { API_BASE_URL } from '../../src/config';
import { clearToken, getAuthHeaders } from '../../src/auth';
import './BoardPage.css';

const BoardPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateCardForm, setShowCreateCardForm] = useState(false);

    useEffect(() => {
        const fetchBoardAndCards = async () => {
            try {
                const boardResponse = await fetch(`${API_BASE_URL}/boards/${id}`, {
                    headers: {
                        ...getAuthHeaders()
                    }
                });
                if (boardResponse.status === 401) {
                    clearToken();
                    navigate('/signin');
                    return;
                }
                const boardData = await boardResponse.json();
                setBoard(boardData);

                const cardsResponse = await fetch(`${API_BASE_URL}/cards?boardId=${id}`, {
                    headers: {
                        ...getAuthHeaders()
                    }
                });
                if (cardsResponse.status === 401) {
                    clearToken();
                    navigate('/signin');
                    return;
                }
                const cardsData = await cardsResponse.json();
                setCards(cardsData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchBoardAndCards();
    }, [id, navigate]);

    const handleDeleteCard = async (cardId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeaders()
                }
            });
            if (response.status === 401) {
                clearToken();
                navigate('/signin');
                return;
            }
            setCards(cards.filter(card => card.id !== cardId));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleUpvote = async (cardId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeaders()
                }
            });
            if (response.status === 401) {
                clearToken();
                navigate('/signin');
                return;
            }
            const updatedCard = await response.json();
            setCards(cards.map(card =>
                card.id === cardId ? updatedCard : card
            ));
        } catch (error) {
            console.error('Error upvoting card:', error);
        }
    };

    const handleSubmitCard = async (cardData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ ...cardData, boardId: id })
            });
            if (response.status === 401) {
                clearToken();
                navigate('/signin');
                return;
            }
            const newCard = await response.json();
            setCards([...cards, newCard]);
            setShowCreateCardForm(false);
        } catch (error) {
            console.error('Error creating card:', error);
        }
    };

    const handleCancelCard = () => {
        setShowCreateCardForm(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="board-page">
            <div className="board-header">
                <div>
                    <h1>{board.title}</h1>
                    <p className="board-category">{board.category}</p>
                    {board.author && <p className="board-author">Created by: {board.author}</p>}
                </div>
                <button
                    className="add-card-btn"
                    onClick={() => setShowCreateCardForm(!showCreateCardForm)}
                >
                    {showCreateCardForm ? 'Cancel' : 'Add Card'}
                </button>
            </div>

            {showCreateCardForm && (
                <CreateCardForm
                    boardId={id}
                    onSubmit={handleSubmitCard}
                    onCancel={handleCancelCard}
                />
            )}

            <CardGrid
                cards={cards}
                onDeleteCard={handleDeleteCard}
                onUpvote={handleUpvote}
            />
        </div>
    );
};

export default BoardPage;