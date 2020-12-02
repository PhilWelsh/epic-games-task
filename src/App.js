import ItemApp from './ItemApp'
import './App.scss';

function App() {
  
  return (
    <div className="App" style={{maxWidth:600}}>
      <header className="App-header">
        <h1>Marvelous!</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
      </header>
      <ItemApp/>
    </div>
  );
}

export default App;
