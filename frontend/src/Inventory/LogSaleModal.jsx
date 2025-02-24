import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";

const LogSaleModal = ({ isOpen, onClose, onSaleLogged }) => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [quantitySold, setQuantitySold] = useState("");
    const [salesChannel, setSalesChannel] = useState("Offline");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) fetchProducts();
    }, [isOpen]);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/inventory", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProducts(res.data.products);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productId || !quantitySold) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await axios.post(
                "http://localhost:5000/api/v1/sales",
                { productId, quantitySold, salesChannel },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setProductId("");
            setQuantitySold("");
            setSalesChannel("Offline");
            onSaleLogged(); // Refresh sales list
            onClose(); // Close modal
        } catch (err) {
            setError("Failed to log sale. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-lg font-semibold">Log New Sale</h3>
                    <FaTimes className="cursor-pointer text-gray-500" onClick={onClose} />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="text-sm font-medium">Select Product</label>
                        <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                        >
                            <option value="">-- Select --</option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name} - ₹{product.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Quantity Sold</label>
                        <input
                            type="number"
                            value={quantitySold}
                            onChange={(e) => setQuantitySold(e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                            min="1"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Sales Channel</label>
                        <select
                            value={salesChannel}
                            onChange={(e) => setSalesChannel(e.target.value)}
                            className="w-full p-2 border rounded mt-1"
                        >
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Logging Sale..." : "Log Sale"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LogSaleModal;
