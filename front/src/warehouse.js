import { useState, useEffect } from 'react';

function Warehouse(props) {

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.warehouse.name}</h5>
                <p className="card-text">{props.warehouse.address}</p>
            </div>
        </div>
    );
}

export default Warehouse;