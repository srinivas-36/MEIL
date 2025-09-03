// app/requests/page.js
"use client";
import { useState, useEffect } from "react";
import { FileText, FolderPlus, Clock, Search, Filter, ChevronLeft, ChevronRight, MessageSquare, User, Calendar, AlertCircle, CheckCircle, XCircle, MoreVertical, Plus, Edit, Trash2, Send, ArrowLeft } from "lucide-react";

export default function RequestsPage() {
    const [view, setView] = useState("list"); // 'list', 'detail', or 'create'
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [userRole, setUserRole] = useState("user"); // 'user' or 'mdgt'
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [comment, setComment] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    // Form states for create/edit
    const [formData, setFormData] = useState({
        title: "",
        type: "Material",
        priority: "Medium",
        description: ""
    });

    // Sample data - in a real app, this would come from an API
    const [requests, setRequests] = useState([
        {
            id: "REQ-001",
            title: "Need stainless steel bolts",
            type: "Material",
            status: "Open",
            priority: "High",
            requester: "AK San",
            assignedTo: "BK San",
            createdDate: "18/12/2024",
            updatedDate: "19/12/2024",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            history: [
                { date: "18/12/2024", action: "Created", by: "AK San" },
                { date: "18/12/2024", action: "Assigned to BK San", by: "System" },
                { date: "19/12/2024", action: "Updated", by: "BK San" }
            ],
            messages: [
                { id: 1, sender: "AK San", message: "Need these bolts for the construction project.", time: "10:30 AM", isUser: false },
                { id: 2, sender: "BK San", message: "Looking into available options.", time: "11:45 AM", isUser: true }
            ]
        },
        {
            id: "REQ-002",
            title: "Create Plumbing category",
            type: "Material Group",
            status: "Closed",
            priority: "Medium",
            requester: "DK San",
            assignedTo: "Allen",
            createdDate: "07/06/2023",
            updatedDate: "07/06/2023",
            description: "We need a new category for plumbing materials to better organize our inventory.",
            history: [
                { date: "07/06/2023", action: "Created", by: "DK San" },
                { date: "07/06/2023", action: "Assigned to Allen", by: "System" },
                { date: "07/06/2023", action: "Completed", by: "Allen" },
                { date: "07/06/2023", action: "Closed", by: "System" }
            ],
            messages: [
                { id: 1, sender: "DK San", message: "This will help us organize plumbing materials better.", time: "09:15 AM", isUser: false },
                { id: 2, sender: "Allen", message: "Category created and materials moved.", time: "02:30 PM", isUser: true }
            ]
        },
        {
            id: "REQ-003",
            title: "Schedule a call for project discussion",
            type: "Meeting",
            status: "In Progress",
            priority: "Urgent",
            requester: "Jack San",
            assignedTo: "CK San",
            createdDate: "15/12/2024",
            updatedDate: "16/12/2024",
            description: "Need to schedule a call to discuss the new project requirements and timelines.",
            history: [
                { date: "15/12/2024", action: "Created", by: "Jack San" },
                { date: "15/12/2024", action: "Assigned to CK San", by: "System" },
                { date: "16/12/2024", action: "In Progress", by: "CK San" }
            ],
            messages: [
                { id: 1, sender: "Jack San", message: "Please schedule this as soon as possible.", time: "03:20 PM", isUser: false },
                { id: 2, sender: "CK San", message: "Checking availability for this week.", time: "04:45 PM", isUser: true }
            ]
        }
    ]);

    useEffect(() => {
        // Get user info from localStorage
        const role = localStorage.getItem("userRole") || "user";
        setUserRole(role);
    }, []);

    const handleRequestSelect = (request) => {
        setSelectedRequest(request);
        setView("detail");
    };

    const handleBackToList = () => {
        setView("list");
        setSelectedRequest(null);
        setIsEditing(false);
    };

    const handleCreateNew = () => {
        setFormData({
            title: "",
            type: "Material",
            priority: "Medium",
            description: ""
        });
        setView("create");
    };

    const handleEdit = (request) => {
        setEditData(request);
        setFormData({
            title: request.title,
            type: request.type,
            priority: request.priority,
            description: request.description
        });
        setIsEditing(true);
        setView("create");
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitForm = () => {
        if (isEditing) {
            // Update existing request
            const updatedRequests = requests.map(req => {
                if (req.id === editData.id) {
                    return {
                        ...req,
                        title: formData.title,
                        type: formData.type,
                        priority: formData.priority,
                        description: formData.description,
                        updatedDate: new Date().toLocaleDateString('en-GB'),
                        history: [
                            ...req.history,
                            {
                                date: new Date().toLocaleDateString('en-GB'),
                                action: "Updated",
                                by: userRole === "mdgt" ? "MDGT Support" : "You"
                            }
                        ]
                    };
                }
                return req;
            });

            setRequests(updatedRequests);
            setSelectedRequest(updatedRequests.find(req => req.id === editData.id));
        } else {
            // Create new request
            const newRequest = {
                id: `REQ-${String(requests.length + 1).padStart(3, '0')}`,
                title: formData.title,
                type: formData.type,
                status: "Open",
                priority: formData.priority,
                requester: userRole === "mdgt" ? "MDGT Support" : "You",
                assignedTo: userRole === "mdgt" ? "You" : "MDGT Support",
                createdDate: new Date().toLocaleDateString('en-GB'),
                updatedDate: new Date().toLocaleDateString('en-GB'),
                description: formData.description,
                history: [
                    {
                        date: new Date().toLocaleDateString('en-GB'),
                        action: "Created",
                        by: userRole === "mdgt" ? "MDGT Support" : "You"
                    }
                ],
                messages: []
            };

            setRequests([newRequest, ...requests]);
            setSelectedRequest(newRequest);
        }

        setView("detail");
        setIsEditing(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            const updatedRequests = requests.filter(req => req.id !== id);
            setRequests(updatedRequests);

            if (selectedRequest && selectedRequest.id === id) {
                setView("list");
                setSelectedRequest(null);
            }
        }
    };

    const handleSendMessage = () => {
        if (!comment.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: userRole === "mdgt" ? "MDGT Support" : "You",
            message: comment,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: userRole === "mdgt"
        };

        const updatedRequests = requests.map(req => {
            if (req.id === selectedRequest.id) {
                return {
                    ...req,
                    messages: [...req.messages, newMessage],
                    updatedDate: new Date().toLocaleDateString('en-GB')
                };
            }
            return req;
        });

        setRequests(updatedRequests);
        setSelectedRequest({
            ...selectedRequest,
            messages: [...selectedRequest.messages, newMessage],
            updatedDate: new Date().toLocaleDateString('en-GB')
        });
        setComment("");
    };

    const updateRequestStatus = (status) => {
        const updatedRequests = requests.map(req => {
            if (req.id === selectedRequest.id) {
                const action = status === "Closed" ? "Closed" :
                    status === "Reopened" ? "Reopened" :
                        status === "In Progress" ? "In Progress" : "Updated";

                return {
                    ...req,
                    status: status === "Reopened" ? "Open" : status,
                    updatedDate: new Date().toLocaleDateString('en-GB'),
                    history: [
                        ...req.history,
                        {
                            date: new Date().toLocaleDateString('en-GB'),
                            action: action,
                            by: userRole === "mdgt" ? "MDGT Support" : "You"
                        }
                    ]
                };
            }
            return req;
        });

        setRequests(updatedRequests);
        setSelectedRequest(updatedRequests.find(req => req.id === selectedRequest.id));
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || request.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Open": return <AlertCircle size={16} className="text-blue-500" />;
            case "In Progress": return <Clock size={16} className="text-yellow-500" />;
            case "Closed": return <CheckCircle size={16} className="text-green-500" />;
            default: return <AlertCircle size={16} className="text-gray-500" />;
        }
    };

    const getPriorityBadge = (priority) => {
        const priorityClasses = {
            Low: "bg-gray-100 text-gray-800",
            Medium: "bg-yellow-100 text-yellow-800",
            High: "bg-orange-100 text-orange-800",
            Urgent: "bg-red-100 text-red-800"
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority]}`}>
                {priority}
            </span>
        );
    };

    // Create/Edit View
    if (view === "create") {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={handleBackToList}
                            className="mr-3 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEditing ? "Edit Request" : "Create New Request"}
                        </h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter request title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Material">Material</option>
                                        <option value="Material Group">Material Group</option>
                                        <option value="Meeting">Meeting</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleFormChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe your request in detail..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    onClick={handleBackToList}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitForm}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {isEditing ? "Update Request" : "Create Request"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List View
    if (view === "list") {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Requests Management</h1>
                            <p className="text-gray-600">View and manage all requests</p>
                        </div>
                        <button
                            onClick={handleCreateNew}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus size={18} className="mr-2" />
                            New Request
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                    <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
                                </div>
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <FileText className="text-blue-600" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Open Requests</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(r => r.status === "Open").length}
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
                                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(r => r.status === "In Progress").length}
                                    </p>
                                </div>
                                <div className="bg-orange-100 p-2 rounded-lg">
                                    <Clock className="text-orange-600" size={20} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Closed</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {requests.filter(r => r.status === "Closed").length}
                                    </p>
                                </div>
                                <div className="bg-green-100 p-2 rounded-lg">
                                    <CheckCircle className="text-green-600" size={20} />
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
                                    placeholder="Search requests..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex gap-2">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>

                                <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center">
                                    <Filter size={18} className="mr-2" />
                                    More Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Requests Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRequests.map((request) => (
                                        <tr key={request.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div
                                                    className="font-medium cursor-pointer hover:text-blue-600"
                                                    onClick={() => handleRequestSelect(request)}
                                                >
                                                    {request.title}
                                                </div>
                                                <div className="text-gray-500 text-xs">{request.type}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requester}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.assignedTo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getPriorityBadge(request.priority)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getStatusIcon(request.status)}
                                                    <span className="ml-1 text-sm text-gray-900">{request.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.createdDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
                                                        onClick={() => handleRequestSelect(request)}
                                                    >
                                                        View
                                                    </button>
                                                    <button
                                                        className="text-green-600 hover:text-green-800"
                                                        onClick={() => handleEdit(request)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => handleDelete(request.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                                <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredRequests.length)}</span> of{" "}
                                <span className="font-medium">{filteredRequests.length}</span> results
                            </div>

                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Detail View
    if (view === "detail" && selectedRequest) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                    {/* Sidebar with requests list */}
                    {/* <div className="lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">All Requests</h2>
                                <button
                                    onClick={handleBackToList}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                    <ChevronLeft size={16} className="mr-1" />
                                    Back to list
                                </button>
                            </div>

                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search requests..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {requests.map((request) => (
                                    <div
                                        key={request.id}
                                        className={`p-3 border rounded-lg cursor-pointer ${selectedRequest.id === request.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
                                        onClick={() => handleRequestSelect(request)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{request.title}</h3>
                                                <p className="text-sm text-gray-500">{request.id} • {request.type}</p>
                                            </div>
                                            <div className="flex items-center">
                                                {getPriorityBadge(request.priority)}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs text-gray-500">{request.createdDate}</span>
                                            <div className="flex items-center">
                                                {getStatusIcon(request.status)}
                                                <span className="text-xs ml-1 text-gray-500">{request.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}

                    {/* Main content - Request details */}
                    <div className="w-full flex">
                        <div className="bg-white rounded-lg shadow-sm p-6 m-6 w-3/4">
                            {/* Request header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center justify-between mb-4">

                                    <button
                                        onClick={handleBackToList}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <ChevronLeft size={16} className="mr-1" />
                                        Back to list
                                    </button>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{selectedRequest.title}</h1>
                                    <p className="text-gray-600">{selectedRequest.id} • {selectedRequest.type}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {getPriorityBadge(selectedRequest.priority)}
                                    <div className="flex items-center">
                                        {getStatusIcon(selectedRequest.status)}
                                        <span className="ml-1 text-sm font-medium">{selectedRequest.status}</span>
                                    </div>
                                    <div className="relative">
                                        <button className="p-1 rounded-lg hover:bg-gray-100">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Request details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Requester</h3>
                                    <p className="font-medium text-gray-900">{selectedRequest.requester}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Assigned To</h3>
                                    <p className="font-medium text-gray-900">{selectedRequest.assignedTo}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Created Date</h3>
                                    <p className="font-medium text-gray-900">{selectedRequest.createdDate}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                                    <p className="font-medium text-gray-900">{selectedRequest.updatedDate}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-700">{selectedRequest.description}</p>
                            </div>

                            {/* Messages/Conversation - WhatsApp style */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Conversation</h3>

                                <div className="bg-gray-100 rounded-xl p-4">
                                    <div className="space-y-3 max-h-80 overflow-y-auto p-2">
                                        {selectedRequest.messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                                                <div className={`max-w-xs lg:max-w-md rounded-lg p-3 ${msg.isUser ? "bg-green-100" : "bg-white"}`}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-medium text-gray-700">{msg.sender}</span>
                                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                                    </div>
                                                    <p className="text-gray-800">{msg.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 flex items-center"
                                        >
                                            <Send size={18} className="mr-1" />
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* Ticket History */}
                        <div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Request History</h3>

                                <div className="space-y-3">
                                    {selectedRequest.history.map((item, index) => (
                                        <div key={index} className="flex">
                                            <div className="flex flex-col items-center mr-4">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                {index < selectedRequest.history.length - 1 && (
                                                    <div className="w-0.5 h-12 bg-gray-300"></div>
                                                )}
                                            </div>
                                            <div className="mb-4">
                                                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                                <p className="text-xs text-gray-500">By {item.by} on {item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="bg-white rounded-lg shadow-sm p-4 mt-4 flex justify-between">
                                <div className="space-x-2">
                                    {selectedRequest.status === "Closed" ? (
                                        <button
                                            onClick={() => updateRequestStatus("Reopened")}
                                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                                        >
                                            Reopen Request
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => updateRequestStatus("In Progress")}
                                                className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg m-4 hover:bg-yellow-200"
                                            >
                                                Mark In Progress
                                            </button>
                                            <button
                                                onClick={() => updateRequestStatus("Closed")}
                                                className="px-4 py-2 bg-green-100 text-green-800 rounded-lg m-4 hover:bg-green-200"
                                            >
                                                Close Request
                                            </button>
                                        </>
                                    )}
                                </div>

                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleEdit(selectedRequest)}
                                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg m-4 hover:bg-gray-200 flex items-center"
                                    >
                                        <Edit size={16} className="mr-1" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedRequest.id)}
                                        className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 flex items-center"
                                    >
                                        <Trash2 size={16} className="mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}