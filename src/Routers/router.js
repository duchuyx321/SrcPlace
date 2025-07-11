import config from "~/Config";
// Page
import Home from "~/Pages/Home";
import DetailProduct from "~/Pages/DetailProduct";
import NotFund from "~/Pages/NotFound.js";
import Products from "~/Pages/Products";

// các router không cần đăng nhập
const PublicRouters = [
    { path: config.routers.home, component: Home },
    { path: config.routers.detailProduct, component: DetailProduct },
    { path: config.routers.products, component: Products },
    { path: config.routers.notFound, component: NotFund, layout: null },
];
// các router cần cần đăng nhập
const UserRouters = [];
// Các router cần đăng nhập và có role Admin
const AdminRouters = [];

export { PublicRouters, UserRouters, AdminRouters };
