import {useState} from 'react'
import { Button,Input,TextField,NativeSelect,InputLabel,MenuItem, IconButton,  } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const colData = [
    {
        name:"column1",
        items:[
            "item1",
            "item2",
            "item3"
        ]
    },
    {
        name:"column2",
        items:[
            "item1",
            "item2",
            "item3"
        ]
    }
]
// const colData = [
//     {
//         name:"column1",
//         items:[
//             {name:"item1", id:1},
//             {name:"item2", id:2},
//             {name:"item3", id:3},
//         ]
//     },
//     {
//         name:"column2",
//         items:[
//             {name:"item1", id:1},
//             {name:"item2", id:2},
//             {name:"item3", id:3},
//         ]
//     }
// ]

const ItemApp =()=>{
    const [columnData, setColumnData] =useState(colData)
    const [filteredData, setFilteredData] = useState(colData)

// const [values, setValues] = useState({
//     column: "one",
//     name: "hai"
//   });

//   const handleChange = (event) => {
//     const name = event.target.name;
//     setValues({
//       ...values,
//       [name]: event.target.value,
//     });
//   };

    const ColumnGrid = ({colData})=>{
        const columnCount = colData.length
        //for each column
        const Columns = ()=>colData.map((column, colI) => {
            const Items = ()=> column.items.map((item, itemI) => {
                const handleItemDelete = (e)=>{
                    console.log(e.currentTarget.name)
                    const currentTargetId = e.currentTarget.name 
                    setColumnData(columnData.map(column => ({
                        ...column,
                        items: column.items
                        .filter(item => item !== currentTargetId)
                    })))
                    console.log(columnData)
                }
                return(
                <div key={itemI} data-attr={itemI}>
                    <span>{item}</span>
                    <IconButton aria-label="delete"  onClick={handleItemDelete} name={item} >
                        <CancelIcon/>
                    </IconButton>
                </div>)
            })

                return(
                    <div style={{flex:1}} key={colI}>
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
            {/* <form><TextField defaultValue="Enter Item"/>
                <NativeSelect
                value={values.column}
                onChange={handleChange}
                inputProps={{
                    name: 'column',
                    id: 'column-native-helper',
                }}
                >
                <option aria-label="None" value="Choose Column" >Choose Column</option>
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                </NativeSelect>
                <Button color="primary">Add Item</Button> 
            </form> */}
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