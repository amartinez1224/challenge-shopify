import { useState, useEffect } from 'react';

function Warehouse(props) {

    function del() {
        props.func.deleteWarehouse(props.warehouse._id)
    }

    return (
        <div className="card my-2" >
            <div className="card-body">
                <h5 className="card-title">{props.warehouse.name}</h5>
                <p className="card-text">{props.warehouse.address}</p>
                <button type="button" className="btn btn-danger" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

export default Warehouse;