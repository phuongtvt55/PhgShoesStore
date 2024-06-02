import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { routes } from './routes';
import Default from './components/DefaultLayout';
import { useDispatch } from 'react-redux';
import { getUserById } from './rest/api/user';
import { updateUser } from './redux/slice/userSlice';
import { useEffect, useState } from 'react';
import { checkExp, decodeJwt } from './untils/jwtDecode';
import { refresh } from './rest/api/auth';


function App() {
  //check user is login
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      const checkToken = checkExp(token)
      if (!checkToken) {
        //handleRefresh()
        localStorage.clear("access_token")
        navigate("/login")
      } else {
        storeUser()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const storeUser = () => {
    const token = localStorage.getItem("access_token")
    const decode = decodeJwt(token)
    getUser(decode?.payload.id, token)
  }

  const getUser = async (id, access_token) => {
    try {
      const res = await getUserById(id);
      dispatch(updateUser({ ...res.data, access_token }));
    } catch (e) {
      console.log(e)
    }

  };

  const handleRefresh = async () => {
    try {
      const res = await refresh()
      localStorage.setItem("access_token", res.data.access_token)
      storeUser()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          const checkAuth = !route.isPrivate
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
