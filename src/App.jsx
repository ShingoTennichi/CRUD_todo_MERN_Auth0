import { BrowserRouter as Router} from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Header from './components/Header';
import Main from './components/Main';


function App() {

    return (
        <>
            <Router>
                <Navbar />
                <Header />
                <Main />
            </Router>
        </>
    )
}

export default App
