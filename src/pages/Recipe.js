import './pages.css';
import Header from '../common/Header';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function Recipe() {
  let apiid = 'a711d8dd';
  let apikey = '4ef473eb151e6ccddddf90d5e3e0bd9b';
  let [query, setquery] = useState('');
  let [recipe, setrecipe] = useState([]);
  let [disque, setdisque] = useState('');
  let [showrecipe, setshowrecipe] = useState(false);
  let [expanded, setexpanded] = useState(false);
  let [selectedRecipe, setSelectedRecipe] = useState(null);
  let top5 = ['Pasta', 'Pizza', 'Dal Makhni', 'Burger'];
  let [topdata, settopdata] = useState([]);

  function gettopres() {
    Promise.all(
      top5.map(item => 
        fetch(`https://api.edamam.com/search?q=${item}&app_id=${apiid}&app_key=${apikey}`)
          .then(res => res.json())
          .then(final => final.hits[1]) 
      )
    )
    .then(results => {
      settopdata(results);
      console.log(results);
    })
    .catch(error => console.error("Error fetching data:", error));
  }

  let collectdata = (e) => {
    e.preventDefault();
    datafetch();
  }

  let datafetch = async () => {
    fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${apiid}&app_key=${apikey}`
    )
    .then((res) => res.json())
    .then((final) => {
      setrecipe(final.hits);
      setshowrecipe(true);
      setdisque(query);
    });
  }

  let handleRecipeClick = (v) => {
    setSelectedRecipe(v);
    setexpanded(true);
  };

  let closeExpandDetail = () => {
    setexpanded(false);
    setSelectedRecipe(null);
  };

  useEffect(() => {
    gettopres();
  }, []);

  return (
    <div className="App">
      <Header />

      { expanded && selectedRecipe && (
        <div className='showdetailprod'>
          <div className='selectecpa'>
          <h1>{selectedRecipe.label}</h1>
            <Button onClick={closeExpandDetail}>X</Button>
          </div>
          <h1 className='showcal'>Calories : {selectedRecipe.calories.toFixed(2)}</h1>
          <div className='expimgandinfo'>
            <img src={selectedRecipe.image} alt={selectedRecipe.label} />
            <div className='incredients'>
              <h1>Ingredients</h1>
              <ul>
                { (selectedRecipe.ingredientLines).map((v,i)=>{
                  console.log(v);
                  return(
                    <li key={i}>{v}</li>
                  )
                }) }
              </ul>
            </div>
            <div className='nutrition'>
              <h1>Nutrition Value</h1>
              <ul>
                { selectedRecipe.digest.map((v, i) => {
                  return (
                    <li key={i}>{v.label} : {v.total.toFixed(2)} grams</li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={collectdata}>
        <div className='searchbar'>
          <h1>Search a dish</h1>
          <input className='inputdish' value={query} onChange={(e) => setquery(e.target.value)} type='text' />
          <button type='submit'>Search</button>
        </div>
      </form>

      { showrecipe ? (
        <div>
          <h1 className='head'>Showing results for {disque}</h1>
          <div className='contain'>
            {recipe.map((v, i) => (
              <div className='item' key={i} onClick={() => handleRecipeClick(v.recipe)}>
                <h2 className='itemnum'>Recipe {i + 1}</h2>
                <img className='itemimg' src={v.recipe.image} alt={v.recipe.label} />
                <h2 className='itemnum'>{v.recipe.label}</h2>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className='head'>Top searches</h1>
          <div className='contain'>
            {topdata.map((v, i) => (
              <div className='item' key={i} onClick={() => handleRecipeClick(v.recipe)}>
                <h2 className='itemnum'>{top5[i]}</h2>
                <img className='itemimg' src={v.recipe.image} alt={v.recipe.label} />
                <h2 className='itemnum'>{v.recipe.label}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;