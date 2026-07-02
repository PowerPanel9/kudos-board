import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { clearToken, getDisplayName, getNameFromToken, getToken } from '../src/auth';

const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = Boolean(getToken());
    const name = getDisplayName() || getNameFromToken();

    const handleLogout = () => {
        clearToken();
        navigate('/signin');
    };

    return (
        <header className='header'>
            <Link to="/" className='header-link'>
                <h1 className='header-title'>KUDOS</h1>
            </Link>
            {isAuthenticated && (
                <div className="header-auth">
                    <p className="header-welcome">Welcome {name}</p>
                    <button type="button" className="header-logout-link" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
