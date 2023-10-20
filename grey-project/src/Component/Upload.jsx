import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/upload.css';

const UploadForm = () => {
  const [mediaTitle, setMediaTitle] = useState('');
  const [date, setDate] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [keywords, setKeywords] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [mediaSource, setMediaSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const mediaSourcesList = [
    'Instagram',
    'Owned',
    'Direct Submissions',
    'Publications',
    'Sponsors',
    'Others',
  ];

  const handleMediaSourceChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setMediaSource([...mediaSource, value]);
    } else {
      setMediaSource(mediaSource.filter((item) => item !== value));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('mediaTitle', mediaTitle);
    data.append('date', date);
    data.append('mediaSource', JSON.stringify(mediaSource));
    data.append('mediaType', mediaType);
    data.append('keywords', keywords);
    if (imageFile) {
      data.append('image', imageFile);
    }

    if (imageFile) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://62.72.59.146:8001/image/', true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = (event.loaded / event.total) * 100;
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            alert('Data saved successfully:', data);
            setMediaTitle('');
            setDate('');
            setMediaSource([]);
            setMediaType('');
            setKeywords('');
            setImageFile(null);
          } else {
            // alert('Failed to save data:', xhr.status, xhr.statusText);
          }
          setLoading(false);
          setUploadProgress(0);
        }
      };

      xhr.send(data);
    } else {
      try {
        const response = await fetch('http://62.72.59.146:8001/image/', {
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          alert('Data saved successfully:', data);
          setMediaTitle('');
          setDate('');
          setMediaSource([]);
          setMediaType('');
          setKeywords('');
          setImageFile(null);
        } else {
          alert('Failed to save data:', response.status, response.statusText);
        }
      } catch (error) {
        alert('An error occurred:', error);
      }

      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: '50px' }}>Content Upload and Retrieval System</h1>
      <form className='container' onSubmit={handleSubmit}>
        <Link to='/search'>
          <button className='mainbtn'>Go to Search Page</button>
        </Link>
        <h1>Upload Form</h1>
        <div>
          <label htmlFor='mediaTitle'>Media Title:</label>
          <input
            type='text'
            id='mediaTitle'
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='image'>Media Image or Video:</label>
          <input type='file' id='image' onChange={handleImageChange} required />
        </div>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div id='type1'>
          <div>
            <label>Media Source:</label>
            <div>
              {mediaSourcesList.map((source) => (
                <div key={source}>
                  <input
                    type='checkbox'
                    value={source}
                    onChange={handleMediaSourceChange}
                    checked={mediaSource.includes(source)}
                  />
                  <label>{source}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <label>Media Type:</label>
        <div id='type'>
          <div>
            <input
              type='radio'
              value='png'
              checked={mediaType === 'png'}
              onChange={(e) => setMediaType(e.target.value)}
              required
            />
            <label>png</label>
          </div>
          <div>
            <input
              type='radio'
              value='jpg'
              checked={mediaType === 'jpg'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>jpg</label>
          </div>
          <div>
            <input
              type='radio'
              value='gif'
              checked={mediaType === 'gif'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>gif</label>
          </div>
          <div>
            <input
              type='radio'
              value='MP4'
              checked={mediaType === 'MP4'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>MP4</label>
          </div>
          <div>
            <input
              type='radio'
              value='MOV'
              checked={mediaType === 'MOV'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>MOV</label>
          </div>
          <div>
            <input
              type='radio'
              value='WMV'
              checked={mediaType === 'WMV'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>WMV</label>
          </div>
          <div>
            <input
              type='radio'
              value='AVI'
              checked={mediaType === 'AVI'}
              onChange={(e) => setMediaType(e.target.value)}
            />
            <label>AVI</label>
          </div>
        </div>
        <div>
          <label htmlFor='keywords'>Keywords:</label>
          <input
            type='text'
            id='keywords'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        {uploadProgress > 0 && (
          <h4>Upload Progress: {uploadProgress.toFixed(2)}%</h4>
        )}
        <button type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Upload'}
        </button>
      </form>
    </>
  );
};

export default UploadForm;
