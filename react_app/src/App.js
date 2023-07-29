import logo from './logo.svg';
import './App.css';
import Question from './component/Question';
import Setting from './component/Setting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Question />
        <Setting />
      </header>
    </div>
  );
}

export default App;
