// app/dashboard/requests/page.js
"use client";
import { useState } from "react";
import { ClipboardList, Plus, Edit, Trash2, Search, Clock, CheckCircle, XCircle } from "lucide-react";

export default function RequestsPage() {
    const [requests, setRequests] = useState([
        { id: 1001, employee: "Alice Johnson", item: "Laptop", quantity: 1, date: "2023-04-15", status: "Approved" },
        { id: 1002, employee: "Bob Smith", item: "Office Chair", quantity: 2, date: "2023-04-16", status: "Pending" },
        { id: 1003, employee: "Charlie Brown", item: "Notebook", quantity: 5, date: "2023-04-17", status: "Rejected" },
        { id: 1004, employee: "Diana Prince", item: "Projector", quantity: 1, date: "2023-04-18", status: "Pending" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingRequest, setEditingRequest] = useState(null);
    const [formData, setFormData] = useState({
        employee: "", item: "", quantity: "", date: new Date().toISOString().split('T')[0], status: "Pending"
    });
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingRequest) {
            setRequests(requests.map(r =>
                r.id === editingRequest.id ? { ...formData, id: editingRequest.id, quantity: parseInt(formData.quantity) } : r
            ));
        } else {
            const newRequest = {
                ...formData,
                id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1001,
                quantity: parseInt(formData.quantity)
            };
            setRequests([...requests, newRequest]);
        }
        setShowModal(false);
        setFormData({ employee: "", item: "", quantity: "", date: new Date().toISOString().split('T')[0], status: "Pending" });
        setEditingRequest(null);
    };

    const handleEdit = (request) => {
        setEditingRequest(request);
        setFormData({ ...request, quantity: request.quantity.toString() });
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this request?")) {
            setRequests(requests.filter(r => r.id !== id));
        }
    };

    const updateStatus = (id, status) => {
        setRequests(requests.map(r =>
            r.id === id ? { ...r, status } : r
        ));
    };

    const filteredRequests = requests.filter(request =>
        request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case "Approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
            case "Rejected": return <XCircle className="w-4 h-4 text-red-600" />;
            default: return <Clock className="w-4 h-4 text-yellow-600" />;
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Requests</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    New Request
                </button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <div className="relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search requests..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50">
                                <td className="p-4 text-gray-700">#{request.id}</td>
                                <td className="p-4">
                                    <div className="font-medium text-gray-900">{request.employee}</div>
                                </td>
                                <td className="p-4 text-gray-700">{request.item}</td>
                                <td className="p-4 text-gray-700">{request.quantity}</td>
                                <td className="p-4 text-gray-700">{request.date}</td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        {getStatusIcon(request.status)}
                                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        {request.status === "Pending" && (
                                            <>
                                                <button
                                                    onClick={() => updateStatus(request.id, "Approved")}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => updateStatus(request.id, "Rejected")}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleEdit(request)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(request.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingRequest ? 'Edit Request' : 'Create New Request'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.employee}
                                        onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.item}
                                        onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingRequest(null);
                                        setFormData({ employee: "", item: "", quantity: "", date: new Date().toISOString().split('T')[0], status: "Pending" });
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingRequest ? 'Update' : 'Create'} Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}