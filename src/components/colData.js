const colData = [
    {
        name:"column 1",
        id:"101",
        items:[
            {name:"item1", id:"qqxyg4"},
            {name:"item2", id:"iwm8zh"},
            {name:"item3", id:"7d5gan"},
        ]
    },
    {
        name:"column 2",
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

export const ALL_COLUMNS = localStorage.getItem('columnData')
? JSON.parse(localStorage.getItem('columnData'))
: colData

export default colData