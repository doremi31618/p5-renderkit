import logo from './logo.svg';
import './App.css';
import Question from './component/Question';
import Setting from './component/Setting';
import CustomInfo from './component/CustomInfo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CustomInfo />
        <Question />
        <Setting />
      </header>
    </div>
  );
}

export default App;
