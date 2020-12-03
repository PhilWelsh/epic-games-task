import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';

const colData = [
    {
        name:"column1",
        id:"101",
        items:[
            {name:"item1", id:"qqxyg4"},
            {name:"item2", id:"iwm8zh"},
            {name:"item3", id:"7d5gan"},
        ]
    },
    {
        name:"column2",
        id:"102",
        items:[
            {name:"item1", id:"qgifJq"},
            {name:"item2", id:"rxt8ca"},
            {name:"item3", id:"mtb7pq"},
        ]
    },    
    // {
    //     name:"column3",
    //     id:"103",
    //     items:[
    //         {name:"item1", id:"7naef7"},
    //     ]
    // }
]

    const ALL_COLUMNS = localStorage.getItem('columnData')
  ? JSON.parse(localStorage.getItem('columnData'))
  : colData

const ItemApp =()=>{
    const [columnData, setColumnData] =useState(ALL_COLUMNS)
    const [searchTerm, setSearchTerm] = useState("")
    const [snackbarValue, setSnackbarValue] = useState({open:false})
    const [selectedColumnValue, setSelectedColumnValue] = useState();
    useEffect(() => {
        localStorage.setItem('columnData', JSON.stringify(columnData))
      }, [columnData])
      
    const handleSelectChange = (e) => {
        const name = e.target.name;
        setSelectedColumnValue({
          ...selectedColumnValue,
          [name]: e.target.value,
        });
      };
    

    const handleItemDelete = (e)=>{
        const currentTargetId = e.currentTarget.name 
        setColumnData(columnData.map(column => ({
            ...column,
            items: column.items
            .filter(item => item.id !== (currentTargetId))
        })));
        console.log(currentTargetId);
        setSnackbarValue({
            open:true,
            severity:"success",
            message:"item deleted"
        })
    }

    const handleSearchChange = (e) =>{
        setSearchTerm(e.target.value)
    }

  const addItem = (e)=>{
    e.preventDefault();
    const itemName = e.target[0].value
    const columnName = selectedColumnValue?.column
    const bothInvalid = (!itemName && !columnName) ? true : false
      return (!columnName || !itemName) ? (
        setSnackbarValue({
            open:true,
            severity:"error",
            message:`Please provide a valid ${!columnName ? "column":""}${bothInvalid ? " and " : "" }${!itemName ? "item": ""} and submit again.`
        })
      ) : ( 
        setColumnData(prevState => (
        [...prevState.map(el => (
            el.id === columnName ? { ...el, items: [...el.items, {name:itemName, id:nanoid()}] } : el
            ))
        ]
        )),setSnackbarValue({
            open:true,
            severity:"success",
            message:"item added"    
        })
    )
  }

    const SimpleSnackbar=()=> {
        const handleClose = (reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackbarValue(({values})=>({...values, open:false}));
        };

        return (
                <Snackbar open={snackbarValue.open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={snackbarValue.severity}>
                        {snackbarValue.message}
                    </Alert>
                </Snackbar>
        );
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
        <Button variant="outlined" onClick={()=>setColumnData(colData)} style={{marginTop:10, width:"100%"}}>Reset Items</Button> 
        <SimpleSnackbar/>
    </div>
    )
}

export default ItemApp