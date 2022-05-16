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
  let [alert, setAlert] = useState({ message: "Well done!", title: "Well done!", theme: "alert-success", show: false })

  useEffect(() => {
    fetchItems()
    fetchWarehouses()
  }, []);

  // alert only for 2.5 sec
  useEffect(() => {
    if (alert.show){
      setTimeout(() => {
        setAlert({...alert,show: false})
      }, 2500);
    }
  },[alert])

  // fetch items
  function fetchItems() {
    fetch(url + itemsAddress).then(response => {
      response.json()
        .then(items => {
          setItems(items)
        })
    })
  }

  // fetch warehouses
  function fetchWarehouses() {
    fetch(url + warehousesAddress).then(response => {
      response.json()
        .then(warehouses => {
          setWarehouses(warehouses)
        })
    })
  }

  // show items
  function showItems() {
    return items.map((item, i) => {
      return <Item key={i} item={item} />
    })
  }

  // show warehouses
  function showWarehouses() {
    return warehouses.map((warehouse, i) => {
      return <Warehouse key={i} warehouse={warehouse} />
    })
  }

  // add warehouse
  function addWarehouse(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: e.target[0].value, address: e.target[1].value })
    };
    fetch(url + warehousesAddress, requestOptions)
      .then(response => {
        if (response.status == 201) {
          setAlert({message: "Warehouse added", title: "Succes", theme: "alert-success", show: true});
        }
        else {
          response.json().then(data => {
            setAlert ({message: data.message, title: "Failed", theme: "alert-danger", show: true});
          });
        }
        fetchWarehouses();
      })
    e.target.reset();
  }

  // add item
  function addItem(e) {
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    e.target.reset()
  }

  // show alert
  function showAlert() {
    if (alert.show) {
      return (
        <div className={"alert alert-fixed " + alert.theme} role="alert">
          <h4 className="alert-heading">{alert.title}</h4>
          <p>{alert.message}</p>
        </div>
      )
    }
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
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" />
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
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Add warehouse</button>
          </form>

        </div>
      </div>
      {showAlert()}
    </div>
  );
}

export default App;
