import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <Link to="/" className='header-link'>
                <h1 className='header-title'>KUDOS</h1>
            </Link>
        </header>
    );
};

export default Header;
