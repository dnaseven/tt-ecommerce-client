import { FC } from "react";
import { Button, Text } from '@radix-ui/themes';
import { CartService } from "../service";
import { useSelector } from "react-redux";
import { selectCart } from "../store";

export const CartHeader: FC = () => {
    const cart = useSelector(selectCart);

    return (
        <>
            <h1>
                <Text as="p" size="8" color="gray">
                    Cart
                </Text>
            </h1>
            <div>
                <Button variant="ghost" onClick={CartService.removeAllFromCart} disabled={cart.length === 0}>
                    Remove All
                </Button>
            </div>
        </>
    )
}