import './App.css';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Default from './components/DefaultLayout';


function App() {
  return (
    <>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          return (
            <Route key={route.path} path={route.path} element={
              route.isShowHeader ? <Default child={<Page />} /> : <Page />
            } />
          )
        })}
      </Routes>
    </>
  );
}

export default App;
