import "./SearchForm.css";

const SearchForm = ({ searchQuery, setSearchQuery, initializeSearch }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchQuery);
    initializeSearch();
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="input-label">
            Ski Site:
            <input
              className="input-field"
              type="number"
              name="ski_site"
              value={searchQuery.ski_site}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label className="input-label">
            From Date:
            <input
              className="input-field"
              type="text"
              name="from_date"
              value={searchQuery.from_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label className="input-label">
            To Date:
            <input
              className="input-field"
              type="text"
              name="to_date"
              value={searchQuery.to_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="input-container">
          <label className="input-label">
            Group Size:
            <input
              className="input-field"
              type="number"
              name="group_size"
              value={searchQuery.group_size}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
