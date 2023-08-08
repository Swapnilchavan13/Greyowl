import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Searcher = () => {
  const [mediaTitle, setMediaTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [mediaSources, setMediaSources] = useState([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchSearchResults();
  }, [selectedMediaType]);

  useEffect(() => {
    if (isSearchClicked) {
      const filteredResults = mockData.filter((data) => {
        const titleMatch = mediaTitle && data.mediaTitle === mediaTitle;
        const keywordsMatch =
          keywords && data.keywords.toLowerCase().includes(keywords.toLowerCase());
        const dateMatch =
          dateSelected &&
          fromDate &&
          toDate &&
          data.date >= fromDate &&
          data.date <= toDate;
        const mediaSourceMatch =
          mediaSources.length > 0 &&
          mediaSources.some((source) => data.mediaSource.includes(source));

        return (
          (!mediaTitle || titleMatch) &&
          (!dateSelected || dateMatch) &&
          (!mediaSources.length || mediaSourceMatch) &&
          (!keywords || keywordsMatch)
        );
      });

      setSearchResults(filteredResults);
    }
  }, [mockData, isSearchClicked, mediaTitle, dateSelected, fromDate, toDate, mediaSources, keywords]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(
        "https://lonely-cow-life-jacket.cyclic.app/main"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();

      const formattedData = data.map((item) => ({
        ...item,
        mediaSource: JSON.parse(item.mediaSource),
      }));

      const filteredData = formattedData.filter((item) => {
        if (selectedMediaType === "") {
          return true;
        } else {
          return item.mediaType === selectedMediaType;
        }
      });

      setMockData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const mediaSourcesList = [
    "Instagram",
    "Owned",
    "Direct Submissions",
    "Publications",
    "Sponsors",
    "Others",
  ];

  const handleMediaSourceChange = (event) => {
    const selectedSource = event.target.value;
    setMediaSources((prevSources) => {
      if (prevSources.includes(selectedSource)) {
        return prevSources.filter((source) => source !== selectedSource);
      } else {
        return [...prevSources, selectedSource];
      }
    });
  };

  const handleDateSelectionChange = (event) => {
    setDateSelected(event.target.checked);

    if (!event.target.checked) {
      setFromDate("");
      setToDate("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSearchClicked(true);
    setSearching(true); 

    const filteredResults = mockData.filter((data) => {
      const titleMatch = mediaTitle && data.mediaTitle === mediaTitle;
      const keywordsMatch =
        keywords && data.keywords.toLowerCase().includes(keywords.toLowerCase());
      const dateMatch =
        dateSelected &&
        fromDate &&
        toDate &&
        data.date >= fromDate &&
        data.date <= toDate;
      const mediaSourceMatch =
        mediaSources.length > 0 &&
        mediaSources.some((source) => data.mediaSource.includes(source));

      return (
        (!mediaTitle || titleMatch) &&
        (!dateSelected || dateMatch) &&
        (!mediaSources.length || mediaSourceMatch) &&
        (!keywords || keywordsMatch)
      );
    });

    setSearchResults(filteredResults);

    setSearching(false);
  };

  const mediaTypesList = [
    "png",
    "jpg",
    "gif",
    "MP4",
    "MOV",
    "WMV",
    "AVI",
  ];

  const handleMediaTypeChange = (event) => {
    setSelectedMediaType(event.target.value);
  };

  const renderMediaContent = (result) => {
    if (["MP4", "MOV", "WMV", "AVI"].includes(result.mediaType)) {
      return (
        <video width="250" height="240" controls>
          <source src={`data:video/${result.mediaType};base64,${result.image}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else {
      return <img src={`data:image/jpeg;base64,${result.image}`} alt={result.mediaTitle} />;
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "50px" }}>Content Upload and Retrieval System</h1>
      <form id="search" onSubmit={handleSubmit}>
        <Link to="/upload">
          <button className="mainbtn">Go to Upload Page</button>
        </Link>
        <h1>Search Page</h1>
        <div>
          <label htmlFor="mediaTitle">Search for Media Title:</label>
          <input
            type="text"
            id="mediaTitle"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dateSelected}
              onChange={handleDateSelectionChange}
            />
            Search by Date:
          </label>
          {dateSelected && (
            <div>
              <label htmlFor="fromDate">From:</label>
              <input
                type="date"
                id="fromDate"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
              <label htmlFor="toDate">To:</label>
              <input
                type="date"
                id="toDate"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <div id="type">
          <label>Media Source:</label>
          {mediaSourcesList.map((source) => (
            <div key={source}>
              <input
                type="checkbox"
                value={source}
                onChange={handleMediaSourceChange}
                checked={mediaSources.includes(source)}
              />
              <label>{source}</label>
            </div>
          ))}
        </div>
        <div>
          <label>Media Type:</label>
          <div id="type">
            <div>
              <input
                type="radio"
                value=""
                checked={selectedMediaType === ""}
                onChange={handleMediaTypeChange}
              />
              <label>All</label>
            </div>
            {mediaTypesList.map((type) => (
              <div key={type}>
                <input
                  type="radio"
                  value={type}
                  checked={selectedMediaType === type}
                  onChange={handleMediaTypeChange}
                />
                <label>{type}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="keywords">Search by Keywords:</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div>
        {searching ? (
          <h1>Searching...</h1>
        ) : (
          isSearchClicked && searchResults.length > 0 && (
            <div>
              <h2>Search Results:</h2>
              <div id="searchdata">
                {searchResults.map((result) => (
                  <div className="searchdata" key={result._id}>
                    {renderMediaContent(result)}
                    <h3>{result.mediaTitle}</h3>
                    <p>Date: {result.date}</p>
                    <p>Media Sources: {result.mediaSource.join(", ")}</p>
                    <p>Keywords: {result.keywords}</p>
                    <a
                      href={`data:image/jpeg;base64,${result.image}`}
                      download={`${result.mediaTitle}.${result.mediaType.toLowerCase()}`}
                    >
                      <button id="btn">Download</button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Searcher;
