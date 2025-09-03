// app/indent/page.js
"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, ShoppingCart, Download, Upload, FileText, Package, ArrowLeft } from "lucide-react";

export default function IndentPage() {
    const [indentItems, setIndentItems] = useState([
        { id: 1, material: "MAT001", description: "Steel Pipe 2-inch", quantity: 10, unit: "pcs" },
        { id: 2, material: "MAT002", description: "Iron Rod 10mm", quantity: 25, unit: "pcs" },
        { id: 3, material: "MAT005", description: "Copper Wire 4mm", quantity: 5, unit: "rolls" },
    ]);
    const [newItem, setNewItem] = useState({ material: "", description: "", quantity: 1, unit: "pcs" });
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Get user info from localStorage
        const name = localStorage.getItem("userName") || "User";
        setUserName(name);
    }, []);

    const addItem = () => {
        if (!newItem.material || !newItem.description) {
            const event = new CustomEvent('showToast', {
                detail: { message: "Please enter material details", type: 'error' }
            });
            window.dispatchEvent(event);
            return;
        }

        setIndentItems([...indentItems, { ...newItem, id: Date.now() }]);
        setNewItem({ material: "", description: "", quantity: 1, unit: "pcs" });

        const event = new CustomEvent('showToast', {
            detail: { message: "Item added to indent", type: 'success' }
        });
        window.dispatchEvent(event);
    };

    const removeItem = (id) => {
        setIndentItems(indentItems.filter(item => item.id !== id));

        const event = new CustomEvent('showToast', {
            detail: { message: "Item removed from indent", type: 'info' }
        });
        window.dispatchEvent(event);
    };

    const submitIndent = () => {
        // Simulate API call
        setTimeout(() => {
            const event = new CustomEvent('showToast', {
                detail: { message: "Indent submitted successfully!", type: 'success' }
            });
            window.dispatchEvent(event);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Create Indent</h1>
                        <p className="text-gray-600">Create and manage material indents for procurement</p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <FileText className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Items</p>
                                <p className="text-2xl font-bold text-gray-900">{indentItems.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className="bg-green-100 p-3 rounded-lg mr-4">
                                <ShoppingCart className="text-green-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Ready to Submit</p>
                                <p className="text-2xl font-bold text-gray-900">{indentItems.length > 0 ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-center">
                            <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                <Package className="text-purple-600" size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Last Submitted</p>
                                <p className="text-2xl font-bold text-gray-900">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm">
                        <Download size={18} />
                        Export Indent
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm">
                        <Upload size={18} />
                        Import Items
                    </button>
                </div>

                {/* Add Item Form */}
                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Item</h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Material Code</label>
                            <input
                                type="text"
                                placeholder="e.g., MAT001"
                                value={newItem.material}
                                onChange={(e) => setNewItem({ ...newItem, material: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                placeholder="Material description"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={newItem.quantity}
                                onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                            <select
                                value={newItem.unit}
                                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pcs">Pieces</option>
                                <option value="kg">Kilograms</option>
                                <option value="m">Meters</option>
                                <option value="rolls">Rolls</option>
                                <option value="box">Box</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={addItem}
                        className="bg-gradient-to-r from-[#002147] to-[#7F56D9] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2 shadow-md"
                    >
                        <Plus size={18} />
                        Add Item
                    </button>
                </div>

                {/* Indent Items Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Indent Items</h2>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {indentItems.length} items
                        </span>
                    </div>

                    {indentItems.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                                        <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                        <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {indentItems.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-mono text-blue-600 font-semibold">{item.material}</td>
                                            <td className="p-4">{item.description}</td>
                                            <td className="p-4 font-medium">{item.quantity}</td>
                                            <td className="p-4 uppercase text-gray-600">{item.unit}</td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-50"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-1">Your indent is empty</h3>
                            <p className="text-gray-500">Add materials to create your indent.</p>
                        </div>
                    )}

                    {indentItems.length > 0 && (
                        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                            <button
                                onClick={submitIndent}
                                className="bg-gradient-to-r from-[#002147] to-[#7F56D9] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-md"
                            >
                                <ShoppingCart size={20} />
                                Submit Indent
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}