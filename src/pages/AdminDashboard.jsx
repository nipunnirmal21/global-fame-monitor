import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ToastProvider';
import { categories } from '../data/famousPeople';

const API_URL = 'http://localhost:5000/api';

const EMPTY_FORM = {
    celebrityId: '',
    name: '',
    category: 'sports',
    bio: ''
};

export default function AdminDashboard() {
    const { token, user } = useAuth();
    const { showToast } = useToast();

    const [celebrities, setCelebrities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const categoryOptions = categories.filter((c) => c.id !== 'all');

    const fetchCelebrities = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/celebrities`);
            if (res.ok) {
                const data = await res.json();
                setCelebrities(data);
            } else {
                showToast('Failed to load celebrities', 'error');
            }
        } catch (err) {
            console.error('Failed to fetch celebrities:', err);
            showToast('Failed to load celebrities', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchCelebrities();
    }, [fetchCelebrities]);

    const filteredCelebrities = celebrities.filter((person) => {
        const query = searchQuery.toLowerCase();
        return (
            person.name.toLowerCase().includes(query) ||
            person.category.toLowerCase().includes(query) ||
            person.bio.toLowerCase().includes(query)
        );
    });

    const openCreateForm = () => {
        setEditingId(null);
        setFormData(EMPTY_FORM);
        setShowForm(true);
    };

    const openEditForm = (person) => {
        setEditingId(person.celebrityId);
        setFormData({
            celebrityId: String(person.celebrityId),
            name: person.name,
            category: person.category,
            bio: person.bio
        });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData(EMPTY_FORM);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);

        const payload = {
            name: formData.name.trim(),
            category: formData.category,
            bio: formData.bio.trim()
        };

        if (!editingId && formData.celebrityId) {
            payload.celebrityId = Number(formData.celebrityId);
        }

        try {
            const url = editingId
                ? `${API_URL}/celebrities/id/${editingId}`
                : `${API_URL}/celebrities`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Request failed');
            }

            showToast(editingId ? 'Celebrity updated' : 'Celebrity created', 'info');
            closeForm();
            await fetchCelebrities();
        } catch (err) {
            showToast(err.message || 'Failed to save celebrity', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (person) => {
        const confirmed = window.confirm(`Delete ${person.name}? This cannot be undone.`);
        if (!confirmed) return;

        try {
            const res = await fetch(`${API_URL}/celebrities/id/${person.celebrityId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Delete failed');
            }

            showToast('Celebrity deleted', 'info');
            await fetchCelebrities();
        } catch (err) {
            showToast(err.message || 'Failed to delete celebrity', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Helmet>
                <title>Admin Dashboard | Global Fame Monitor</title>
            </Helmet>

            <header className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage celebrities · signed in as {user?.username}</p>
                    </div>
                    <Link
                        to="/"
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        ← Back to site
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search celebrities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:max-w-md px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow hover:shadow-lg transition-all"
                    >
                        + Add Celebrity
                    </button>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="py-20 flex justify-center">
                            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                        </div>
                    ) : filteredCelebrities.length === 0 ? (
                        <div className="py-20 text-center text-gray-500">
                            {celebrities.length === 0
                                ? 'No celebrities in the database. Run npm run seed in the server folder, or add one manually.'
                                : 'No celebrities match your search.'}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Bio</th>
                                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredCelebrities.map((person) => (
                                        <tr key={person.celebrityId} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-500">{person.celebrityId}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{person.name}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 capitalize">{person.category}</td>
                                            <td className="px-4 py-4 text-sm text-gray-600 max-w-md truncate">{person.bio}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEditForm(person)}
                                                        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(person)}
                                                        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                    )}
                </div>
            </main>

            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {editingId ? 'Edit Celebrity' : 'Add Celebrity'}
                            </h2>
                            <button
                                type="button"
                                onClick={closeForm}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {!editingId && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        ID (optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.celebrityId}
                                        onChange={(e) => setFormData({ ...formData, celebrityId: e.target.value })}
                                        placeholder="Auto-generated if left blank"
                                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    {categoryOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Celebrity'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
