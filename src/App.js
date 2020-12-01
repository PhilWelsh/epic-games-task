import { Button,Input,NativeSelect,InputLabel  } from '@material-ui/core';

import './App.scss';

function App() {
  return (
    <div className="App" style={{maxWidth:600}}>
      <header className="App-header">
        <h1>Marvelous!</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
      </header>
      <section>
      <h2>Add an item</h2>
        <div style={{display:"flex"}}>
          <div className="column-entry" style={{flex:1}}>
            <form>
              <input></input>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              {/* <TextField defaultValue="Enter Item"/>
               <NativeSelect
                value={"state.age"}
                inputProps={{
                  name: 'age',
                  id: 'age-native-helper',
                }}
              >
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
              </NativeSelect>
              <Button>Add Item</Button> <Input type="search" label="Search an Item"/>*/}
            </form>
            <form>
              <input type="search"></input>
            </form>
          </div>
          <div className="columns" style={{flex:2, display:"flex"}}>
            <div className="column"style={{flexGrow:1}}>
              <div className="column1">Column 1</div>
              <div>{"Item"}</div>
            </div>
            <div className="column" style={{flexGrow:1}}>
              <div className="column2">Column 2</div>
              <div>{"Item"}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
