"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import {
    MoreHorizontal, Plus, ChevronDown, ChevronRight, Eye, Edit,
    Trash2, PenTool, Users, X, Search, Check, Shield, Copy, FileText
} from "lucide-react";

export default function RolesPage() {
    // Sample roles data with detailed permissions
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: "Admin",
            slug: "admin",
            description: "Full system access with all permissions",
            users: 5,
            isDefault: false,
            permissions: {
                "dashboard.view": { create: true, read: true, write: true, delete: true },
                "requests.manage": { create: true, read: true, write: true, delete: true },
                "governance.control": { read: true, write: true, delete: true },
                "indent.access": { read: true, write: true, delete: true }
            }
        },
        {
            id: 2,
            name: "MDGT",
            slug: "mdgt",
            description: "Management role with elevated permissions",
            users: 12,
            isDefault: false,
            permissions: {
                "dashboard.view": { create: true, read: true, write: false, delete: false },
                "requests.manage": { read: true, write: true, delete: false },
                "indent.access": { read: true, write: true, delete: false }
            }
        },
        {
            id: 3,
            name: "Employee",
            slug: "employee",
            description: "Standard employee access permissions",
            users: 84,
            isDefault: true,
            permissions: {
                "dashboard.view": { create: true, read: true, write: false, delete: false },
                "indent.access": { read: true, write: true, delete: false }
            }
        },
    ]);

    // All available permissions in the system
    const availablePermissions = [
        {
            slug: "dashboard.view",
            name: "Dashboard",
            description: "Access to dashboard features and analytics",
            category: "Reporting"
        },
        {
            slug: "requests.manage",
            name: "Requests",
            description: "Manage and process system requests",
            category: "Workflow"
        },
        {
            slug: "governance.control",
            name: "Governance",
            description: "System governance and policy management",
            category: "Administration"
        },
        {
            slug: "indent.access",
            name: "Indent",
            description: "Access to indent management functionality",
            category: "Operations"
        },
    ];

    const [expandedRole, setExpandedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "add", "edit", "copy"
    const [selectedRole, setSelectedRole] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        permissions: {},
        isDefault: false
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", type: "" });
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);
    const actionDropdownRefs = useRef({});

    useEffect(() => {
        function handleClickOutside(event) {
            // Close dropdown menus when clicking outside
            if (!event.target.closest('.dropdown')) {
                setOpenDropdownId(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    const toggleExpand = (id) => {
        setExpandedRole(expandedRole === id ? null : id);
    };

    const toggleDropdown = (id, e) => {
        e.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const openModal = (type, role = null) => {
        setModalType(type);
        setSelectedRole(role);

        if (type === "add") {
            // Initialize with no permissions selected
            const emptyPermissions = {};
            availablePermissions.forEach(perm => {
                emptyPermissions[perm.slug] = { create: false, read: false, write: false, delete: false };
            });

            setFormData({
                name: "",
                slug: "",
                description: "",
                permissions: emptyPermissions,
                isDefault: false
            });
        } else if (role) {
            // For edit or copy, populate with role data
            setFormData({
                name: type === "copy" ? `${role.name} Copy` : role.name,
                slug: type === "copy" ? `${role.slug}-copy` : role.slug,
                description: role.description,
                permissions: { ...role.permissions },
                isDefault: role.isDefault || false
            });
        }

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRole(null);
        setFormData({
            name: "",
            slug: "",
            description: "",
            permissions: {},
            isDefault: false
        });
    };

    const handlePermissionChange = (permissionSlug, accessType) => {
        setFormData(prevData => ({
            ...prevData,
            permissions: togglePermission(prevData.permissions, permissionSlug, accessType)
        }));
    };

    const handleRolePermissionChange = (roleId, permissionSlug, accessType) => {
        setRoles(prevRoles =>
            prevRoles.map(role =>
                role.id === roleId
                    ? { ...role, permissions: togglePermission(role.permissions, permissionSlug, accessType) }
                    : role
            )
        );
    };



    const handleSave = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.slug) {
            showToast("Please fill in all required fields", "error");
            return;
        }

        if (modalType === "add") {
            setRoles([...roles, {
                id: Date.now(),
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                permissions: formData.permissions,
                users: 0,
                isDefault: formData.isDefault
            }]);
            showToast("Role created successfully");
        } else if (modalType === "edit" && selectedRole) {
            setRoles(
                roles.map((r) =>
                    r.id === selectedRole.id ? {
                        ...r,
                        name: formData.name,
                        slug: formData.slug,
                        description: formData.description,
                        permissions: formData.permissions,
                        isDefault: formData.isDefault
                    } : { ...r, isDefault: formData.isDefault && r.id !== selectedRole.id ? false : r.isDefault }
                )
            );
            showToast("Role updated successfully");
        } else if (modalType === "copy" && selectedRole) {
            setRoles([
                ...roles,
                {
                    id: Date.now(),
                    name: formData.name,
                    slug: formData.slug,
                    description: formData.description,
                    permissions: formData.permissions,
                    users: 0,
                    isDefault: false
                },
            ]);
            showToast("Role copied successfully");
        }
        closeModal();
    };
    const togglePermission = (permissions, slug, accessType) => ({
        ...permissions,
        [slug]: {
            ...permissions[slug],
            [accessType]: !permissions[slug]?.[accessType] || false
        }
    });


    const handleDelete = (id) => {
        const roleToDelete = roles.find(r => r.id === id);
        if (roleToDelete.isDefault) {
            showToast("Cannot delete default role", "error");
            return;
        }

        setRoles(roles.filter((r) => r.id !== id));
        showToast("Role deleted successfully");
        setOpenDropdownId(null);
    };

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group permissions by category for better organization
    const permissionsByCategory = availablePermissions.reduce((acc, permission) => {
        if (!acc[permission.category]) {
            acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
    }, {});

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
                    <h1 className="text-3xl font-bold text-indigo-900 font-roboto-slab">Roles Management</h1>
                    <p className="text-gray-600 mt-1">Define and manage user roles and permissions</p>
                </div>
                <button
                    onClick={() => openModal("add")}
                    className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                >
                    <Plus size={18} className="group-hover:scale-110 transition-transform" />
                    Add Role
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Total Roles</div>
                    <div className="text-2xl font-bold text-indigo-800">{roles.length}</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Admin Users</div>
                    <div className="text-2xl font-bold text-indigo-800">5</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Manager Users</div>
                    <div className="text-2xl font-bold text-indigo-800">12</div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="text-sm text-gray-500">Regular Users</div>
                    <div className="text-2xl font-bold text-indigo-800">84</div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search roles"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <select className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                        <option>All roles</option>
                        <option>Admin only</option>
                        <option>Manager only</option>
                        <option>User only</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 relative">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-900">
                        <tr>
                            <th className="px-6 py-4 font-semibold w-12"></th>
                            <th className="px-6 py-4 font-semibold">Role</th>
                            <th className="px-6 py-4 font-semibold">Slug</th>
                            <th className="px-6 py-4 font-semibold">Users</th>
                            <th className="px-6 py-4 font-semibold">Permissions</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.map((role) => (
                            <React.Fragment key={role.id}>
                                <tr
                                    key={role.id}
                                    onClick={() => toggleExpand(role.id)}
                                    className="border-b border-gray-100 hover:bg-indigo-50/50 cursor-pointer transition-colors group"
                                >
                                    <td className="px-2 py-4">
                                        {expandedRole === role.id ? (
                                            <ChevronDown size={16} className="text-indigo-600 mx-auto" />
                                        ) : (
                                            <ChevronRight size={16} className="text-gray-400 mx-auto group-hover:text-indigo-600" />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <Shield size={18} className="text-indigo-600" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 font-poppins text-sm">{role.name}</span>
                                                {role.isDefault && (
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full w-fit mt-1">
                                                        default
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-700 font-poppins text-sm">{role.slug}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} className="text-gray-500" />
                                            <span className={role.users > 0 ? "font-medium" : "text-gray-500"}>
                                                {role.users} {role.users === 1 ? "user" : "users"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {Object.keys(role.permissions).slice(0, 3).map((perm) => (
                                                <span
                                                    key={perm}
                                                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                                >
                                                    {availablePermissions.find(p => p.slug === perm)?.name || perm}
                                                </span>
                                            ))}
                                            {Object.keys(role.permissions).length > 3 && (
                                                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    +{Object.keys(role.permissions).length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <div className="dropdown relative inline-block">
                                            <button
                                                className="p-2 rounded-lg hover:bg-indigo-100 text-gray-500 hover:text-indigo-700 transition-colors"
                                                onClick={(e) => toggleDropdown(role.id, e)}
                                            >
                                                <MoreHorizontal size={16} />
                                            </button>
                                            {openDropdownId === role.id && (
                                                <div className="fixed md:absolute md:right-0 md:bottom-auto bottom-0 left-0 md:left-auto md:mt-1 mt-0 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50 overflow-hidden">
                                                    <ul className="text-sm">
                                                        <li
                                                            className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center gap-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal("edit", role);
                                                            }}
                                                        >
                                                            <Eye size={14} className="text-indigo-500" />
                                                            View Details
                                                        </li>
                                                        <li
                                                            className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center gap-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal("edit", role);
                                                            }}
                                                        >
                                                            <Edit size={14} className="text-indigo-500" />
                                                            Edit Role
                                                        </li>
                                                        <li
                                                            className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center gap-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                openModal("copy", role);
                                                            }}
                                                        >
                                                            <Copy size={14} className="text-indigo-500" />
                                                            Copy Role
                                                        </li>
                                                        <li
                                                            className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center gap-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                // Handle template creation
                                                                showToast("Template creation feature coming soon");
                                                                setOpenDropdownId(null);
                                                            }}
                                                        >
                                                            <FileText size={14} className="text-indigo-500" />
                                                            Create Template
                                                        </li>
                                                        <li
                                                            className="px-4 py-2.5 hover:bg-red-50 cursor-pointer transition-colors flex items-center gap-2 text-red-600"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(role.id);
                                                            }}
                                                        >
                                                            <Trash2 size={14} className="text-red-500" />
                                                            Delete Role
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                {expandedRole === role.id && (
                                    <tr className="bg-indigo-50/30">
                                        <td colSpan="6" className="px-6 py-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <div className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        Role Details: {role.name}
                                                    </div>

                                                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                                                        <div className="mb-3">
                                                            <span className="text-sm font-medium text-gray-500">Description:</span>
                                                            <p className="text-sm mt-1">{role.description}</p>
                                                        </div>
                                                        <div>
                                                            <span className="text-sm font-medium text-gray-500">Assigned Permissions:</span>
                                                            <div className="mt-2 space-y-2">
                                                                {Object.entries(role.permissions).map(([permSlug, access]) => {
                                                                    const perm = availablePermissions.find(p => p.slug === permSlug);
                                                                    if (!perm) return null;

                                                                    return (
                                                                        <div key={permSlug} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-b-0">
                                                                            <span className="text-sm">{perm.name}</span>
                                                                            <div className="flex gap-2">
                                                                                {access.read && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Read</span>}
                                                                                {access.write && <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Write</span>}
                                                                                {access.delete && <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">Delete</span>}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                        Permission Operations
                                                    </p>
                                                    <div className="bg-white p-4 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
                                                        {Object.entries(permissionsByCategory).map(([category, perms]) => (
                                                            <div key={category} className="mb-4 last:mb-0">
                                                                <h4 className="font-medium text-sm text-indigo-700 mb-2">{category}</h4>
                                                                <div className="space-y-3">
                                                                    {perms.map(permission => (
                                                                        <div key={permission.slug} className="border border-gray-200 rounded-lg p-3">
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div>
                                                                                    <h5 className="font-medium text-sm">{permission.name}</h5>
                                                                                    <p className="text-xs text-gray-500">{permission.description}</p>
                                                                                </div>
                                                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                                    {permission.slug}
                                                                                </span>
                                                                            </div>
                                                                            <div className="grid grid-cols-3 gap-2">
                                                                                {["create", "read", "write", "delete"].map(accessType => (
                                                                                    <label key={accessType} className="flex items-center gap-2 text-xs">
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            checked={role.permissions[permission.slug]?.[accessType] || false}
                                                                                            onChange={() => handleRolePermissionChange(role.id, permission.slug, accessType)}


                                                                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"

                                                                                        />
                                                                                        <span className="capitalize">{accessType}</span>
                                                                                    </label>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Role Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                {modalType === "add" ? "Add New Role" : modalType === "edit" ? "Edit Role" : "Copy Role"}
                            </h2>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter role name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter role slug"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter role description"
                                    rows={2}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="default-role"
                                    checked={formData.isDefault}
                                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor="default-role" className="text-sm text-gray-700">
                                    Set as default role for new users
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="max-h-96 overflow-y-auto">
                                        {Object.entries(permissionsByCategory).map(([category, perms]) => (
                                            <div key={category} className="border-b border-gray-200 last:border-b-0">
                                                <div className="bg-gray-50 px-4 py-3">
                                                    <h3 className="font-medium text-indigo-700">{category}</h3>
                                                </div>
                                                <div className="divide-y divide-gray-200">
                                                    {perms.map(permission => (
                                                        <div key={permission.slug} className="p-4">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div>
                                                                    <h4 className="font-medium">{permission.name}</h4>
                                                                    <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                                                                </div>
                                                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                                    {permission.slug}
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                {["create", "read", "write", "delete"].map(accessType => (

                                                                    <label key={accessType} className="flex items-center gap-3">
                                                                        <div className="relative inline-flex items-center cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                className="sr-only peer"
                                                                                checked={formData.permissions[permission.slug]?.[accessType] || false}
                                                                                onChange={() => handlePermissionChange(permission.slug, accessType)}
                                                                            />

                                                                            <div className={`w-11 h-6 ${formData.permissions[permission.slug]?.[accessType] ? 'bg-indigo-600' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${formData.permissions[permission.slug]?.[accessType] ? 'after:translate-x-5' : ''}`}></div>
                                                                        </div>
                                                                        <span className="text-sm text-gray-700 capitalize">{accessType}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                >
                                    {modalType === "add" ? "Create Role" : "Update Role"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}