import { FC } from "react";
import { CartTemplate } from "./template";
import { CartHeader } from "./header";
import { CartContent } from "./content";
import { CartFooter } from "./footer";

export const CartPage: FC = () => {
    return (
        <CartTemplate
            Header={<CartHeader />}
            Content={<CartContent />}
            Footer={<CartFooter />}
        />
    );
}