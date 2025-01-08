import { FC } from "react";
import { ProductsPageTemplate } from "./template";
import { useSelector } from "react-redux";
import { selectFilteredProducts, selectLoading } from "./store";
import { ProductsService } from "./service";
import { Filter } from "./filter";
import { ProductsList } from "./list";
import { Product } from "../../entities/product";

export const ProductsPage: FC = () => {
  
  const filteredProducts = useSelector(selectFilteredProducts);
  const loading = useSelector(selectLoading);

  const handleAddProduct = (product: Product) => {
    ProductsService.addProductToCart(product);
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

