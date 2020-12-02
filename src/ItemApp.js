import {useState} from 'react'
import { nanoid } from 'nanoid'
import { Button,TextField,NativeSelect,IconButton } from '@material-ui/core';
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
    const [searchTerm, setSearchTerm] = useState("")

    const [selectedColumnValue, setSelectedColumnValue] = useState();
    const handleSelectChange = (event) => {
        const name = event.target.name;
        setSelectedColumnValue({
          ...selectedColumnValue,
          [name]: event.target.value,
        });
      };
    

    const handleItemDelete = (e)=>{
        const currentTargetId = e.currentTarget.name 
        setColumnData(columnData.map(column => ({
            ...column,
            items: column.items
            .filter(item => item.id !== (Number(currentTargetId)))
        })))
    }

    const handleSearchChange = (event) =>{
        setSearchTerm(event.target.value)
    }

  const addItem = (event)=>{
    event.preventDefault();
    const newEntry = event.target[0].value
    // const columnValue = selectedColumnValue?.column
      return (!selectedColumnValue?.column || !event.target[0].value) ? (
          console.log("error message function")
      ) : ( 
        setColumnData(prevState => (
        [...prevState.map(el => (
            el.id === (Number(selectedColumnValue.column)) ? { ...el, items: [...el.items, {name:newEntry, id:nanoid()}] } : el
            ))
        ]
        ))
    )
  }

    const ColumnGrid = ()=>{
        const Columns = ()=>columnData.map((column) => {
            const Items = ()=> column.items.map(({...item}) => {
                return item.name.includes(searchTerm) &&
                (
                <div key={item.id} className="item-app-column-item">
                    <span>{item.name}</span>
                    <IconButton aria-label="delete"  onClick={handleItemDelete} name={item.id} >
                        <CancelIcon/>
                    </IconButton>
                </div>)
            })
                return(
                    <div className="item-app-column-container" key={column.name}>
                        <h3 key={column.name}>{column.name}</h3>
                        <Items/>
                    </div>
                )
            }
        )
        
        return(
            <div className="item-app-columns">
                <Columns/>
            </div>
        )
    }

    return(
    <div className="item-app">
        <h2>Add an item</h2>
        <div className="item-app-grid" style={{gridTemplateColumns:`1fr ${columnData.length}fr`}}>
            <div className="item-app-column-forms">
            <form onSubmit={addItem}>
                <div className="item-app-form-entry">
                    <TextField variant="outlined" id="new-entry-input" label="Enter Item"/>
                    {console.log(selectedColumnValue)}
                    <NativeSelect
                    variant="outlined"
                    value={selectedColumnValue?.column}
                    onChange={handleSelectChange}
                    inputProps={{
                        name: 'column',
                        id: 'column-native-helper',
                    }}
                    >
                    <option aria-label="None" value="" >Choose Column</option>
                    {columnData.map(column=>{
                        return <option value={column.id} key={column.id}>{column.name}</option>
                    })}
                    </NativeSelect>
                </div>
                <Button type="submit" variant="outlined">Add Item</Button> 
            </form>
            <TextField id="standard-search" label="Search an Item" type="search" placeholder="search..." onChange={handleSearchChange} variant="outlined"
            InputProps={{
                startAdornment:(<SearchIcon />)
            }}/>
            </div>
            <ColumnGrid colData={columnData} />
        </div>
    </div>
    )
}

export default ItemApp