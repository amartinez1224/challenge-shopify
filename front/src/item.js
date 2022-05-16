import { useState, useEffect } from 'react';

function Item(props) {

    function del() {
        props.func.deleteItem(props.item._id)
    }

    return (
        <div className="card my-2" >
            <div className="card-body">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text">{props.item.description}</p>
                <button type="button" className="btn btn-danger" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

export default Item;