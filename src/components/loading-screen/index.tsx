import { Box, Spinner } from "@radix-ui/themes"
import { FC } from "react"

export const LoadingScreen: FC = () => {
    return (
        <Box style={{
            backgroundColor: 'rgba(200, 200, 200, 0.5)',
            minWidth: '100vw',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Spinner size="3" style={{ zIndex: 10 }} />
        </Box>
    )
}