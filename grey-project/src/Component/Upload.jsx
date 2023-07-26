import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/upload.css";

const UploadForm = () => {
  const [mediaTitle, setMediaTitle] = useState('');
  const [date, setDate] = useState('');
  const [mediaSource, setMediaSource] = useState([]);
  const [mediaType, setMediaType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [image, setImage] = useState('');

  const handleMediaSourceChange = (event) => {
    const selectedSource = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setMediaSource((prevSources) => [...prevSources, selectedSource]);
    } else {
      setMediaSource((prevSources) => prevSources.filter((source) => source !== selectedSource));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      mediaTitle,
      date,
      mediaSource,
      mediaType,
      keywords,
      image
    };

    try {
      const response = await fetch('https://lonely-cow-life-jacket.cyclic.app/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Data saved successfully:', data);
        
        setMediaTitle('');
        setDate('');
        setMediaSource([]);
        setMediaType('');
        setKeywords('');
        setImage('');
      } else {
        alert('Failed to save data:', response.status, response.statusText);
      }
    } catch (error) {
      alert('An error occurred:', error);
    }
  };

  return (
    <form className='container' onSubmit={handleSubmit}>
      <Link to="/search">
        <button>Search Page</button>
      </Link>
      <h1>Upload Form</h1>
      <div>
        <label htmlFor="mediaTitle">Media Title:</label>
        <input
          type="text"
          id="mediaTitle"
          value={mediaTitle}
          onChange={(e) => setMediaTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image">Media Image (URL):</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div id='type1'>
        <label>Media Source:</label>
        <div>
          <input
            type="checkbox"
            value="Facebook"
            onChange={handleMediaSourceChange}
            checked={mediaSource.includes('Facebook')}
          />
          <label>Facebook</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="Instagram"
            onChange={handleMediaSourceChange}
            checked={mediaSource.includes('Instagram')}
          />
          <label>Instagram</label>
        </div>
      </div>
      <div id='type'>
        <label>Media Type:</label>
        <div>
          <input
            type="radio"
            value="png"
            checked={mediaType === 'png'}
            onChange={(e) => setMediaType(e.target.value)}
            required
          />
          <label>png</label>
        </div>
        <div>
          <input
            type="radio"
            value="jpg"
            checked={mediaType === 'jpg'}
            onChange={(e) => setMediaType(e.target.value)}
          />
          <label>jpg</label>
        </div>
        <div>
          <input
            type="radio"
            value="gif"
            checked={mediaType === 'gif'}
            onChange={(e) => setMediaType(e.target.value)}
          />
          <label>gif</label>
        </div>
      </div>
      <div>
        <label htmlFor="keywords">Keywords:</label>
        <input
          type="text"
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
