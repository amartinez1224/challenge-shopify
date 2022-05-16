import { useState, useEffect } from 'react';

function Warehouse(props) {

    let [updateStatus, setUpdateStatus] = useState(false);

    function del() {
        props.func.deleteWarehouse(props.warehouse._id);
    }

    function update(e) {
        e.preventDefault();
        props.func.updateWarehouse({ ...props.warehouse, name: e.target[0].value, address: e.target[1].value });
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
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary me-2 mt-1">Update warehouse</button>
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
                <h5 className="card-title">{props.warehouse.name}</h5>
                <p className="card-text">{props.warehouse.address}</p>
                {updateForm()}
                <button type="button" className="btn btn-secondary me-2 mt-1" onClick={showUpdate}>Edit</button>
                <button type="button" className="btn btn-danger me-2 mt-1" onClick={del}>Delete</button>
            </div>
        </div>
    );
}

export default Warehouse;