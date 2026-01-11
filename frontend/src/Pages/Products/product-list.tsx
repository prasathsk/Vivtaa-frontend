import { useEffect, useRef, useState } from "react";
import { productListApi } from "../../api/productsApi";
import { SetImagePreview } from "../../utils/setImage";
import ProductCard from "../../Components/productCard";
import Header from "../../Components/header";

const Products = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [search, setSearch] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await productListApi({ search, page, limit });
            const newProducts = res.data.data;

            setProducts((prev) =>
                page === 1 ? newProducts : [...prev, ...newProducts]
            );

            if (newProducts.length < limit) {
                setHasMore(false);
            }
            console.log('res', res.data.data);

            // adjust based on your backend response
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchProducts();
    }, [search, page]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [hasMore]);

    if (loading) {
        return <p className="text-white text-center">Loading...</p>;
    }

    // Search handler
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
        setHasMore(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl text-black font-bold">Product List</h1>

                    <input
                        type="text"
                        placeholder="Search products name and category"
                        value={search}
                        onChange={handleSearch}
                        className="border rounded-lg  text-gray-800 text-black px-4 py-2 w-64"
                    />
                </div>

                {/* Results */}
                {/* <h2 className="text-xl font-semibold mb-4">
                Results for “{search || "Fitness & Training"}”
            </h2> */}

                {/* Product Grid */}
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Loader */}
                {loading && (
                    <p className="text-center text-gray-500 mt-6">Loading...</p>
                )}

                {/* Infinite scroll trigger */}
                <div ref={observerRef} className="h-10" />
            </div>
        </div>

    )
};

export default Products;