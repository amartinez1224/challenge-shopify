import { useState, useEffect } from 'react';

function Item(props) {

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text">{props.item.description}</p>
            </div>
        </div>
    );
}

export default Item;