import { useState } from 'react';


const Header = ({ setSearchTerm }) => {
    const [inputValue, setInputValue] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchTerm(inputValue);
    };

    return (
        <>
        <header className='header'>
            <h1 className='header-title'>KUDOS</h1>
        
        <div className='search-wrap'>
          <button
            type='button'
            className='search-toggle'
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label='Toggle search input'
          >
            <svg viewBox='0 0 24 24' width='20' height='20' aria-hidden='true'>
              <circle cx='11' cy='11' r='7' fill='none' stroke='currentColor' strokeWidth='2' />
              <line x1='16.65' y1='16.65' x2='21' y2='21' stroke='currentColor' strokeWidth='2' />
            </svg>
          </button>

          {isSearchOpen && (
            <form className='search-form' onSubmit={handleSearch}>
              <input
                type='text'
                placeholder='Search....'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className='search-input'
              />
            </form>
          )}
        </div>
        </header>
        </>
    );


};

//</> const Header = ({ searchQuery, setSearchQuery, handleSearchSubmit, handleClearSearch }) => {
//   return (
//     <>
//     <header className='header'>
//       <h1 className='header-title'>KUDOS</h1>
//     </header>

//     <Search
//       value={searchQuery}
//       onChange={setSearchQuery}
//       onSubmit={handleSearchSubmit}
//       onClear={handleClearSearch}
//     />

//     <section className='filter-section'>
//     <nav className='filter-nav'>
//         <button className='filter-button'>All</button>
//         <button className='filter-button'>Recent</button>
//         <button className='filter-button'>Celebration</button>
//         <button className='filter-button'>Thank You</button>
//         <button className='filter-button'>Inspiration</button>
//     </nav>
//     </section>
//     </>
//   );
// };

export default Header;