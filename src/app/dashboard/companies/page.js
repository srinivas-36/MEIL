// app/dashboard/companies/page.js
"use client";
import { useState } from "react";
import { Building2, Plus, Edit, Trash2, Search, Filter, ChevronDown } from "lucide-react";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([
        { id: 1, name: "TechCorp", industry: "Technology", employees: 150, contact: "contact@techcorp.com", status: "Active" },
        { id: 2, name: "DataWorks", industry: "Data Analytics", employees: 85, contact: "info@dataworks.com", status: "Active" },
        { id: 3, name: "CodeLabs", industry: "Software Development", employees: 42, contact: "hello@codelabs.io", status: "Active" },
        { id: 4, name: "CloudNet", industry: "Cloud Services", employees: 120, contact: "support@cloudnet.com", status: "Inactive" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingCompany, setEditingCompany] = useState(null);
    const [formData, setFormData] = useState({ name: "", industry: "", employees: "", contact: "", status: "Active" });
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCompany) {
            // Update existing company
            setCompanies(companies.map(c =>
                c.id === editingCompany.id ? { ...formData, id: editingCompany.id } : c
            ));
        } else {
            // Add new company
            const newCompany = { ...formData, id: companies.length + 1 };
            setCompanies([...companies, newCompany]);
        }
        setShowModal(false);
        setFormData({ name: "", industry: "", employees: "", contact: "", status: "Active" });
        setEditingCompany(null);
    };

    const handleEdit = (company) => {
        setEditingCompany(company);
        setFormData(company);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this company?")) {
            setCompanies(companies.filter(c => c.id !== id));
        }
    };

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Companies</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    Add Company
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Companies Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                            <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredCompanies.map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                            <Building2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{company.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-700">{company.industry}</td>
                                <td className="p-4 text-gray-700">{company.employees}</td>
                                <td className="p-4 text-blue-600">{company.contact}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                        {company.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(company)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(company.id)}
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
                                {editingCompany ? 'Edit Company' : 'Add New Company'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employees</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.employees}
                                        onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.contact}
                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingCompany(null);
                                        setFormData({ name: "", industry: "", employees: "", contact: "", status: "Active" });
                                    }}
                                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingCompany ? 'Update' : 'Create'} Company
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}