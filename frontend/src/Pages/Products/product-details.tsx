import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productDetailPage } from "../../api/productsApi";
import { SetImagePreview } from "../../utils/setImage";
import type { ProductInterface } from "../../Interface/product";

const images = [
    "/treadmill-1.png",
    "/treadmill-2.png",
    "/treadmill-3.png",
    "/treadmill-4.png",
];

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [selectedColor, setSelectedColor] = useState<string>("Ashy Slate");
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [product, setProduct] = useState<ProductInterface | null>(null);

    const params = useParams();
    const id: string | undefined = params.id;
    console.log('product', product);

    const fetchProductsDetails = async () => {
        try {
            if (!id) return;
            const res = await productDetailPage(id);
            const newProducts = res.data.data;
            setProduct(newProducts);
            setSelectedImage(newProducts.images[0]);
            console.log('res details:', newProducts);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchProductsDetails();
    }, [id]);

    if (!product) {
        return <p className="text-center text-gray-500">Loading product...</p>;
    }


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <p className="text-sm text-gray-500 mb-4">
                Store / {product.category}
            </p>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-xl">
                {/* LEFT - Images */}
                <div>
                    <img
                        src={SetImagePreview(selectedImage)}
                        alt="Product"
                        className="w-full h-[400px] object-contain mb-4"
                    />

                    <div className="flex gap-3">
                        {product.images.map((img: string, index: number) => (
                            <img
                                key={index}
                                src={SetImagePreview(img)}
                                onClick={() => setSelectedImage(img)}
                                className={`w-20 h-20 object-contain border rounded cursor-pointer
        ${selectedImage === img ? "border-indigo-500" : "border-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT - Product Info */}
                <div>
                    <p className="text-sm text-gray-500">{product?.product_id}</p>

                    <h6 className="text-xl font-bold mt-1" style={{ color: 'black' }}>
                        {product.name}
                        {/* dklsfndsnkfl */}
                    </h6>

                    <h6 className="text-x mt-1" style={{ color: 'gray' }}>
                        {product.description}
                        {/* dklsfndsnkfl */}
                    </h6>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
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
                        <span className="text-sm text-gray-500">{product.star_rating} ({product.star_rate_value})</span>
                        <span className="bg-blue-500 text-white text-xs px-2 rounded">
                            -{product.offer_percentage}%
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-4">
                        <span className="text-2xl text-black font-bold">₹{product.price}</span>
                        <span className="ml-2 text-gray-400 line-through">₹{product.price}</span>
                    </div>

                    {/* Color */}
                    <div className="mt-6">
                        <p className="font-semibold text-black mb-2">Colour: <span className="font-semibold text-gray-500 mb-2">{selectedColor}</span></p>
                        <div className="flex gap-2">
                            {["Ashy Slate", "Gunmetal", "Midnight"].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`border px-3 py-1 rounded text-sm
                    ${selectedColor === color
                                            ? "border-indigo-500 text-indigo-600"
                                            : "border-gray-300"}`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Model */}
                    <div className="mt-6">
                        <p className="font-semibold text-black mb-2">Model</p>
                        <div className="flex gap-2 flex-wrap">
                            {["Force – 4.5HP", "Force Pro – M", "Impact – 4.5HP"].map(
                                (model) => (
                                    <button
                                        key={model}
                                        className="border px-3 py-1 rounded text-sm border-gray-300"
                                    >
                                        {model}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mt-6">
                        <p className="font-semibold text-black mb-2">Size: <span className="font-semibold text-gray-500 mb-2">{selectedSize}</span></p>
                        <div className="flex gap-2 flex-wrap">
                            {["S", "M", "L", "XL", "2XL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`border px-3 py-1 rounded
                    ${selectedSize === size
                                            ? "border-indigo-500 text-indigo-600"
                                            : "border-gray-300"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 space-y-3">
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold">
                            Add to Cart
                        </button>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* What's in the box */}
            <div className="bg-white p-6 rounded-xl mt-6">
                <h2 className="font-bold text-black mb-3">What's in the Box?</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Treadmill x1</li>
                    <li>Toolkit</li>
                    <li>User Manual</li>
                    <li>Warranty Card</li>
                </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-xl mt-6">
                <h2 className="font-bold text-black mb-4">Product Specification</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><strong>Brand:</strong> FITZDO</p>
                    <p><strong>Motor:</strong> 5HP</p>
                    <p><strong>Foldable:</strong> Yes</p>
                    <p><strong>Speed:</strong> 1–14 Km/h</p>
                    <p><strong>Max Weight:</strong> 60 Kg</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
