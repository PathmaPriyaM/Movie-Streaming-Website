import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
  const {id}=useParams();
  const navigate=useNavigate();
  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:""
  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjkzZjgzZTUxMjgwM2FhOGE4MTg5OTFmN2YzMGQ5YSIsInN1YiI6IjY2MzY3NmRmMzU2YTcxMDEyNjE3OTE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-CguwsgByu4aMscqrT-hgI6cfcghQWpBLEvdN1rb0eM'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="backarrow" onClick={()=>{navigate('/')}}/>
      <iframe width="90%" height="90%" 
      src={`https://www.youtube.com/embed/${apiData.key}`} title="trailer" frameborder="0" allowfullscreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
