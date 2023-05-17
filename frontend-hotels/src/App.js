import { useEffect, useState, useRef } from "react";
import HotelCard from "./hotel/HotelCard";
import SearchForm from "./search/SearchForm";
import "./App.css";
import io from "socket.io-client";

const socket = io("http://localhost:3000");
export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  const isConnectedRef = useRef(false);
  useEffect(() => {
    if (isConnectedRef.current === false) {
      isConnectedRef.current = true;
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("Connected");
      });
    }
  }, []);

  return <AppSearch isConnected={isConnected} />;
}

function AppSearch({ isConnected }) {
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    ski_site: 1,
    from_date: "03/04/2024",
    to_date: "03/11/2024",
    group_size: 2,
  });
  const initializedEventSearch = useRef(false);
  const resultEvent = useRef([]);
  const events = useRef([]);
  useEffect(() => {
    if (initializedEventSearch.current === false) {
      initializedEventSearch.current = true;
      socket.on("search-result", (data) => {
        resultEvent.current = data;
        events.current = [...events.current, ...data];
        setResults(events.current);
        console.log("length_results", events.current.length);
        console.log("event", data);
      });
    }
  }, []);

  const initializeSearch = () => {
    if (isConnected) {
      console.log("Initialized search...");
      socket.emit("search", searchQuery);
    } else {
      console.error("Not Connected cant search");
    }
  };

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
        {events.current
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
