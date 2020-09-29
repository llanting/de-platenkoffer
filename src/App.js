import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {API_URL} from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, withRouter} from 'react-router-dom';

//#region Components
import AddAlbum from './components/AddAlbum';
import MyAlbumsList from './components/MyAlbumsList';
import Stats from './components/MyAlbums/Stats';
import Signin from './components/User/Signin';
import Signup from './components/User/Signup';
import Home from './components/Home';
//#endregion Components

function App() {

  // Add authentication & bootstrap for signin/signup
  // Styles
  // Modal style already added
  // API Limit? Insert pagination: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Third_party_APIs
  // Stats for artist occurence
  // Search on albumname OR on artistname

  //#region Hooks
  const [artists, setArtists] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [showArtists, setShowA] = useState(true);
  const [myAlbums, setMyAlbums] = useState(null);
  const [myFilteredAlbums, setFiltered] = useState(null);
  const [showAlbums, setShowAlbum] = useState(true);
  const [ToMyList, setToMyList] = useState(false);
  const [albumGenres, setGenres] = useState(null);
  const [duplicate, setDuplicate] = useState(false);
  //#endregion Hooks

  useEffect(() => {
    axios.get(`${API_URL}/my-albums`)
      .then((result) => {
        const sorted = sortData(result.data);
        setMyAlbums(sorted);
        setFiltered(sorted);
      }).catch((err) => {
        
      });
  }, []);

  // Sort data alphabetically
  const sortData = (arr) => {
    let newArr = arr.sort((a,b) => {
      let nameA = a.artist[0].name.toUpperCase(); 
      let nameB = b.artist[0].name.toUpperCase(); 
      if (nameA.includes('THE ', 0)) {nameA = nameA.substring(4)};
      if (nameB.includes('THE ', 0)) {nameB = nameB.substring(4)};
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      }
    });
    return newArr;
  };

  // Get artist
  const handleArtistSearch = (artist) => {
    setShowA(true);
    setShowAlbum(false);
    axios.post(`${API_URL}/artist-search`, {artistName: artist})
      .then((result) => {
        setArtists(result.data);
      }).catch((err) => {
        // Artists not found message
        console.log(err)
      });
  };

  // Not implemented!!
  const handleAlbumSearch = (album) => {
    // axios.post(`${API_URL}/albums-search`, {albumName: album})
    //   .then((result) => {
    //     console.log(result.data)
    //   }).catch((err) => {
    //     // Artists not found message
    //     console.log(err)
    //   });
  };

  // Get albums
  const handlePickArtist = (artist) => {
    setShowA(false);
    setShowAlbum(true);
    setGenres(artist.genres);
    axios.get(`${API_URL}/albums/${artist.id}`)
      .then((result) => {
        setAlbums(result.data);
      }).catch((err) => {
        console.log(err)
         // Albums not found message
      });
  };

  const onHide = () => {
    setDuplicate(false);
  }

  // Add an album to myAlbumList
  const handleAdd = (album) => {
     const {artists, id, images, name, release_date} = album;

    // Check for duplicates
    myAlbums.forEach((album) => {
      if (album.id === id) {
        setDuplicate(true);
      } else {
        setToMyList(true);
        setAlbums(null);
        setArtists(null);
        let artistsArr = artists.reduce((arr, art) => {
          let newArt = {name: art.name, id: art.id};
          arr.push(newArt);
          return arr;
        }, []);
    
        axios.post(`${API_URL}/add-album`, {artists: artistsArr, id, image: images[0].url, name, release_date, genres: albumGenres})
          .then((result) => {
            let clonedmyAlbums = JSON.parse(JSON.stringify(myAlbums));
            let clonedFilteredAlbums = JSON.parse(JSON.stringify(myFilteredAlbums));
            clonedmyAlbums.push(result.data);
            clonedFilteredAlbums.push(result.data);
            let sorted = sortData(clonedmyAlbums);
            let filteredSorted = sortData(clonedFilteredAlbums);
            setFiltered(filteredSorted);
            setMyAlbums(sorted);
            setGenres(null);
            setToMyList(false);
          }).catch((err) => {
            // Can't add album message
          });
      }
    });
  };

  // Search for albums on name/artist
  const handleMyAlbumsSearch = (e) => {
    let value = e.currentTarget.value.toUpperCase();
    let filtered = myAlbums.filter((album) => {
      let albumName = album.name.toUpperCase();
      let artistName = album.artist[0].name.toUpperCase();
      return (albumName.includes(value) || artistName.includes(value));
    })
    setFiltered(filtered);
  };

  // Search for album on genre
  const handleSortGenre = (e) => {
    const selectedGenre = e.currentTarget.innerText.toLowerCase();
    console.log(selectedGenre)
    if (selectedGenre === 'show all') {
      setFiltered(myAlbums);
      return;
    };
    let genreAlbums = myAlbums.reduce((arr, album) => {
      let genreFound = false;
      album.genres.map((genre) => {
        if (genre.includes(selectedGenre)) {genreFound = true}; 
      });
      if (genreFound === true) {arr.push(album)};
      return arr;
    }, []);
    console.log(genreAlbums)
    setFiltered(genreAlbums);
  };

  return (
   
    <Switch>
      <Route exact path="/" render={() => {
        return <Home />
      }}/>
      <Route path="/myhome" render={() => {
        return <MyAlbumsList 
          myAlbums={myFilteredAlbums} 
          searchMyAlbums={handleMyAlbumsSearch} 
          sortGenre={handleSortGenre}
          />
      }}/>
      <Route path="/add-album" render={() => {
        return <AddAlbum 
          handleArtistSearch={handleArtistSearch} 
          handleAlbumSearch={handleAlbumSearch} 
          artists={artists} 
          handlePickArtist={handlePickArtist} 
          showArtists={showArtists} 
          showAlbums={showAlbums} 
          albums={albums} 
          handleAdd={handleAdd} 
          toMyList={ToMyList} 
          myAlbums={myAlbums}
          duplicate={duplicate}
          hide={onHide}
          />
      }}/>
      <Route path="/stats" render={() => {
        return <Stats myAlbums={myAlbums}/>
      }}/>
      <Route path="/signin" render={() => {
        return <Signin/>
      }}/>
      <Route path="/signup" render={() => {
        return <Signup/>
      }}/>
    </Switch>
  );
}

export default withRouter(App);
