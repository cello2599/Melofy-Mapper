import React, {useState, useEffect} from 'react';
import './MusicGenreDetection.css';
import illustration from '../assets/gambar1.png';

function MusicGenreDetection() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [genre, setGenre] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
        if (!file) {
          alert('Please select a file first');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('http://127.0.0.1:5000/post_audio', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Failed to upload file');
          }
          setMessage('File uploaded successfully');
        } catch (error) {
          setMessage('Error uploading file: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

  const handlePredict = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to predict genre');
        }
        const data = await response.json();
        setGenre(data);
      } catch (error) {
        setMessage('Error predicting genre: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    };


  useEffect(() => {
    const prepareServer = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/prepare', { method: 'GET' });
          if (!response.ok) {
            throw new Error('Failed to prepare server');
          }
        } catch (error) {
          setMessage('An error occurred while preparing the server: ' + (error instanceof Error ? error.message : 'Unknown error'));
          // console.error('An error occurred while preparing the server:', error);
        }
    };
    prepareServer();
    }, []);

    return (
      <div className="detection-container">
        <div className="text-section">
          <h2 className='font-semibold uppercase m-3'>Kenali Genre Musikmu, sekarang!</h2>
          <hr></hr>

          <div className='flex flex-wrap items-center m-2'>
            <p className='rounded-full px-2 bg-amber-100 font-semibold md:text-lg'>upload potongan musik kesukaanmu & kenali genre-nya</p>
          </div>

          <div class="mt-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Here</label>
            <input type="file"
            class="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
            onChange={handleFileChange} />
          </div>

          <div class="flex flex-row mt-6">
            <div class="basis-1/4">
              <button class="focus:outline-none text-white bg-neutral-400 hover:bg-neutral-400 focus:ring-4 focus:ring-neutral-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-neutral-400 dark:hover:bg-neutral-400 dark:focus:ring-neutral-400"
              onClick={handleUpload}>Continue</button>
            </div>
            <div class="basis-1/4">
              <button class="focus:outline-none text-white bg-neutral-400 hover:bg-neutral-400 focus:ring-4 focus:ring-neutral-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-neutral-400 dark:hover:bg-neutral-400 dark:focus:ring-neutral-400"
              onClick={handlePredict}>Predict</button>
            </div>
          </div>

          <div class="mt-3">
            {message && <p class="rounded-full px-2 bg-neutral-300 font-semibold">{message}</p>}
           </div>

          <div className="genre-result">
            <h3 class="font-light font-mono">Genre Musikmu</h3>
            {/* <div className="genre-output">{genre}</div> */}
              {<p class='border-0 shadow-sm ring-1'>{genre.prediksi_genre}</p>}
              {<p class='border-0 shadow-sm ring-1'>{genre.probabilitas}</p>}
          </div>

        </div>
        <div className="illustration-section">
          <img src={illustration} alt="Illustration" /> 
        </div>
      </div>
    );
}

export default MusicGenreDetection;
