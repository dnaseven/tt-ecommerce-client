import { FC } from 'react';
import { Button, Strong, Text } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { selectCart, selectTotalPrice } from '../store';
import styles from './styles.module.css';

export const CartFooter: FC = () => {
    const cart = useSelector(selectCart);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <div className={styles.wrapper}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <div>
                        <Text as="p">
                            <Strong>
                                Sub-Total
                            </Strong>
                        </Text>
                    </div>
                    <div>
                        <Text size="2" color="gray">
                            {cart.length} items
                        </Text>
                    </div>
                </div>
                <div>
                    <Text as="p" size="7">
                        <Strong>
                            ${(new Intl.NumberFormat('en-US', { currency: 'USD' })).format(totalPrice)}
                        </Strong>
                    </Text>
                </div>
            </div>
            <div style={{ marginTop: 20, width: '100%' }}>
                <Button
                    color="green"
                    size="4"
                    radius="full"
                    style={{ width: '100%' }}
                    disabled={cart.length === 0}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
}