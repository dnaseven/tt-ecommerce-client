import { forwardRef } from "react";
import { ComponentPropsWithout, RemovedProps } from "@radix-ui/themes/dist/cjs/helpers/component-props";

type IconElement = React.ElementRef<'svg'>;
interface IconProps extends ComponentPropsWithout<'svg', RemovedProps | 'children'> { }

export const CartIcon = forwardRef<IconElement, IconProps>((props, forwardedRef) => {
    return (
        <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            ref={forwardedRef}
        >
            <path d='M16.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M3.71 5.4h15.214c1.378 0 2.373 1.27 1.995 2.548l-1.654 5.6C19.01 14.408 18.196 15 17.27 15H8.112c-.927 0-1.742-.593-1.996-1.452zm0 0L3 3' />
        </svg>
    );
}
);

CartIcon.displayName = 'CartIcon';