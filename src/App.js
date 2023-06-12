import './App.css';
import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Topics } from './components/Topics/Topics';
import { Blog } from './components/Blog/Blog';


function App() {
  return (
    <div className="App">
      <div className='main__app__container'>
        <Routes>
          <Route path="/" element={<><Topics /></>} />
          <Route path='/topic/:id' element={<Blog />} />
          <Route path="*" element={
            <PageNotFound />
          } />
        </Routes>
      </div>
    </div >

  );
}

export default App;
