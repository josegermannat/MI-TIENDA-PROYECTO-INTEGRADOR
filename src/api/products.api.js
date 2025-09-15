const KEY_PRODUCTS = "products";
import productsData from "@/const/dataProducts";
const generateId = (products) => {
    let maxId = 0;

    products.forEach((item) => {
        if (item.id > maxId){
            maxId = item.id;
        }
    });

    return maxId + 1;
};

const getProductsFromLocalStorage = () => {
    const data = localStorage.getItem(KEY_PRODUCTS);

    if (!data) {
        // Si no hay nada, guardar el array inicial
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(productsData));
        return productsData;
    }

    return JSON.parse(data) || [];
};
const fetchProducts = () => {
    return new Promise((resolve) => {
        resolve(getProductsFromLocalStorage());
    });
};

const fetchProductById = (id) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
            reject(new Error("Producto no encontrado."));
        }

        resolve(product);
    });
};

const createProduct = (values) => {
    return new Promise((resolve) => {
        const products = getProductsFromLocalStorage();

        const product = { ...values, id: generateId(products) };
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify([ ...products, product ]));

        resolve(product);
    });
};

const updateProduct = (id, values) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const index = products.findIndex((item) => item.id === parseInt(id));
        if (index === -1) {
            reject(new Error("Producto no encontrado."));
        }

        products[index] = { ...products[index], ...values };
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));

        resolve(products[index]);
    });
};

const removeProduct = (id) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const index = products.findIndex((item) => item.id === parseInt(id));
        if (index === -1) {
            reject(new Error("Producto no encontrado."));
        }

        const updatedProducts = products.filter((item) => item.id !== parseInt(id));
        localStorage.setItem(KEY_PRODUCTS, JSON.stringify(updatedProducts));

        resolve(products[index]);
    });
};

const checkProductStock = (id, quantity) => {
    return new Promise((resolve, reject) => {
        const products = getProductsFromLocalStorage();

        const product = products.find((item) => item.id === parseInt(id));
        if (!product) {
            reject(new Error("Producto no encontrado."));
        }

        resolve(quantity <= product.stock);
    });
};

export default {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    removeProduct,
    checkProductStock,
};