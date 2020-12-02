import {useState} from 'react'
import { nanoid } from 'nanoid'
import { Button,Input,TextField,NativeSelect,InputLabel,MenuItem, IconButton,  } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';


const colData = [
    {
        name:"column1",
        id:101,
        items:[
            {name:"item1", id:1},
            {name:"item2", id:2},
            {name:"item3", id:3},
        ]
    },
    {
        name:"column2",
        id:102,
        items:[
            {name:"item1", id:4},
            {name:"item2", id:5},
            {name:"item3", id:6},
        ]
    },    
    // {
    //     name:"column3",
    //     id:103,
    //     items:[
    //         {name:"item1", id:7},
    //     ]
    // }
]

const ItemApp =()=>{
    const [columnData, setColumnData] =useState(colData)
    const [filteredData, setFilteredData] = useState(colData)

    const [values, setValues] = useState({
        column:{...colData}
    });
    const [newEntry,setNewEntry] = useState("")
    function handleNewEntryChange (e){
        setNewEntry(e.target.value)
    }

    const handleItemDelete = (e)=>{
        const currentTargetId = e.currentTarget.name 
        setColumnData(columnData.map(column => ({
            ...column,
            items: column.items
            .filter(item => (item.id != currentTargetId))
        })))
    }

  const handleChange = (event) => {
    const name = event.target.name;
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const addItem = ()=>{
      return (values.column)==="Choose Column" ? (
          console.log("error")
      ) : ( 
        setColumnData(prevState => (
        [...prevState.map(el => (
            el.id == values.column ? { ...el, items: [...el.items, {name:newEntry, id:nanoid()}] } : el
            ))
        ]
        ))
    )
  }

    const ColumnGrid = ({colData})=>{
        const columnCount = colData.length

        //for each column
        const Columns = ()=>colData.map((column) => {
            const Items = ()=> column.items.map(({...item}) => {
                return(
                <div key={item.id}>
                    <span>{item.name}</span>
                    <IconButton aria-label="delete"  onClick={handleItemDelete} name={item.id} >
                        <CancelIcon/>
                    </IconButton>
                </div>)
            })
                return(
                    <div style={{flex:1}} key={column.name}>
                        <div key={column.name}>{column.name}</div>
                        <Items/>
                    </div>
                )
            }
        )
        
        return(
            <div className="columns" style={{flex:columnCount, display:"flex"}}>
                <Columns/>
            </div>
        )
    }

    return(
    <>
        <h2>Add an item</h2>
        <div style={{display:"flex"}}>
            <div className="column-entry" style={{flex:1}}>
            <form>
                <TextField onChange={handleNewEntryChange} value={newEntry}/>
                <NativeSelect
                value={values.column}
                onChange={handleChange}
                inputProps={{
                    name: 'column',
                    id: 'column-native-helper',
                }}
                >
                <option aria-label="None" value="Choose Column" >Choose Column</option>
                {console.log(columnData),columnData.map(column=>{
                    return <option value={column.id} key={column.id}>{column.name}</option>
                })}
                </NativeSelect>
                <Button color="primary" onClick={addItem}>Add Item</Button> 
            </form>
            <form>
                <Input color="primary" type="search" label="Search an Item"/>
            </form>
            </div>
            <ColumnGrid colData={columnData} />
        </div>
    </>
    )
}

export default ItemApp