import './App.css';
import { reactRouter } from './Route/Router';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div id="blankMap">
        <div className='container mx-auto'>
          <div className='home-background border bg-[#ececec90] p-2 relative'>
            <RouterProvider router={reactRouter}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
