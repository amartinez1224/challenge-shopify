import { useState, useEffect } from 'react';

function Item(props) {

    let [updateStatus, setUpdateStatus] = useState(false);
    let [stockStatus, setStockStatus] = useState(false);
    let [warehouses, setWarehouses] = useState([])

    const [newProps, setNewProps] = useState(null);

    if (props !== newProps) {
        setNewProps(props);
    }

    useEffect(() => {
        let newWarehouses = []
        props.item.warehouses.forEach(warehouse => {
            let item = props.warehouses.find(item => warehouse.warehouse == item._id)
            if (item){
                newWarehouses.push({ ...warehouse, name: item.name });
            }   
        });
        setWarehouses(newWarehouses);
    }, [newProps])

    function del() {
        props.func.deleteItem(props.item._id)
    }

    function update(e) {
        e.preventDefault();
        props.func.updateItem({ ...props.item, name: e.target[0].value, description: e.target[1].value });
        e.target.reset();
    }

    function showUpdate() {
        if (!updateStatus) {
            setStockStatus(false);
        }
        setUpdateStatus(!updateStatus);
    }

    function showStock() {
        if (!stockStatus) {
            setUpdateStatus(false);
        }
        setStockStatus(!stockStatus);
    }

    function updateForm() {
        if (updateStatus) {
            return (
                <div>
                    <form onSubmit={update}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary me-2 mt-1">Update item</button>
                        <button type="button" className="btn btn-secondary me-2 mt-1" onClick={showUpdate}>Hide</button>
                    </form>
                    <br />
                </div>
            )
        }
    }

    function updateStock(e) {
        e.preventDefault();
        let newWarehouses = warehouses.map(warehouse => {
            return {
                warehouse: warehouse.warehouse,
                quantity: warehouse.quantity
            }
        })
        props.func.updateItem({ ...props.item, warehouses: newWarehouses });
    }

    function stockWarehouse() {
        return warehouses.map((stockW, i) => {
            let item = props.item.warehouses.find(item => stockW.warehouse == item.warehouse);
            if (item && item.quantity > 0) {
                let change = (e) => {
                    stockW.quantity = e.target.value;
                    setWarehouses([...warehouses]);
                }
                return (
                    <div className="row mb-3" key={i}>
                        <div className="col-auto">
                            <label className="form-label">{stockW.name}</label>
                        </div>
                        <div className="col-auto">
                            <input type="number" min="0" className="form-control" value={stockW.quantity} onChange={change} />
                        </div>
                    </div>
                )
            }
        })
    }

    function addWarehouseStock(e){
        e.preventDefault();
        let newWarehouses = warehouses.filter(warehouse => warehouse.warehouse != e.target[0].value).map(warehouse => {
            return {
                warehouse: warehouse.warehouse,
                quantity: warehouse.quantity
            }
        })
        newWarehouses.push({ warehouse: e.target[0].value, quantity: 1})
        console.log(newWarehouses)
        props.func.updateItem({ ...props.item, warehouses: newWarehouses });
    }

    function addWarehouse() {
        let list = warehouses.map((stockW, i) => {
            let item = props.item.warehouses.find(item => stockW.warehouse == item.warehouse);
            if (item && item.quantity == 0) {
                return <option value={stockW.warehouse} key={i}>{stockW.name}</option>
            }
        })
        if (list.filter(item => item != undefined).length > 0) {
            return (
                <form onSubmit={addWarehouseStock}>
                    <div className="row mb-3">
                        <div className="col-auto">
                            <select className="form-select">
                                {list}
                            </select>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Add Warehouse</button>
                        </div>
                    </div>
                </form>
            )
        }
    }

    function stock() {
        if (stockStatus) {
            return (
                <div>
                    <h6>Stock</h6>
                    {addWarehouse()}
                    <form onSubmit={updateStock}>
                        {stockWarehouse()}
                        <button type="submit" className="btn btn-primary me-2 mt-1">Update stock</button>
                        <button type="button" className="btn btn-secondary me-2 mt-1" onClick={showStock}>Hide</button>
                    </form>
                    <br />
                </div>
            )
        }
    }

    return (
        <div className="card my-2" >
            <div className="card-body">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text">{props.item.description}</p>
                {updateForm()}
                {stock()}
                <button type="button" className="btn btn-info me-2 mt-1" onClick={showStock}>Stock</button>
                <button type="button" className="btn btn-secondary me-2 mt-1" onClick={showUpdate}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

export default Item;