<form onSubmit={handleFormSubmit}>
  <label htmlFor="book-search" className="sr-only">
    Search for a book
  </label>
  <input
    type="text"
    id="book-search"
    placeholder="Search for a book"
    aria-label="Search for a book"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
  />
  <button 
    type="submit"
    aria-label="Submit search"
  >
    Submit Search
  </button>
</form> 