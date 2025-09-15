import { Text } from "@/components/texts";
import { SearchBar } from "@/components/search";
import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import ProductGallery from "./product-gallery/ProductGallery";
import "./products.scss";

const Products = () => {
    const { productsContext } = useContext(AppContext);
    const { searchProducts, searchTerm } = productsContext;

    return (
        <div className="products">
            <Text variant="h2">Productos</Text>
            <SearchBar
                onSearch={searchProducts}
                value={searchTerm}
                placeholder="Buscar por nombre"
                className="products__search"/>
            <ProductGallery />
        </div>
    );
};

export default Products;