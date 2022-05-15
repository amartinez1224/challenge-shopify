import { useState, useEffect } from 'react';
import './App.css';
import Item from './item'
import Warehouse from './warehouse'

function App() {

  const url = "https://challenge-shopify.amartinez1224.repl.co"
  const itemsAddress = "/items"
  const warehousesAddress = "/warehouses"

  let [items, setItems] = useState([]);
  let [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchItems()
    fetchWarehouses()
  },[]);

  function fetchItems() {
    fetch(url + itemsAddress).then(response => {
      response.json()
        .then(items => {
          setItems(items)
        })
    })
  }

  function fetchWarehouses() {
    fetch(url + warehousesAddress).then(response => {
      response.json()
        .then(warehouses => {
          setWarehouses(warehouses)
        })
    })
  }

  function showItems(){
    return items.map((item,i) => {
      return <Item key={i} item={item}/>
    })
  }

  function showWarehouses(){
    return warehouses.map((warehouse,i) => {
      return <Warehouse key={i} warehouse={warehouse}/>
    })
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Shopify Challenge</h1>
        <br />
      </div>
      <div className="row">
        <div className="col-8">
          <h3>Items</h3>
          {showItems()}
        </div>
        <div className="col-4">
          <h3>Warehouses</h3>
          {showWarehouses()}
        </div>
      </div>
    </div>
  );
}

export default App;
