import { Box, Button, Checkbox, Flex, Strong, Text, TextField } from "@radix-ui/themes";
import { ChangeEventHandler, FC } from "react";
import { useSelector } from "react-redux";
import { selectCategories, selectFilterByCategories, selectSearchFilter } from "../store";
import { ProductsService } from "../service";
import { Category } from "../../../entities/category";
import styles from './styles.module.css';

interface Props {}

export const Filter: FC<Props> = () => {
    const categories = useSelector(selectCategories);
    const filterByCategories = useSelector(selectFilterByCategories);
    const searchFilter = useSelector(selectSearchFilter);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        ProductsService.filterByTitle(e.target.value);
    }

    const handleFilterReset = () => {
        ProductsService.resetFilter();
    }

    const handleUpdateCategories: (category: Category) => (checked: boolean) => void = (category) => (checked) => {
        const newCategories = {...filterByCategories};
        newCategories[category.name] = checked;

        ProductsService.filterByCategories(newCategories);
    }

    return (
        <div className={styles.wrapper}>
            <Text as="p" className={styles.titleWrapper}>
                <Strong>
                    Filter
                </Strong>
            </Text>
            <Box maxWidth="300px" className={styles.inputWrapper}>
                <TextField.Root size="3" placeholder="Search for product..." onChange={handleInputChange} value={searchFilter} />
            </Box>

            <Text className={styles.categoriesTitleWrapper}>
                <Strong>Categories</Strong>
            </Text>

            <Box className={styles.categoriesWrapper}>
                {
                    categories.map((category) => (
                        <Text as="label" size="2" key={category.id} className={styles.categoryWrapper}>
                            <Flex gap="2" mb="1">
                                <Checkbox defaultChecked={filterByCategories[category.name]} name={category.name} onCheckedChange={handleUpdateCategories(category)} />
                                {category.name}
                            </Flex>
                        </Text>
                    ))
                }
            </Box>


            <Button onClick={handleFilterReset} className={styles.resetButton}>Reset</Button>
        </div>
    );
}