import { useEffect, useState, useRef } from "react";
import HotelCard from "./hotel/HotelCard";
import SearchForm from "./search/SearchForm";
import io from "socket.io-client";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import Logo from "./logo.svg";

const socket = io("http://localhost:3000");

export default function AppSearch() {
  const [isConnected, setIsConnected] = useState(false);
  const [results, setResults] = useState([]);
  const [isClickedSearch, setIsClickedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    ski_site: 1,
    from_date: "03/04/2024",
    to_date: "03/11/2024",
    group_size: 2,
  });

  const initializedEventSearch = useRef(false);
  const events = useRef([]);
  useEffect(() => {
    if (initializedEventSearch.current === false) {
      initializedEventSearch.current = true;

      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected");
      });

      socket.on("search-result", (data) => {
        events.current = [...events.current, ...data];
        setResults(events.current);
        setIsClickedSearch(true);
        console.log("length_results", events.current.length);
        console.log("event", data);
      });
    }
  }, []);

  const initializeSearch = () => {
    if (isConnected) {
      console.log("Initialized search...");
      events.current = [];
      setResults(events.current);
      socket.emit("search", searchQuery);
    } else {
      console.error("Not Connected cant search");
    }
  };
  const distinctValues = (array, key = "HotelCode") => {
    return [...new Map(array.map((item) => [item[key], item])).values()];
  };
  const hotels = distinctValues(results).sort(
    (a, b) =>
      parseFloat(a.PricesInfo.AmountAfterTax) -
      parseFloat(b.PricesInfo.AmountAfterTax)
  );
  return (
    <div>
      <Box>
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <Container
              maxWidth="lg"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box sx={{ margin: "0 20px" }}>
                <img src={Logo} alt="weski Logo" />
              </Box>
              <SearchForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                initializeSearch={initializeSearch}
              />
            </Container>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box>
          <Typography variant="h4">Select your ski trip</Typography>
          {isClickedSearch && (
            <Typography variant="p">
              {hotels.length} ski trips options · {searchQuery.ski_site} ·{" "}
              {searchQuery.from_date}-{searchQuery.to_date} ·{" "}
              {searchQuery?.group_size} people
            </Typography>
          )}
        </Box>
        <Box sx={{ mt: 1 }}>
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel["HotelCode"] + i} hotel={hotel} />
          ))}
        </Box>
      </Container>
    </div>
  );
}
