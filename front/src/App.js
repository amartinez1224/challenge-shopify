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
  }, []);

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

  function showItems() {
    return items.map((item, i) => {
      return <Item key={i} item={item} />
    })
  }

  function showWarehouses() {
    return warehouses.map((warehouse, i) => {
      return <Warehouse key={i} warehouse={warehouse} />
    })
  }

  function addWarehouse(e){
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    e.target.reset()
  }

  function addItem(e){
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    e.target.reset()
  }

  return (
    <div className="container">
      <div className="row">
        <h1>Shopify Challenge</h1>
        <br />
      </div>
      <div className="row">
        <div className="col-8 pe-5">
          <h3>Items</h3>
          {showItems()}
          <br />
          <h5>New Item</h5>

          <form onSubmit={addItem}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Add item</button>
          </form>

        </div>
        <div className="col-4">
          <h3>Warehouses</h3>
          {showWarehouses()}
          <br />

          <h5>New Warehouse</h5>
          <form onSubmit={addWarehouse}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Add warehouse</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
