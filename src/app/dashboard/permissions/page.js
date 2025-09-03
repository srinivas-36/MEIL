"use client";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Plus, ChevronDown, ChevronRight, Eye, Edit, Trash2, PenTool, Users, X, Search, Check } from "lucide-react";

export default function PermissionsPage() {
    const [permissions, setPermissions] = useState([
        {
            id: 1,
            name: "Indent",
            slug: "indent.access",
            description: "Access to indent management functionality",
            roles: ["Admin", "MDGT"],
            createdAt: "2023-10-15T08:30:00Z",
            permissionGroup: "Operations",
            access: {
                Admin: { read: true, write: true, view: true },
                Manager: { read: true, write: false, view: true }
            }
        },
        {
            id: 2,
            name: "Requests",
            slug: "requests.manage",
            description: "Manage and process system requests",
            roles: ["Admin", "Employee"],
            createdAt: "2023-09-22T14:45:00Z",
            permissionGroup: "Workflow",
            access: {
                Admin: { read: true, write: true, view: true },
                User: { read: true, write: false, view: true }
            }
        },
        {
            id: 3,
            name: "Governance",
            slug: "governance.control",
            description: "System governance and policy management",
            roles: ["Admin"],
            createdAt: "2023-11-05T10:15:00Z",
            permissionGroup: "Administration",
            access: {
                Admin: { read: true, write: true, view: true }
            }
        },
        {
            id: 4,
            name: "Dashboard",
            slug: "dashboard.view",
            description: "Access to all dashboard features and analytics",
            roles: ["Admin", "MDGT", "Employee"],
            createdAt: "2023-08-12T09:20:00Z",
            permissionGroup: "Reporting",
            access: {
                Admin: { read: true, write: true, view: true },
                Manager: { read: true, write: false, view: true },
                User: { read: true, write: false, view: true }
            }
        },
    ]);

    const [expandedFunc, setExpandedFunc] = useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [editingPermission, setEditingPermission] = useState(null);
    const [viewingPermission, setViewingPermission] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        permissionGroup: "",
        description: "",
        roles: [],
        access: {}
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const allRoles = ["Admin", "MDGT", "Employee"];

    useEffect(() => {
        // Reset selected roles when dialogs close
        if (!isAddDialogOpen && !isEditDialogOpen) {
            setSelectedRoles([]);
        }
    }, [isAddDialogOpen, isEditDialogOpen]);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    const toggleExpand = (id) => {
        setExpandedFunc(expandedFunc === id ? null : id);
    };

    const handleRoleToggle = (role) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter(r => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const handleAccessChange = (role, accessType) => {
        setFormData(prev => {
            const newAccess = { ...prev.access };
            if (!newAccess[role]) newAccess[role] = { read: false, write: false, view: false };
            newAccess[role][accessType] = !newAccess[role][accessType];
            return { ...prev, access: newAccess };
        });
    };

    const handleExpandedAccessChange = (permissionId, role, accessType) => {
        setPermissions(prev => prev.map(perm => {
            if (perm.id === permissionId) {
                const updatedAccess = {
                    ...perm.access,
                    [role]: {
                        ...perm.access[role],
                        [accessType]: !perm.access[role][accessType]
                    }
                };
                return { ...perm, access: updatedAccess };
            }
            return perm;
        }));
    };

    const handleAddPermission = () => {
        if (!formData.name || !formData.slug) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        if (selectedRoles.length === 0) {
            showToast("Please select at least one role", "error");
            return;
        }

        const newPermission = {
            id: permissions.length > 0 ? Math.max(...permissions.map(p => p.id)) + 1 : 1,
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            permissionGroup: formData.permissionGroup,
            roles: selectedRoles,
            access: formData.access,
            createdAt: new Date().toISOString()
        };

        setPermissions([...permissions, newPermission]);
        setIsAddDialogOpen(false);
        setFormData({ name: "", slug: "", permissionGroup: "", description: "", roles: [], access: {} });
        setSelectedRoles([]);

        showToast("Permission created successfully");
    };

    const handleViewPermission = (permission) => {
        setViewingPermission(permission);
        setIsViewDialogOpen(true);
    };

    const handleEditPermission = (permission) => {
        setEditingPermission(permission);
        setFormData({
            name: permission.name,
            slug: permission.slug,
            permissionGroup: permission.permissionGroup || "",
            description: permission.description,
            roles: permission.roles,
            access: permission.access
        });
        setSelectedRoles(permission.roles);
        setIsEditDialogOpen(true);
    };

    const handleUpdatePermission = () => {
        if (!formData.name || !formData.slug) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        if (selectedRoles.length === 0) {
            showToast("Please select at least one role", "error");
            return;
        }

        const updatedPermissions = permissions.map(perm =>
            perm.id === editingPermission.id
                ? {
                    ...perm,
                    name: formData.name,
                    slug: formData.slug,
                    permissionGroup: formData.permissionGroup,
                    description: formData.description,
                    roles: selectedRoles,
                    access: formData.access
                }
                : perm
        );

        setPermissions(updatedPermissions);
        setIsEditDialogOpen(false);
        setEditingPermission(null);
        setFormData({ name: "", slug: "", permissionGroup: "", description: "", roles: [], access: {} });
        setSelectedRoles([]);

        showToast("Permission updated successfully");
    };

    const handleDeletePermission = (permission) => {
        const updatedPermissions = permissions.filter(p => p.id !== permission.id);
        setPermissions(updatedPermissions);
        showToast(`Permission "${permission.name}" deleted successfully`);
    };

    const filteredPermissions = permissions.filter(permission =>
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="p-6 text-gray-800 bg-gray-50 min-h-screen">
            {/* Toast Notification */}
            {toast.show && (
                <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${toast.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}>
                    <div className="flex items-center">
                        <div className="mr-2">
                            {toast.type === "error" ? (
                                <X size={20} className="text-red-600" />
                            ) : (
                                <Check size={20} className="text-green-600" />
                            )}
                        </div>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-indigo-900 font-roboto-slab">Permissions Management</h1>
                    <p className="text-gray-600 mt-1">Manage access controls for different functionalities</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                    >
                        <Plus size={18} className="group-hover:scale-110 transition-transform" />
                        Create Permission
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Total Permissions</div>
                    <div className="text-2xl font-bold text-indigo-800">{permissions.length}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Admin Access</div>
                    <div className="text-2xl font-bold text-indigo-800">{permissions.filter(p => p.roles.includes("Admin")).length}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Manager Access</div>
                    <div className="text-2xl font-bold text-indigo-800">{permissions.filter(p => p.roles.includes("MDGT")).length}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">User Access</div>
                    <div className="text-2xl font-bold text-indigo-800">{permissions.filter(p => p.roles.includes("Employee")).length}</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search permissions"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                        <option>All permissions</option>
                        <option>Admin only</option>
                        <option>Manager only</option>
                        <option>User only</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm  border border-gray-100 relative">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900">
                        <tr>
                            {/* <th className="px-6 py-4 font-semibold w-12"></th> */}
                            <th className="px-6 py-4 font-semibold">Permission</th>
                            <th className="px-6 py-4 font-semibold">Slug</th>
                            <th className="px-6 py-4 font-semibold">Roles</th>
                            <th className="px-6 py-4 font-semibold">Created At</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPermissions.map((item) => (
                            <>
                                <tr
                                    key={item.id}
                                    onClick={() => toggleExpand(item.id)}
                                    className="border-b border-gray-100 hover:bg-indigo-50/50 cursor-pointer transition-colors group"
                                >
                                    {/* <td className="px-2 py-4">
                                        <ChevronRight size={16} className="text-gray-400 mx-auto group-hover:text-indigo-600" />

                                    </td> */}
                                    <td className="px-6 py-4 font-medium">
                                        <div className="text-gray-900 font-poppins text-sm">{item.name}</div>
                                        <div className="text-xs text-gray-500 mt-1">{item.permissionGroup}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700 font-poppins text-sm">{item.slug}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {item.roles.map((role) => (
                                                <span
                                                    key={role}
                                                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                >
                                                    {role}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700 font-poppins text-sm">{formatDate(item.createdAt)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* <button
                                                className="p-2 rounded-lg hover:bg-indigo-100 text-gray-500 hover:text-indigo-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleViewPermission(item);
                                                }}
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button> */}
                                            <button
                                                className="p-2 rounded-lg hover:bg-indigo-100 text-gray-500 hover:text-indigo-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEditPermission(item);
                                                }}
                                                title="Edit Permission"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="p-2 rounded-lg hover:bg-red-100 text-gray-500 hover:text-red-700 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeletePermission(item);
                                                }}
                                                title="Delete Permission"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* {expandedFunc === item.id && (
                                    <tr className="bg-indigo-50/30">
                                        <td colSpan="6" className="px-6 py-5">
                                            <p className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                Role Access for {item.name}
                                            </p>
                                            <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
                                                <thead className="bg-indigo-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left font-medium text-indigo-800">Role</th>
                                                        <th className="px-4 py-3 font-medium text-indigo-800">Read</th>
                                                        <th className="px-4 py-3 font-medium text-indigo-800">Write</th>
                                                        <th className="px-4 py-3 font-medium text-indigo-800">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.roles.map((role) => (
                                                        <tr key={role} className="text-center border-t border-gray-200 even:bg-white odd:bg-gray-50">
                                                            <td className="px-4 py-3 text-left font-medium text-indigo-700">{role}</td>
                                                            {["read", "write", "view"].map((perm) => (
                                                                <td key={perm} className="py-3">
                                                                    <label className="inline-flex items-center cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="sr-only peer"
                                                                            checked={item.access[role]?.[perm] || false}
                                                                            onChange={() => handleExpandedAccessChange(item.id, role, perm)}
                                                                        />
                                                                        <div className={`w-9 h-5 ${item.access[role]?.[perm] ? 'bg-indigo-600' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative rounded-full transition-colors`}></div>
                                                                    </label>
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )} */}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Permission Dialog */}
            {isAddDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Add New Permission</h2>
                            <button onClick={() => setIsAddDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter permission name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter permission slug (e.g., users.create)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Group</label>
                                <input
                                    type="text"
                                    value={formData.permissionGroup}
                                    onChange={(e) => setFormData({ ...formData, permissionGroup: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter permission group"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter permission description"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roles *</label>
                                <div className="flex gap-3 flex-wrap">
                                    {allRoles.map(role => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleToggle(role)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedRoles.includes(role)
                                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                                : 'bg-gray-100 text-gray-700 border border-gray 200 hover:bg-gray-200'
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* {selectedRoles.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Access Controls</label>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">Read</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">Write</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedRoles.map(role => (
                                                    <tr key={role} className="border-t border-gray-200 even:bg-white odd:bg-gray-50">
                                                        <td className="px-4 py-3 text-left font-medium text-indigo-700">{role}</td>
                                                        {["read", "write", "view"].map(accessType => (
                                                            <td key={accessType} className="py-3 text-center">
                                                                <label className="inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={formData.access[role]?.[accessType] || false}
                                                                        onChange={() => handleAccessChange(role, accessType)}
                                                                    />
                                                                    <div className={`w-9 h-5 ${formData.access[role]?.[accessType] ? 'bg-indigo-600' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative rounded-full transition-colors`}></div>
                                                                </label>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )} */}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setIsAddDialogOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPermission}
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Create Permission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Permission Dialog */}
            {isViewDialogOpen && viewingPermission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Permission Details</h2>
                            <button onClick={() => setIsViewDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name</label>
                                    <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50">
                                        {viewingPermission.name}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                    <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50">
                                        {viewingPermission.slug}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Group</label>
                                <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50">
                                    {viewingPermission.permissionGroup}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 min-h-[80px]">
                                    {viewingPermission.description}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roles</label>
                                <div className="flex gap-3 flex-wrap">
                                    {viewingPermission.roles.map(role => (
                                        <span
                                            key={role}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-300"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Access Controls</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                                                <th className="px-4 py-3 font-medium text-gray-700">Read</th>
                                                <th className="px-4 py-3 font-medium text-gray-700">Write</th>
                                                <th className="px-4 py-3 font-medium text-gray-700">View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {viewingPermission.roles.map(role => (
                                                <tr key={role} className="border-t border-gray-200 even:bg-white odd:bg-gray-50">
                                                    <td className="px-4 py-3 text-left font-medium text-indigo-700">{role}</td>
                                                    {["read", "write", "view"].map(accessType => (
                                                        <td key={accessType} className="py-3 text-center">
                                                            <div className="flex justify-center">
                                                                {viewingPermission.access[role]?.[accessType] ? (
                                                                    <Check size={18} className="text-green-600" />
                                                                ) : (
                                                                    <X size={18} className="text-red-600" />
                                                                )}
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setIsViewDialogOpen(false)}
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Permission Dialog */}
            {isEditDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Edit Permission</h2>
                            <button onClick={() => setIsEditDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Permission Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter permission name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter permission slug"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Group</label>
                                <input
                                    type="text"
                                    value={formData.permissionGroup}
                                    onChange={(e) => setFormData({ ...formData, permissionGroup: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter permission group"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter permission description"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Roles *</label>
                                <div className="flex gap-3 flex-wrap">
                                    {allRoles.map(role => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleToggle(role)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedRoles.includes(role)
                                                ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* {selectedRoles.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Access Controls</label>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-medium text-gray-700">Role</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">Read</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">Write</th>
                                                    <th className="px-4 py-3 font-medium text-gray-700">View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedRoles.map(role => (
                                                    <tr key={role} className="border-t border-gray-200 even:bg-white odd:bg-gray-50">
                                                        <td className="px-4 py-3 text-left font-medium text-indigo-700">{role}</td>
                                                        {["read", "write", "view"].map(accessType => (
                                                            <td key={accessType} className="py-3 text-center">
                                                                <label className="inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={formData.access[role]?.[accessType] || false}
                                                                        onChange={() => handleAccessChange(role, accessType)}
                                                                    />
                                                                    <div className={`w-9 h-5 ${formData.access[role]?.[accessType] ? 'bg-indigo-600' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all relative rounded-full transition-colors`}></div>
                                                                </label>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )} */}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => setIsEditDialogOpen(false)}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdatePermission}
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    Update Permission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}