


import { useState, useRef, useEffect } from 'react';

import axios, * as others from 'axios';

function App() {
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000//api/v1/artist")
            .then((resp) => {
                setArtists(resp.data.artists);
                setTracks([])
                setLyrics([])

            });
    }, []);

    function onClickHandlerTracks(e) {
        e.preventDefault();
        const artistId = e.currentTarget.getAttribute('artist_id');
        axios.get(`http://127.0.0.1:8000/api/v1/artist/${artistId}`)
            .then((resp) => {
                setTracks(resp.data.tracks);
                setLyrics([])
                
            });
    }


    function onClickHandlerLyrics(e) {
        e.preventDefault()
        const trackId = e.currentTarget.getAttribute('track_id')
        console.log(trackId)
        axios.get(`http://127.0.0.1:8000/api/v1/song/${trackId}`)
            .then((resp) => {
                setLyrics([resp.data])
                console.log(resp.data)
            })

           

    }

    function downloadLyrics() {
        if (lyrics.length > 0) {
          const element = document.createElement('a');
          const lyricsText = lyrics[0].lyrics;
          const file = new Blob([lyricsText], { type: 'text/plain' });
          element.href = URL.createObjectURL(file);
          element.download = 'lyrics.txt';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        }
      }
    return (
        
<div className="row">
    
  <div className="col-sm-4">
  <div className='artist_column'> 
        <h2 className='card-heading'> Top Artists </h2>
    {artists.map((artist, idx) => (

    <a
    href={`http://127.0.0.1:8000/api/v1/artist/${artist.id}`}
    onClick={onClickHandlerTracks}
    artist_id={artist.id}
    >
      <div className="card mb-3"   key={`artist${artist.id}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={artist.image_url} className="img-fluid rounded-start"  alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5  className="card-title">
                 
                  {artist.name}
                
               


              </h5>
             
                  
                  
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="ep:arrow-up-bold">
<path id="Vector" d="M5.95451 1.84062C5.7436 2.05158 5.62512 2.33768 5.62512 2.63599C5.62512 2.9343 5.7436 3.2204 5.95451 3.43137L11.5233 9.00012L5.95451 14.5689C5.74958 14.781 5.63619 15.0652 5.63875 15.3602C5.64132 15.6552 5.75963 15.9373 5.96821 16.1459C6.1768 16.3545 6.45896 16.4728 6.75393 16.4754C7.04891 16.4779 7.33308 16.3645 7.54526 16.1596L13.9094 9.79549C14.1203 9.58452 14.2388 9.29842 14.2388 9.00012C14.2388 8.70181 14.1203 8.41571 13.9094 8.20474L7.54526 1.84062C7.33429 1.62971 7.04819 1.51123 6.74988 1.51123C6.45158 1.51123 6.16548 1.62971 5.95451 1.84062Z" fill="white"/>
</g>
</svg>
            </div>
          </div>
        </div>
      </div>
      </a>
    ))}
  </div>
</div>
            
<div className='track-lyrics'>




<div className="tracks">
    <h2 >Tracks</h2>
    <ul className='lyrics-list'>
        {tracks.map(((track, idx) => (
            <li key={`track${track.id}`}>
                
                
                {idx === 0 && (
                    <div className='artist-detls'>
                        
                        
                    <img className='artist-img' src={track.artist.image} alt={track.artist.name} />
                    <h4 className='artist-name'>{track.artist.name}</h4>
                   
                    </div> 
                    
                )}
                <a
                    href={`http://127.0.0.1:8000/api/v1/song/${track.id}`}
                    onClick={onClickHandlerLyrics}
                    track_id={track.id}
                    className="track-link"
                >    
                    
                    <div className='track-name'>{track.name}</div>
                </a>
            </li>
        )))}
    </ul>
</div>


<div className="lyrics">
        <h2 className="card-heading">Lyrics</h2>
        {lyrics.map((lyric, idx) => (
          <div key={idx}>
            <div className="lyrics-nme">{lyric.name}</div>
            {lyrics.length > 0 && (
            <div>
            <a className="youtube"href={lyric.youtubelink}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
</svg></a>
          <button className="download-btn" onClick={downloadLyrics}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg>
          </button>
          </div>

        )}
            <div className="lyrics-txt">{lyric.lyrics}</div>
          </div>
        ))}
      </div>
 </div>
</div>

 
    );
}

export default App;