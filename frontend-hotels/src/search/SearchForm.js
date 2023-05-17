import { Button, Stack, TextField } from "@mui/material";
import SearchIcon from "./search.svg";

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
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          id="SkiSite"
          name="ski_site"
          label="Ski Site"
          type="number"
          variant="outlined"
          value={searchQuery.ski_site}
          onChange={handleChange}
        />

        <TextField
          size="small"
          name="from_date"
          id="from_date"
          label="From Date"
          variant="outlined"
          value={searchQuery.from_date}
          onChange={handleChange}
        />
        <TextField
          size="small"
          name="to_date"
          label="To Date"
          value={searchQuery.to_date}
          onChange={handleChange}
        />

        <TextField
          size="small"
          label="Group Size"
          type="number"
          name="group_size"
          value={searchQuery.group_size}
          onChange={handleChange}
        />

        <Button
          variant="outlined"
          startIcon={<img src={SearchIcon} alt="search" />}
          type="submit"
          color="primary"
        >
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchForm;
