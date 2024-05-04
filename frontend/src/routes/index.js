import Detail from "../page/DetailPage";
import HomePage from "../page/HomePage";
import Login from "../page/LoginPage";
import NotFound from "../page/NotFoundPage";
import Order from "../page/OrderPage";
import Product from "../page/ProductPage";
import Register from "../page/RegisterPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: Product,
        isShowHeader: true
    },
    {
        path: '/detail/:id',
        page: Detail,
        isShowHeader: true
    },
    {
        path: '/order',
        page: Order,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: false
    },
    {
        path: '/register',
        page: Register,
        isShowHeader: false
    },

    {
        path: '*',
        page: NotFound,
        isShowHeader: false
    }
]