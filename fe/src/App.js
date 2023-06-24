import logo from './logo.svg';
import './App.css';

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



    return (
        <div className="row">
       <div className="col">
       <h2> Artists </h2>
    {artists.map((artist, idx) => (
        <div className="card mb-3" style={{ maxWidth: '300px' }} key={`artist${artist.id}`}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{artist.name}</h5>
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>

            <div className="col">
                <h2> Tracks </h2>
                <ul>
                    {tracks.map(((track, idx) => <li key={`track${track.id}`}>
                        <a
                            href={`http://127.0.0.1:8000/api/v1/song/${track.id}`}
                            onClick={onClickHandlerLyrics}
                            track_id={track.id}
                        >{track.name}
                        </a>
                    </li>))}
                </ul>
            </div>
            <div className="col">
            <h2> Lyrics </h2>
                {lyrics.map(((lyric, idx) => 
                <div key={idx}>
                    <div>{lyric.name}</div>
                    <div >{lyric.lyrics}</div>
                </div>))}
            </div>
        </div>
    );
}

export default App;