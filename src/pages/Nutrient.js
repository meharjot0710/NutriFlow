import './pages.css';
import Header from '../common/Header';
import { useState } from 'react';

function Nutrient() {
  let apiid='a711d8dd';
  let apikey='4ef473eb151e6ccddddf90d5e3e0bd9b';
  let [query,setquery]=useState('');
  let [meals,setmeals]=useState([]);
  let [mealdata,setmealdata]=useState([])
  let [calories,setcalories]=useState(0)
  let datafetch=async (e)=>{
    e.preventDefault();
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${apiid}&app_key=${apikey}`
    )
    .then((res)=>res.json())
    .then((final)=>{
      if(mealdata.length==0){
        setmealdata([...mealdata,final.hits[1]]);
        setcalories(final.hits[1].recipe.calories)
      }
      else{
        console.log(mealdata[0])
        setcalories(calories+final.hits[1].recipe.calories);
        for(let i=0;i<(final.hits[1].recipe.digest).length-1;i++){
          mealdata[0].recipe.digest[i].total=mealdata[0].recipe.digest[i].total + final.hits[1].recipe.digest[i].total;
        }
      }
      console.log(final.hits[1]);
      setquery('')
      setmeals([...meals,query]);
    })
  }
  return (
    <div className="App">
      <Header/>
      <h1 className='head'>Calculate and track your calories</h1>
      <p className='head ps'>Now track your calories and nutrients you have consumed in the day.</p>
      <div className='calreqcal'>
        <form onSubmit={datafetch}>
            <h1 className='searchd headingmeal'>Add a meal</h1>
          <div className='searchd'>
            <input type='text' className='inputdish' onChange={(e)=>setquery(e.target.value)} value={query}/>
            <button type='submit'>Add</button>
          </div>
            <h1 className='calcount'>Total Calories : {calories.toFixed(2)}</h1>
        </form>
      </div>
      <div className='containnutri'>
        <div className='dishnames'>
          <h1 className='head textc'>Meals</h1>
            { (meals.length==0) ? 
              <h1>No meals added</h1>
              :
              <ul>
                {meals.map((v,i)=>{
                  return (
                    <li key={i}>{v}</li>
                  )
                })}
              </ul>
            }
        </div>
        <div className='nutrientscal'>
          <h1 className='head textc'>Nutrients</h1>
            { (meals.length==0) ? 
              <h1>No meals added</h1>
              :
              <ul>
                { (mealdata[0].recipe.digest).map((v,i)=>{
                  return(
                    <li key={i}>{v.label} : {v.total.toFixed(2)} grams</li>
                  )
                }) }
              </ul>
            }
        </div>
      </div>
    </div>
  );
}

export default Nutrient;
