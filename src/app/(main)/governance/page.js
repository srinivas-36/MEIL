// app/governance/page.js
"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Filter, BarChart3, Users, Package, ArrowLeft } from "lucide-react";

export default function GovernancePage() {
    const [requests, setRequests] = useState([
        { id: 1, type: "Material", comment: "Need stainless steel bolts", status: "Pending", date: "2023-10-15", requestedBy: "John Doe" },
        { id: 2, type: "Material Group", comment: "Create Plumbing category", status: "Pending", date: "2023-10-14", requestedBy: "Jane Smith" },
        { id: 3, type: "Material", comment: "Aluminum sheets 5mm thickness", status: "Approved", date: "2023-10-10", requestedBy: "Robert Brown" },
        { id: 4, type: "Material", comment: "PVC pipes 2-inch diameter", status: "Rejected", date: "2023-10-05", requestedBy: "Sarah Johnson" },
        { id: 5, type: "Material Group", comment: "Electrical components category", status: "Pending", date: "2023-10-03", requestedBy: "Mike Wilson" },
    ]);
    const [filter, setFilter] = useState("all");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Get user info from localStorage
        const name = localStorage.getItem("userName") || "User";
        setUserName(name);
    }, []);

    const updateStatus = (id, status) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status } : r))
        );

        const event = new CustomEvent('showToast', {
            detail: { message: `Request ${status.toLowerCase()}`, type: status === "Approved" ? "success" : "info" }
        });
        window.dispatchEvent(event);
    };

    const filteredRequests = filter === "all"
        ? requests
        : requests.filter(req => req.status === filter);

    const stats = [
        { label: "Total Requests", value: requests.length, icon: BarChart3 },
        { label: "Pending Approval", value: requests.filter(r => r.status === "Pending").length, icon: Clock },
        { label: "Approved", value: requests.filter(r => r.status === "Approved").length, icon: CheckCircle },
        { label: "Rejected", value: requests.filter(r => r.status === "Rejected").length, icon: XCircle },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Governance Dashboard</h1>
                        <p className="text-gray-600">Review and manage material requests</p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <stat.icon className="text-blue-600" size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Filter size={20} className="text-gray-500 mr-2" />
                            <span className="text-gray-700 font-medium">Filter by:</span>
                        </div>
                        <div className="flex space-x-2">
                            {["all", "Pending", "Approved", "Rejected"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${filter === status
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Material Requests</h2>
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {filteredRequests.length} requests
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested By</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">#{r.id}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.type === "Material"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-purple-100 text-purple-800"
                                                }`}>
                                                {r.type}
                                            </span>
                                        </td>
                                        <td className="p-4 max-w-xs">{r.comment}</td>
                                        <td className="p-4">{r.requestedBy}</td>
                                        <td className="p-4">{new Date(r.date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.status === "Approved"
                                                ? "bg-green-100 text-green-800"
                                                : r.status === "Rejected"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {r.status === "Pending" && <Clock size={12} className="mr-1" />}
                                                {r.status === "Approved" && <CheckCircle size={12} className="mr-1" />}
                                                {r.status === "Rejected" && <XCircle size={12} className="mr-1" />}
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="p-4 space-x-2">
                                            {r.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(r.id, "Approved")}
                                                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-600 transition shadow-sm"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(r.id, "Rejected")}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-600 transition shadow-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {r.status !== "Pending" && (
                                                <span className="text-gray-400 text-sm">Processed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-gray-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Filter className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-700 mb-1">No requests found</h3>
                            <p className="text-gray-500">Try changing your filters or check back later for new requests.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}