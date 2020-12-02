import {useState} from 'react'
import { nanoid } from 'nanoid'
import { Button,Input,TextField,NativeSelect,InputLabel,MenuItem, IconButton, InputAdornment } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';


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
    {
        name:"column3",
        id:103,
        items:[
            {name:"item1", id:7},
        ]
    }
]

const ItemApp =()=>{
    const [columnData, setColumnData] =useState(colData)
    const [searchTerm, setSearchTerm] = useState("")

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

    const handleSearchChange = (event) =>{
        setSearchTerm(event.target.value)
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
        )), setNewEntry("")
    )
  }

    const ColumnGrid = ()=>{
        const Columns = ()=>columnData.map((column) => {
            const Items = ()=> column.items.map(({...item}) => {
                return item.name.includes(searchTerm) &&
                (
                <div key={item.id} style={{display:"grid", gridTemplateColumns: "1fr 50px"}}>
                    <span style={{margin: "auto 2px"}}>{item.name}</span>
                    <IconButton aria-label="delete"  onClick={handleItemDelete} name={item.id} >
                        <CancelIcon/>
                    </IconButton>
                </div>)
            })
                return(
                    <div key={column.name}>
                        <div key={column.name}>{column.name}</div>
                        <Items/>
                    </div>
                )
            }
        )
        
        return(
            <div className="columns" style={{display:"grid", columnGap: "10px", gridAutoFlow: "column"}}>
                <Columns/>
            </div>
        )
    }

    return(
    <>
        <h2>Add an item</h2>
        <div style={{display:"grid", gridTemplateColumns:`1fr ${columnData.length}fr`}}>
            <div className="column-entry">
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
                {columnData.map(column=>{
                    return <option value={column.id} key={column.id}>{column.name}</option>
                })}
                </NativeSelect>
                <Button color="primary" onClick={addItem}>Add Item</Button> 
            </form>
            <form>
                <TextField id="standard-search" label="Search an Item" type="search" placeholder="search..." onChange={handleSearchChange}
                InputProps={{
                    startAdornment:(<SearchIcon />)
                }}/>
            </form>
            </div>
            <ColumnGrid colData={columnData} />
        </div>
    </>
    )
}

export default ItemApp