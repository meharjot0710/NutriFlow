import React from 'react'
import './App.css'
import Header from './common/Header';
import salad from './Img/salad.png'
import { Link } from 'react-router-dom';
import nood from './Img/nood.png'

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='sec1'>
        <h1>Welcome to NutriFlow</h1>
        <p>NutriFlow is a tool made for tracking the nutrients and calories in your day.</p>
        <p>You can also track the nutrients and calories in the meal you are going to make and make your diet chart accordingly.</p>
      </div>
      <div className='salad'>
        <div className='saladcont'>
          <h1>Track your Calories -> </h1>
          <button><Link to={'/nutrient'}>GO</Link></button>
        </div>
        <img className='saladimg' src={salad}/>
      </div>
      <div className='salad'>
        <img className='noodimg' src={nood}/>
        <div className='saladcont'>
          <h1>Check nutrition -> </h1>
          <button><Link to={'/recipe'}>GO</Link></button>
        </div>
      </div>
    </div>
  );
}

export default App;
