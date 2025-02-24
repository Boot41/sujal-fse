import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ExtraFeatureInventory from "./ExtraFeatureInventory";

Modal.setAppElement("#root");

const InventoryInfo = () => {
    const [products, setProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productData, setProductData] = useState({ name: "", category: "", stock: 0, price: 0, supplier: "", threshold: 0, overstockLimit: 0, lastRestocked: "" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/inventory", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProducts(res.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const openModal = (product = null) => {
        setEditMode(!!product);
        setSelectedProduct(product);
        setProductData(product || { name: "", category: "", stock: 0, price: 0, supplier: "", threshold: 0, overstockLimit: 0, lastRestocked: "" });
        setModalIsOpen(true);
    };

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`http://localhost:5000/api/v1/inventory/${selectedProduct._id}`, productData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            } else {
                await axios.post("http://localhost:5000/api/v1/inventory/addproduct", productData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
            }
            setModalIsOpen(false);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/inventory/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const columns = [
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "stock", headerName: "Stock", flex: 1 },
        { field: "price", headerName: "Price (₹)", flex: 1 },
        { field: "supplier", headerName: "Supplier", flex: 1 },
        { field: "threshold", headerName: "Threshold", flex: 1 },
        { field: "overstockLimit", headerName: "Overstock Limit", flex: 1 },
        { field: "lastRestocked", headerName: "Last Restocked", flex: 1},
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
                <div className="flex items-center justify-center gap-4 pt-4">
                    <FaEdit className="text-blue-500 cursor-pointer" size={18} onClick={() => openModal(params.row)} />
                    <FaTrash className="text-red-500 cursor-pointer" size={18} onClick={() => deleteProduct(params.row._id)} />
                </div>
            )
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Inventory Management</h1>
            <button 
                className="mb-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                onClick={() => openModal()}
            >
                <FaPlus /> Add Product
            </button>
            <div className="bg-white p-5 rounded-lg shadow-md" style={{ height: 400, width: '100%' }}>
                <DataGrid rows={products} columns={columns} getRowId={(row) => row._id} pageSize={5} checkboxSelection />
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto mt-20">
                <h2 className="text-2xl font-bold mb-4">{editMode ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {["name", "category", "stock", "price", "supplier", "threshold", "overstockLimit"].map((field) => (
                        <div key={field} className="flex flex-col">
                            <label className="font-semibold cursor-pointer">
                                {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type={field === "stock" || field === "price" || field === "threshold" || field === "overstockLimit" ? "number" : "text"}
                                name={field}
                                placeholder={`Enter ${field}`}
                                className="border p-2 rounded focus:ring-2 focus:ring-blue-300 outline-none"
                                value={productData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg shadow-md cursor-pointer">
                        {editMode ? "Update" : "Add"}
                    </button>
                </form>
            </Modal>

            <ExtraFeatureInventory/>
        </div>
    );
};

export default InventoryInfo;