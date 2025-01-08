import { ChangeEventHandler, FC } from "react";
import { ProductsPageTemplate } from "./template";
import { useSelector } from "react-redux";
import { selectFilteredProducts, selectLoading, selectSearchFilter } from "./store";
import { ProductsService } from "./service";
import { Filter } from "./filter";
import { ProductsList } from "./list";
import { selectCart } from "../cart/store";
import { Product } from "../../entities/product";

export const ProductsPage: FC = () => {
  
  const filteredProducts = useSelector(selectFilteredProducts);
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);


  const handleAddProduct = (product: Product) => {
    ProductsService.addProductToCart(product);
  }

  const handleRemoveProduct = (productId: Product['id']) => {
    ProductsService.removeProductFromCart(productId);
  }

  const handleIncreaseQuantity = (productId: Product['id']) => {
    ProductsService.increaseQuantity(productId);
  }

  const handleDecreaseQuantity = (productId: Product['id']) => {
    ProductsService.decreaseQuantity(productId);
  }

  return (
    <ProductsPageTemplate
      loading={loading}
      Filter={
        <Filter  />
      }
      Content={<ProductsList products={filteredProducts} onAdd={handleAddProduct} />}
      CartDrawer={<div>Cart Drawer</div>}
    />
  );
}

