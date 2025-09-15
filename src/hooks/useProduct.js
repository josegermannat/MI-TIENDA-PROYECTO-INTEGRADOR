import { useEffect, useState } from "react";
import productsApi from "../api/products.api.js";

export const useProduct = () => {
    const [ products, setProducts ] = useState();
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await productsApi.fetchProducts();
            setProducts(data);
        } catch (error) {
            setProducts([]);
            setFilteredProducts([]);
            setError(error.message || "Error al cargar productos.");
        }

        setIsLoading(false);
    };

    const fetchProductById = async (id) => {
        setIsLoading(true);
        setError(null);
        let product = null;

        try {
            product = await productsApi.fetchProductById(id);
        } catch (error) {
            setError(error.message || "Error al carga producto.");
        }

        setIsLoading(false);
        return product;
    };

    const createProduct = async (values) => {
        setIsLoading(true);
        setError(null);
        let product = null;

        try {
            product = await productsApi.createProduct(values);
        } catch (error) {
            setError(error.message || "Error al crear producto.");
        }

        setIsLoading(false);
        return product;
    };

    const updateProduct = async (id, values) => {
        setIsLoading(true);
        setError(null);
        let product = null;

        try {
            product = await productsApi.updateProduct(id, values);
        } catch (error) {
            setError(error.message || "Error al modificar producto.");
        }

        setIsLoading(false);
        return product;
    };

    const removeProduct = async (id) => {
        setIsLoading(true);
        setError(null);

        try {
            await productsApi.removeProduct(id);
        } catch (error) {
            setError(error.message || "Error al eliminar producto.");
        }

        setIsLoading(false);
    };

    const checkProductStock = async (id) => {
        setIsLoading(true);
        setError(null);
        let result = false;

        try {
            result = await productsApi.checkProductStock(id);
        } catch (error) {
            setError(error.message || "Error al chequear stock de producto.");
        }

        setIsLoading(false);
        return result;
    };

    const searchProducts = (term) => {
        setSearchTerm(term);

        if (!term.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase()),
        );

        setFilteredProducts(filtered);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setFilteredProducts(products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    return {
        products,
        filteredProducts,
        searchTerm,
        isLoading,
        error,
        fetchProducts,
        fetchProductById,
        createProduct,
        updateProduct,
        removeProduct,
        checkProductStock,
        searchProducts,
        clearSearch,
    };
};