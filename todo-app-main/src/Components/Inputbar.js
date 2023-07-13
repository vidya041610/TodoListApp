import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

const Inputbar = () => {
    const getlocalData = ()=>{
        const list = JSON.parse(localStorage.getItem("ToDo-list"));
        if(list){
            return list
        }
        else{
            return []
        }
    }
    
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getlocalData());
    const [editItem, setEdititem] = useState();
    const [toggleButton, settoggleButton] = useState(false);
    useEffect(() => {
      localStorage.setItem("ToDo-list",JSON.stringify(items));
    }, [items])
    
    const addItem = () => {
        if (!inputData) {
            // add modal
            alert("No items");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === editItem){
                        return {...curElem,name:inputData}
                    }
                    return curElem
                })
            )
        }
        else {
        const myNewInputData = {
            id: new Date().getTime().toString(),
            name:inputData
        } 
            setItems([...items, myNewInputData]);
        }
        setInputData("");
        settoggleButton(false);
    };

    const deleteItem = (index) => {
        const updatedList = items.filter((curElem)=>{
                return curElem.id !== index;
            })
        setItems(updatedList);
    }

    const updateItem = (index) => {
        const item_todo_edit = items.find((curElem)=>{
            return curElem.id === index
        })
        setInputData(item_todo_edit.name)
        settoggleButton(true);
        setEdititem(index)
    }

    const clearItems = () =>{
        setItems([]);
    }
    return (
        <>
            <div className='mt-5 container'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control " value={inputData} placeholder="Add Item" onChange={(e) => { setInputData(e.target.value) }} />
                    <span className="btn" type="button" id="button-addon2">{toggleButton ?<CreateIcon onClick={addItem}/> : <AddIcon onClick={addItem} />}</span>
                </div>


                {/* Set of items */}
                {items.map((curElem) => {
                    return (
                        <div class="list-group mb-2" key={curElem.id}>
                    <div class="list-group-item list-group-item-dark d-flex justify-content-between"><span>{curElem.name}</span><div><DeleteIcon className='me-3' onClick={() => {deleteItem(curElem.id)}} /><CreateIcon onClick={()=>{updateItem(curElem.id)}} /></div></div>
                </div>
                    )
                })}
                
                <div className='d-flex justify-content-center mt-5'>
                    <button type="button" className=" btn btn-danger" onClick={clearItems}>Clear All</button></div>
            </div>
        </>
    )
}

export default Inputbar