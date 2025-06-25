import config from "~/Config";
// Page
import Home from "~/Pages/Home";

// các router không cần đăng nhập
const publicRouter = [];
// các router cần cần đăng nhập
const UserRouter = [];
// Các router cần đăng nhập và có role Admin
const routerAdmin = [];
