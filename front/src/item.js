import { useState, useEffect } from 'react';

function Item(props) {

    let [updateStatus, setUpdateStatus] = useState(false);

    function del() {
        props.func.deleteItem(props.item._id)
    }

    function update(e) {
        e.preventDefault();
        props.func.updateItem({ ...props.item, name: e.target[0].value, description: e.target[1].value });
        e.target.reset();
    }

    function showUpdate() {
        setUpdateStatus(!updateStatus);
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

    return (
        <div className="card my-2" >
            <div className="card-body">
                <h5 className="card-title">{props.item.name}</h5>
                <p className="card-text">{props.item.description}</p>
                {updateForm()}
                <button type="button" className="btn btn-secondary me-2 mt-1" onClick={showUpdate}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

export default Item;