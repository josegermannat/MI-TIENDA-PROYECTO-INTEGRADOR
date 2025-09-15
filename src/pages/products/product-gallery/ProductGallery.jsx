import AppContext from "@/contexts/AppContext";
import { useContext } from "react";
import ProductItem from "../product-item/ProductItem";
import ProductNewItem from "../product-new-item/ProductNewItem";
import "./product-gallery.scss";
import { useEffect } from "react";
const ProductGallery = () => {
    const { productsContext } = useContext(AppContext);
    const { products, filteredProducts, isLoading, searchTerm } = productsContext;

    const list = searchTerm.trim() ? filteredProducts : products ;

    useEffect(() => {
        console.log(filteredProducts);
    }, [searchTerm]);

    if (isLoading) {
        return <div className="product-gallery">Cargando…</div>;
    }

    return (
        <div className="product-gallery">
            <ProductNewItem />

            {list.length > 0 ? (
                list.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        isLoading={isLoading}/>
                ))
            ) : (
                searchTerm.trim() && (
                    <div className="product-gallery__no-results">
                        <p>No se encontraron resultados para “{searchTerm}”.</p>
                    </div>
                )
            )}
        </div>
    );
};

export default ProductGallery;