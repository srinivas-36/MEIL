// SearchPage.js - Enhanced with search functionality and better UI
"use client";
import { useState, useEffect } from "react";
import MaterialTable from "@/components/MaterialTable";
import AttributeFilter from "@/components/AttributeFilter";
import { Search, Filter, Download, Upload } from "lucide-react";

export default function SearchPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);
    const [activeTab, setActiveTab] = useState("name"); // 'name' or 'attributes'
    const [selectedFilters, setSelectedFilters] = useState([]);

    // Sample data - in a real app this would come from an API
    const sampleMaterials = [
        { number: "MAT001", description: "Steel Pipe 2-inch diameter", match: 92, category: "Metal Pipes" },
        { number: "MAT002", description: "Iron Rod 10mm", match: 87, category: "Construction Materials" },
        { number: "MAT003", description: "PVC Pipe 1.5-inch", match: 78, category: "Plumbing" },
        { number: "MAT004", description: "Cement Grade 53", match: 95, category: "Construction Materials" },
        { number: "MAT005", description: "Copper Wire 4mm", match: 82, category: "Electrical" },
    ];

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);

        // Simulate API call delay
        setTimeout(() => {
            const filteredResults = sampleMaterials.filter(material =>
                material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                material.number.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setResults(filteredResults);
            setIsSearching(false);
        }, 800);
    };

    const handleAdd = (material) => {
        console.log("Add to Indent:", material);
        // Show a toast notification
        const event = new CustomEvent('showToast', {
            detail: { message: `${material.description} added to indent`, type: 'success' }
        });
        window.dispatchEvent(event);
    };

    const handleFilterSelect = (filterName) => {
        setSelectedFilters(prev => {
            if (prev.includes(filterName)) {
                return prev.filter(f => f !== filterName);
            } else {
                return [...prev, filterName];
            }
        });
    };

    useEffect(() => {
        if (selectedFilters.length > 0) {
            const filtered = sampleMaterials.filter(m =>
                selectedFilters.includes(m.category)
            );
            setResults(filtered);
        } else if (searchQuery) {
            handleSearch();
        } else {
            setResults([]);
        }
    }, [selectedFilters]);

    return (
        <div className="space-y-6">
            {/* Header with search */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h1 className="text-2xl font-bold text-[#002147] mb-4">Material Search</h1>

                {/* Search Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'name' ? 'border-b-2 border-[#7F56D9] text-[#7F56D9]' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('name')}
                    >
                        <Search size={18} />
                        Search by Name
                    </button>
                    <button
                        className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'attributes' ? 'border-b-2 border-[#7F56D9] text-[#7F56D9]' : 'text-gray-500'}`}
                        onClick={() => setActiveTab('attributes')}
                    >
                        <Filter size={18} />
                        Search by Attributes
                    </button>
                </div>

                {/* Search Input */}
                {activeTab === 'name' && (
                    <div className="flex gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by material name or number..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F56D9]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="bg-gradient-to-r from-[#7F56D9] to-[#EC4899] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSearching ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search size={18} />
                                    Search
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                        <Download size={18} />
                        Export Results
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                        <Upload size={18} />
                        Import Materials
                    </button>
                </div>
            </div>

            {/* Results and Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Results Panel - 2/3 width on large screens */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-[#002147]">
                            Search Results {results.length > 0 && `(${results.length} found)`}
                        </h2>

                        {results.length > 0 && (
                            <div className="text-sm text-gray-500">
                                Sort by:
                                <select className="ml-2 border rounded px-2 py-1">
                                    <option>Relevance</option>
                                    <option>Material Number</option>
                                    <option>Match %</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {results.length > 0 ? (
                        <MaterialTable results={results} onAdd={handleAdd} />
                    ) : searchQuery || selectedFilters.length > 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Search size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No materials found matching your criteria</p>
                            <p className="text-sm mt-2">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Search size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Search for materials by name or use the attribute filters</p>
                        </div>
                    )}
                </div>

                {/* Filter Panel - 1/3 width on large screens */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold text-[#002147] mb-4">
                        Filters
                    </h2>
                    <AttributeFilter
                        onFilterSelect={handleFilterSelect}
                        selectedFilters={selectedFilters}
                    />
                </div>
            </div>
        </div>
    );
}