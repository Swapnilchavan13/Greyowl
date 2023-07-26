import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Searcher = () => {
  const [mediaTitle, setMediaTitle] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [mediaSources, setMediaSources] = useState([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false); 

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/main');
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      setMockData(data); 
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
      setFromDate('');
      setToDate('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSearchClicked(true);

    const filteredResults = mockData.filter((data) => {
      const titleMatch = mediaTitle && data.mediaTitle.includes(mediaTitle);
      const dateMatch =
        dateSelected &&
        fromDate &&
        toDate &&
        data.date >= fromDate &&
        data.date <= toDate;
      const mediaSourceMatch =
        mediaSources.length > 0 &&
        mediaSources.every((source) => data.mediaSource.includes(source));
      const keywordsMatch = keywords && data.keywords.includes(keywords);

      return (
        (!mediaTitle || titleMatch) &&
        (!dateSelected || dateMatch) &&
        (!mediaSources.length || mediaSourceMatch) &&
        (!keywords || keywordsMatch)
      );
    });

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Link to="/upload">
          <button>Upload Page</button>
        </Link>
        <h1>Search Page</h1>
        <div>
          <label htmlFor="mediaTitle">Search for Media Title:</label>
          <input
            type="text"
            id="mediaTitle"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
            required
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
        <div>
          <label>Search by Media Source:</label>
          <div>
            <input
              type="checkbox"
              value="Facebook"
              onChange={handleMediaSourceChange}
              checked={mediaSources.includes('Facebook')}
            />
            <label>Facebook</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Instagram"
              onChange={handleMediaSourceChange}
              checked={mediaSources.includes('Instagram')}
            />
            <label>Instagram</label>
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


      {isSearchClicked && searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result._id}>
                <img src={result.image} alt="image" />
                <h3>{result.mediaTitle}</h3>
                <p>Date: {result.date}</p>
                <p>Media Sources: {result.mediaSource.join(', ')}</p>
                <p>Keywords: {result.keywords}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searcher;
