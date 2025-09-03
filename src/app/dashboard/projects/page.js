'use client';
import React, { useState } from "react";

export default function ProjectsPage() {
    // ✅ Static sample data
    const [projects, setProjects] = useState([
        {
            project_code: "1001",
            project_name: "AI Research",
            created: "2025-09-01",
            createdby: "John Doe",
            updated: "2025-09-02",
            updatedby: "Jane Smith",
            is_deleted: false,
        },
        {
            project_code: "1002",
            project_name: "Web Development",
            created: "2025-08-15",
            createdby: "Alice",
            updated: "2025-08-20",
            updatedby: "Bob",
            is_deleted: false,
        },
    ]);

    const [newProject, setNewProject] = useState({
        project_code: "",
        project_name: "",
    });
    const [editProject, setEditProject] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // ✅ Add Project
    const handleAdd = () => {
        if (newProject.project_code && newProject.project_name) {
            // Check if project code already exists
            if (projects.some(proj => proj.project_code === newProject.project_code)) {
                alert("Project code already exists. Please use a unique code.");
                return;
            }

            setProjects([
                ...projects,
                {
                    ...newProject,
                    created: new Date().toISOString().split("T")[0],
                    createdby: "You",
                    updated: new Date().toISOString().split("T")[0],
                    updatedby: "You",
                    is_deleted: false,
                },
            ]);
            setNewProject({ project_code: "", project_name: "" });
            setShowAddModal(false);
        }
    };

    // ✅ Update Project
    const handleUpdate = () => {
        setProjects(
            projects.map((proj) =>
                proj.project_code === editProject.project_code ?
                    { ...editProject, updated: new Date().toISOString().split("T")[0], updatedby: "You" } : proj
            )
        );
        setEditProject(null);
        setShowEditModal(false);
    };

    // ✅ Delete Project with confirmation
    const handleDelete = (code, name) => {
        if (window.confirm(`Are you sure you want to delete project "${name}"?`)) {
            setProjects(projects.filter((proj) => proj.project_code !== code));
        }
    };

    // ✅ Open Edit Modal
    const openEditModal = (project) => {
        setEditProject(project);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                        <h1 className="text-2xl font-bold">Project Management</h1>
                        <p className="text-blue-100">Create and manage your projects</p>
                    </div>

                    {/* Actions Section */}
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-700">Projects List</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add New Project
                        </button>
                    </div>

                    {/* Projects Table */}
                    <div className="p-6">
                        {projects.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <p className="mt-4 text-gray-500">No projects found. Add a new project to get started.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated By</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {projects.map((proj) => (
                                            <tr key={proj.project_code} className="hover:bg-gray-50 transition duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{proj.project_code}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{proj.project_name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{proj.created}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{proj.createdby}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{proj.updated}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{proj.updatedby}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(proj)}
                                                        className="text-blue-600 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-md transition duration-200"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(proj.project_code, proj.project_name)}
                                                        className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-md transition duration-200"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Project Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white rounded-t-2xl">
                            <h2 className="text-xl font-bold">Add New Project</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Code</label>
                                    <input
                                        type="text"
                                        placeholder="Enter unique project code"
                                        value={newProject.project_code}
                                        onChange={(e) =>
                                            setNewProject({ ...newProject, project_code: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter project name"
                                        value={newProject.project_name}
                                        onChange={(e) =>
                                            setNewProject({ ...newProject, project_name: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-6">
                                <button
                                    onClick={handleAdd}
                                    disabled={!newProject.project_code || !newProject.project_name}
                                    className={`flex-1 px-4 py-2 rounded-lg transition duration-200 ${!newProject.project_code || !newProject.project_name ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                                >
                                    Add Project
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Project Modal */}
            {showEditModal && editProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white rounded-t-2xl">
                            <h2 className="text-xl font-bold">Edit Project</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Code</label>
                                    <input
                                        type="text"
                                        value={editProject.project_code}
                                        disabled
                                        className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Project code cannot be changed</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={editProject.project_name}
                                        onChange={(e) =>
                                            setEditProject({
                                                ...editProject,
                                                project_name: e.target.value,
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-2 mt-6">
                                <button
                                    onClick={handleUpdate}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}