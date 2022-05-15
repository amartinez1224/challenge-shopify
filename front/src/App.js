import { useState, useEffect } from 'react';
import './App.css';

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

  return (
    <div className="container">
      <div className="row">
        <h1>Shopify Challenge</h1>
        <br />
      </div>
      <div className="row">
        <div className="col-8">
          <h3>Items</h3>
        </div>
        <div className="col-4">
          <h3>Warehouses</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
