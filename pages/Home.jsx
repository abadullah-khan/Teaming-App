import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import {
  fetchPosts,
  setAvailability,
  setCurrentPage,
  setDomain,
  setGender,
  setSearch,
} from "../slices/dataSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    status,
    items,
    error,
    currentPage,
    totalPages,
    pageSize,
    search,
    domain,
    gender,
    availability,
    players,
  } = useSelector((state) => state.data);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const uniqueValues = {};
  uniqueValues.domains = [...new Set(items.map((item) => item.domain))];
  uniqueValues.genders = [...new Set(items.map((item) => item.gender))];
  uniqueValues.availabilities = [
    ...new Set(
      items.map((item) =>
        item.available === true ? "Available" : "Not Available"
      )
    ),
  ];
  let filteredItems = items;
  if (domain) {
    filteredItems = filteredItems.filter((item) => item.domain === domain);
  }
  if (gender) {
    filteredItems = filteredItems.filter((item) => item.gender === gender);
  }
  if (availability) {
    filteredItems = filteredItems.filter((item) =>
      availability === "Available"
        ? item.available === true
        : item.available === false
    );
  }
  if (search) {
    filteredItems = filteredItems.filter((item) =>
      item.first_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleNextPage = (value) => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + value));
    }
  };
  const handlePreviousPage = (value) => {
    if (currentPage > value) {
      dispatch(setCurrentPage(currentPage - value));
    }
  };
  return (
    <div className="homePage">
      {status === "idle" && <div>Loading...</div>}
      {status === "failed" && <div>Error : {error}</div>}
      {status === "succeeded" && (
        <div className="homePageWrapper">
          <header>
            <div>
              <select onChange={(e) => dispatch(setDomain(e.target.value))}>
                <option value="">All domains</option>
                {uniqueValues.domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              <select onChange={(e) => dispatch(setGender(e.target.value))}>
                <option value="">All gender</option>
                {uniqueValues.genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => dispatch(setAvailability(e.target.value))}
              >
                <option value="">All</option>

                {uniqueValues.availabilities.map((availability) => (
                  <option key={availability} value={availability}>
                    {availability}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => dispatch(setSearch(e.target.value))}
            />
            <button onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <span>
                  Select Player{" "}
                  <span
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "2px",
                    }}
                  >
                    {players.length}
                  </span>
                </span>
              ) : (
                <span>
                  Total Player{" "}
                  <span
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "2px",
                    }}
                  >
                    {players.length}
                  </span>
                </span>
              )}
            </button>
          </header>
          {!isVisible ? (
            itemsToDisplay.length ? (
              <>
                <div className="cardContainer">
                  {itemsToDisplay.map((user) => (
                    <Card key={user.id} data={user} />
                  ))}
                </div>
                <div className="btnContainer">
                  <button onClick={() => handlePreviousPage(1)}>
                    Previous page
                  </button>
                  <span>{currentPage}</span>
                  <button onClick={() => handleNextPage(1)}>Next page</button>
                </div>
              </>
            ) : (
              <p>No items Found</p>
            )
          ) : (
            <div className="cardContainer">
              {players.map((player) => (
                <Card key={player.id} data={player} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
