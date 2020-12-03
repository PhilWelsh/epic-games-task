import ItemApp from "./ItemApp";
import "./App.scss";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>Item App</title>
        <meta
          name="description"
          content="An app for all your item in column needs"
        />
      </Helmet>
      <div className="App theme">
        <header className="App-header">
          <h1>
            <i>Marvelous!</i>
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since.
          </p>
        </header>
        <section>
          <ItemApp />
        </section>
      </div>
    </>
  );
}

export default App;
