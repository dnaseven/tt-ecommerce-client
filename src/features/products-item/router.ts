import router from "../../router";
import { FeatureRouter } from "../../router/types";
import { ProductsService } from "../products/service";

export const ProductsItemRouter: FeatureRouter = {
    match(url: string) {
        return /\/products\/(\d+)/.test(url);
    },
    handle(location) {
        const [,,idString] = location.pathname.split('/');
        const id = Number(idString);
        ProductsService.getProductById(id);
    },
}