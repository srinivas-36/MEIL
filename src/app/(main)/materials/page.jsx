// app/materials/page.js
"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter, Save, X, Package, Hash, Type, List, BarChart3, DollarSign, Scale, Info } from "lucide-react";

export default function MaterialsPage() {
    // Static material data
    const initialMaterials = [
        {
            id: 1,
            code: "MAT-001",
            name: "Stainless Steel Bolts",
            category: "Fasteners",
            description: "Grade 304 stainless steel bolts, 10mm diameter",
            unit: "pcs",
            quantity: 500,
            price: 0.85,
            status: "In Stock"
        },
        {
            id: 2,
            code: "MAT-002",
            name: "Copper Wiring",
            category: "Electrical",
            description: "12-gauge solid copper electrical wiring",
            unit: "m",
            quantity: 250,
            price: 2.30,
            status: "Low Stock"
        },
        {
            id: 3,
            code: "MAT-003",
            name: "PVC Pipes",
            category: "Plumbing",
            description: "1-inch diameter PVC pipes, 3m length",
            unit: "pcs",
            quantity: 120,
            price: 8.75,
            status: "In Stock"
        },
        {
            id: 4,
            code: "MAT-004",
            name: "Portland Cement",
            category: "Construction",
            description: "50kg bags of Type I Portland cement",
            unit: "bags",
            quantity: 45,
            price: 12.50,
            status: "Out of Stock"
        },
        {
            id: 5,
            code: "MAT-005",
            name: "Birch Plywood",
            category: "Wood",
            description: "4x8 feet, 3/4 inch thick birch plywood sheets",
            unit: "sheets",
            quantity: 22,
            price: 68.00,
            status: "In Stock"
        }
    ];

    const [materials, setMaterials] = useState(initialMaterials);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        category: "",
        description: "",
        unit: "",
        quantity: 0,
        price: 0,
        status: "In Stock"
    });

    // Get all unique categories for filter
    const categories = ["all", ...new Set(materials.map(m => m.category))];

    // Filter materials based on search and filters
    const filteredMaterials = materials.filter(material => {
        const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            material.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "all" || material.category === filterCategory;
        const matchesStatus = filterStatus === "all" || material.status === filterStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Handle opening modal for adding new material
    const handleAddNew = () => {
        setEditingMaterial(null);
        setFormData({
            code: "",
            name: "",
            category: "",
            description: "",
            unit: "",
            quantity: 0,
            price: 0,
            status: "In Stock"
        });
        setIsModalOpen(true);
    };

    // Handle opening modal for editing a material
    const handleEdit = (material) => {
        setEditingMaterial(material);
        setFormData({ ...material });
        setIsModalOpen(true);
    };

    // Handle closing modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMaterial(null);
    };

    // Handle input change for form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle saving material (both new and edit)
    const handleSaveMaterial = () => {
        if (!formData.code || !formData.name || !formData.category) {
            alert("Please fill in required fields: Code, Name, and Category");
            return;
        }

        if (editingMaterial) {
            // Update existing material
            setMaterials(materials.map(material =>
                material.id === editingMaterial.id ? { ...formData, id: editingMaterial.id } : material
            ));
        } else {
            // Add new material
            const newMaterial = {
                id: Math.max(...materials.map(m => m.id), 0) + 1,
                ...formData,
                quantity: parseInt(formData.quantity),
                price: parseFloat(formData.price)
            };
            setMaterials([...materials, newMaterial]);
        }

        handleCloseModal();
    };

    // Handle deleting a material
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            setMaterials(materials.filter(m => m.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                            <Package className="mr-2" size={28} />
                            Materials Management
                        </h1>
                        <p className="text-gray-600">Manage your material inventory with CRUD operations</p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus size={18} className="mr-2" />
                        Add Material
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Materials</p>
                                <p className="text-2xl font-bold text-gray-900">{materials.length}</p>
                            </div>
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Package className="text-blue-600" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-600">In Stock</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {materials.filter(m => m.status === "In Stock").length}
                                </p>
                            </div>
                            <div className="bg-green-100 p-2 rounded-lg">
                                <CheckCircle className="text-green-600" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {materials.filter(m => m.status === "Low Stock").length}
                                </p>
                            </div>
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <AlertCircle className="text-yellow-600" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {materials.filter(m => m.status === "Out of Stock").length}
                                </p>
                            </div>
                            <div className="bg-red-100 p-2 rounded-lg">
                                <XCircle className="text-red-600" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search materials by name, code or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Categories</option>
                                {categories.filter(c => c !== "all").map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>

                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Materials Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaterials.length > 0 ? (
                                    filteredMaterials.map((material) => (
                                        <tr key={material.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {material.code}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.category}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {material.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.unit}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {material.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                ${material.price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${material.status === "In Stock" ? "bg-green-100 text-green-800" :
                                                        material.status === "Low Stock" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-red-100 text-red-800"
                                                    }`}>
                                                    {material.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(material)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(material.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No materials found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-blue-50 rounded-lg p-6 mt-6 border border-blue-200">
                    <div className="flex items-start">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                            <Info className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">Materials Management Guide</h3>
                            <ul className="list-disc list-inside text-blue-700 space-y-1">
                                <li>Use the search bar to find materials by name, code, or description</li>
                                <li>Filter materials by category or status using the dropdown filters</li>
                                <li>Click the "Add Material" button to create new inventory items</li>
                                <li>Use the edit and delete icons to modify or remove materials</li>
                                <li>Status is automatically updated based on quantity thresholds</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Material Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingMaterial ? "Edit Material" : "Add New Material"}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="MAT-001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Material Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Fasteners, Electrical, etc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="pcs, kg, m, etc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Material description"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 p-6 border-t">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveMaterial}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {editingMaterial ? "Save Changes" : "Add Material"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper components for icons
function CheckCircle({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function AlertCircle({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

function XCircle({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}