import type React from "react";
import type { ProductInterface } from "../Interface/product";
import { SetImagePreview } from "../utils/setImage";

interface ProductCardInterface {
    product: ProductInterface
}

const ProductCard: React.FC<ProductCardInterface> = (props) => {
    const { product } = props;

    const handleDetailsPage = (id:string) => {
        window.open(`/product/${id}`, '_blank');
    };

    return (
        <div className="rounded-xl p-4 shadow hover:shadow-lg transition border-2">
            <img
                src={SetImagePreview(product.images[0])}
                alt={product.name}
                className="h-40 w-full object-contain mb-3"
            />

            <p className="text-gray-600">{product.product_id}</p>
            <h3 className="text-sm text-black  font-semibold line-clamp-2">
                {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1 text-sm">
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={index < product.star_rating ? "text-yellow-500" : "text-gray-300"}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <span className="text-gray-500">
                    {product.star_rating} ({product.star_rate_value})
                </span>
                <span className="bg-blue-500 text-white text-xs px-2 rounded">
                    -{product.offer_percentage}%
                </span>
            </div>

            <p className="text-xs text-black text-gray-500 mt-1">
                FREE delivery by {product.delivery_days} days
            </p>

            {/* Price */}
            <div className="mt-2">
                <span className="font-bold text-black text-lg">₹{product.price}</span>

                <span className="text-sm text-gray-400 line-through ml-2">
                    MPR:₹{product.price}
                </span>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={()=>handleDetailsPage(product._id)}>
                    View
                </button>
            </div>

        </div>
    );
};

export default ProductCard;