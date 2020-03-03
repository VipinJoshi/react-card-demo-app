import React, { useState } from 'react';
import './Card.css'

function CardDetail({
    data
}) {
    const [editMode, setEditMode] = useState(false); // hook is use to set editable state 
    const [formData, setFormContent] = useState({ ...data });
    const onEdit = (status) => {
        if (!status) {
            setFormContent(data);
        }
        setEditMode(status);
    }

    const onChange = (e) => {
        const { id, value } = e.target;
        setFormContent(prevData => ({ ...prevData, [id]: value }));
    }
    const saveDetail = () => {
        setEditMode(false);
    }


    return <div className="card card-item">
        <div className="card-container">
            <div className="top">
                <div className="cover">
                    {!editMode && <div className="editIcon">
                        <button onClick={() => onEdit(true)}> edit</button>
                    </div>}
                    <div className="name">
                        {!editMode ? <h3>
                            {formData.name}
                        </h3> : <div className="content-row"><input type="text" id="name" onChange={onChange} value={formData.name} placeholder="Enter Full Name" ></input></div>}
                    </div>
                </div>
                <div className="user">
                    <img className="avatar" src={formData.avatar} alt={formData.name} />
                </div>
                <div className="content">
                    <div className="content-row">
                        {!editMode ? <span>{formData.email}</span> :
                            <input type="email" id="email" onChange={onChange} value={formData.email} placeholder="Enter email" ></input>}
                    </div>
                    <div className="content-row">

                        {!editMode ? <span>{formData.cell}</span> :
                            <input type="text" id="cell" onChange={onChange} value={formData.cell.replace()} placeholder="Enter Cell" ></input>}
                    </div>
                    <div className="content-row">

                        {!editMode ? <span>{formData.address}</span> :
                            <input type="email" id="address" onChange={onChange} value={formData.address} placeholder="Enter Address" ></input>}
                    </div>
                </div>
                {editMode &&
                    <div>
                        <button className="btn btn-secondary" onClick={() => onEdit(false)}> Cancel</button>
                        <button className="btn btn-primary" onClick={() => saveDetail()}> Save </button>
                    </div>}
            </div>
        </div>
    </div>

}

export default CardDetail;
