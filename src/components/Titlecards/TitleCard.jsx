import React,{useEffect,useRef, useState}from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCard = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const cardsRef=useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzZjgzZTUxMjgwM2FhOGE4MTg5OTFmN2YzMGQ5YSIsInN1YiI6IjY2MzY3NmRmMzU2YTcxMDEyNjE3OTE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-CguwsgByu4aMscqrT-hgI6cfcghQWpBLEvdN1rb0eM'
    }
  };
  const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft+=event.deltaY;
  }
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel);
  },[]);
  return (
    <div className='title-cards' >
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((cards,index)=>{
          return <Link to={`/player/${cards.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+cards.backdrop_path} alt="cards" />
            <p>{cards.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard
