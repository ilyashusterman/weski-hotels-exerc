import { useEffect, useState } from "react";
import HotelCard from "./hotel/HotelCard";
import SearchForm from "./search/SearchForm";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
      setIsConnected(true);
    });
  });

  return <AppSearch isConnected={isConnected} />;
}

function AppSearch({ isConnected }) {
  const [resultEvent, setResultEvent] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    ski_site: 1,
    from_date: "03/04/2024",
    to_date: "03/11/2024",
    group_size: 2,
  });
  useEffect(() => {
    socket.on("search-result", (data) => {
      if (data) {
        setResultEvent(data);
      }
      console.log("event", data);
    });
  }, []);

  const initializeSearch = () => {
    if (isConnected) {
      console.log("Initialized search...");
      socket.emit("search", searchQuery);
    } else {
      console.error("Not Connected cant search");
    }
  };

  useEffect(() => {
    if (resultEvent.length > 0) {
      const newResults = [...results, ...resultEvent];
      setResults(newResults);
      console.log("length_results", newResults.length);
    }
  }, [resultEvent]);

  return (
    <div className="App">
      <div className="Navigation-bar">
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          initializeSearch={initializeSearch}
        />
      </div>
      <div>
        {results
          .sort(
            (a, b) =>
              parseFloat(a.PricesInfo.AmountAfterTax) -
              parseFloat(b.PricesInfo.AmountAfterTax)
          )
          .map((hotel) => (
            <HotelCard key={hotel["HotelCode"]} hotel={hotel} />
          ))}
      </div>
    </div>
  );
}
