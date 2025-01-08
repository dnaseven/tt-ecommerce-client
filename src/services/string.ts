export const StringService = {
    isValidUrl(string: string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
}