import { createBrowserRouter, Link, Navigate, Outlet } from "react-router";
import { ProductsRouter } from "../features/products/router";
import { ProductsPage } from "../features/products/page";
import RouteChangeHandler from "./change-handler";
import { FeaturesRouter } from "./types";
import { Features } from "../entities/features";
import { Layout } from "../components/layout";
import { CartPage } from "../features/cart/page";
import { ProductsItemPage } from "../features/products-item/page";
import { ProductsItemRouter } from "../features/products-item/router";
import { Header } from "../components/header";

export const features: FeaturesRouter = {
  [Features.Products]: ProductsRouter,
  [Features.ProductsItem]: ProductsItemRouter,

}

const SharedLayout = () => (
  <>
    <Layout
      Header={<Header />}
      Content={
        <Outlet />
      }
      Footer={<>Footer</>}
    />
    <RouteChangeHandler features={features} />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <SharedLayout />,
    children: [
      { path: '/', element: <Navigate to="/products" replace /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductsItemPage /> },
      { path: '/cart', element: <CartPage /> },
    ],
  },
]);

export default router;