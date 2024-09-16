import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import Layout from "./components/layout/layout.component";
import HomePage from "./pages/home-page/home-page.component";
import CategoriesPage from "./pages/categories-page/categories-page.component";
import OrdersPage from "./pages/orders-page/orders-page.component";
import ClientsPage from "./pages/clients-page/clients-page.component";
import ProductsPage from "./pages/products-page/products-page.component";
import UsersPage from "./pages/users-page/users-page.component";
import LoginPage from "./pages/login-page/login-page.component";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Route>
    )
);

export default router;