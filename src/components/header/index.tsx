import { FC, useState } from "react"
import styles from './styles.module.css';
import { Badge, Button, Link as UiLink } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { selectCart } from "../../features/cart/store";
import { CartIcon } from "../cart-icon";
import { Link as RouterLink, useHref, useLocation, useNavigate } from "react-router";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const CounterBadge = () => {
    const cart = useSelector(selectCart);

    if (cart.length === 0) return null;

    return (
        <Badge className={styles.badge} radius="large">
            {cart.length}
        </Badge>
    )
}

export const Header: FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cart = useSelector(selectCart);
    const emptyCart = cart.length === 0;
    const navigate = useNavigate();
    const location = useLocation();

    const isCart = location.pathname === '/cart';

    const handleOpenMobileMenu = () => {
        setMobileMenuOpen(true);
    }

    const handleCloseMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    const handleCartClick = () => {
        navigate('/cart');
    }

    const handleMobileMenuClick = () => {
        setTimeout(() => {
            setMobileMenuOpen(false)
        })
    }

    return (
        <header className={styles.wrapper}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <RouterLink to="/">
                        E-Commerce
                    </RouterLink>
                </div>
                <nav className={styles.menu}>
                    <ul>
                        <li>
                            <RouterLink to="/">Home</RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/products">Products</RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.right}>
                <div className={styles.mobileMenu}>
                    <Button onClick={handleOpenMobileMenu}>
                        <HamburgerMenuIcon width={25} height={35} />
                    </Button>

                    <div className={styles.floatingMobileCart}>
                        {cart.length > 0 && !isCart && (
                            <Button color={emptyCart ? 'gray' : 'tomato' } onClick={handleCartClick} radius="full">
                                <CartIcon />
                            </Button>
                        )}
                    </div>

                    <div className={styles.mobileMenuPaper} data-open={mobileMenuOpen}>
                        <div className={styles.mobileMenuPaperHeader}>
                            <Button onClick={handleCloseMobileMenu}>
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className={styles.mobileMenuPaperBody}>
                            <ul>
                                <li>
                                    <RouterLink to="/" onClick={handleMobileMenuClick}>Home</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/products" onClick={handleMobileMenuClick}>Products</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/cart" onClick={handleMobileMenuClick}>Cart</RouterLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.cart}>
                    <Button color={emptyCart ? 'gray' : 'tomato' } onClick={handleCartClick}>
                        <CartIcon />
                        Cart
                        <CounterBadge />
                    </Button>
                </div>
            </div>
        </header>
    )
}