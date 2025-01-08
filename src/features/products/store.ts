import { createSelector, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../entities/product';
import { RootState } from '../../store';
import { Category } from '../../entities/category';

interface ProductsState {
    allIds: Product['id'][];
    byIds: Record<Product['id'], Product>;
    filter: {
        search: string;
        categories: Record<Category['name'], boolean>;
    },
    loading: boolean;
    categories: Category[];
}

const initialState: ProductsState = {
    allIds: [],
    byIds: {},
    filter: {
        search: '',
        categories: {},
    },
    loading: false,
    categories: [],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    filterByTitle: (state, action) => {
        state.filter.search = String(action.payload);
    },
    resetFilterByTitle: (state) => {
        state.filter.search = '';
    },
    filterByCategory: (state, action) => {
        state.filter.categories = action.payload;
    },
    resetFilterByCategory: (state) => {
        const updated = JSON.parse(JSON.stringify(state.filter.categories));

        Object.keys(state.filter.categories).forEach((categoryName) => {
            updated[categoryName] = false;
        });

        state.filter.categories = updated;
    },
    setProducts: (state, action) => {
        const allIds: Product['id'][] = [];
        const byIds: Record<Product['id'], Product> = {};

        const categoryIds: Category['id'][] = [];
        const categories: Category[] = [];
        const filterByCategories: Record<Category['name'], boolean> = {};

        (action.payload as Product[]).forEach((product) => {
            allIds.push(product.id);
            byIds[product.id] = product;
            
            if (!categoryIds.includes(product.category.id)) {
                categories.push(product.category);
                categoryIds.push(product.category.id);
                filterByCategories[product.category.name] = false;
            }
        });

        state.allIds = allIds;
        state.byIds = byIds;
        state.categories = categories;
        state.filter.categories = filterByCategories;
    },
    appendProduct: (state, action) => {
        if (state.allIds.includes(action.payload.id)) {
            return;
        }

        const allIds = state.allIds.slice();
        const byIds = { ... state.byIds };
        
        allIds.push(action.payload.id);
        byIds[action.payload.id] = action.payload;

        state.allIds = allIds;
        state.byIds = byIds;
    }
  }
})

export const { filterByTitle, resetFilterByTitle, setProducts, setLoading, filterByCategory, resetFilterByCategory, appendProduct } = productsSlice.actions

export const selectFilteredProducts = createSelector(
    [(state: RootState) => state.products],
    (products) => {
        const filterByTitle = products.filter.search.toLocaleLowerCase();
        const filterByCategories = products.filter.categories;
        const untouchedCategories = Object.keys(products.filter.categories).every((categoryName) => products.filter.categories[categoryName] === false)
        const allProducts = products.allIds.map((productId) => products.byIds[productId]);

        if (filterByTitle.length === 0 && untouchedCategories) return allProducts;

        return allProducts
            .filter((product) => filterByCategories[product.category.name])
            .filter((product) => product.title.toLocaleLowerCase().includes(filterByTitle));
    }
);

export const selectSearchFilter = createSelector(
    [(state: RootState) => state.products],
    (products) => products.filter.search
);

export const selectLoading = createSelector(
    [(state: RootState) => state.products],
    (products) => products.loading
);

export const selectCategories = createSelector(
    [(state: RootState) => state.products],
    (products) => products.categories
)

export const selectFilterByCategories = createSelector(
    [(state: RootState) => state.products],
    (products) => products.filter.categories,
)

export const selectProduct = (id: number) => createSelector(
    [(state: RootState) => state.products],
    (products) => products.byIds[id]
)

export default productsSlice.reducer