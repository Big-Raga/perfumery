import { useState } from 'react';
import { useAdminLogout, useAdminProducts, useAdminCategories, useAdminTypes, useCreateProduct, useUpdateProduct, useDeleteProduct, useUploadImage, useAdminReviews, useApproveReview, useRejectReview, useDeleteReview } from '../hooks/adminHooks';

const AdminHome = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [toast, setToast] = useState(null);

    const logoutMutation = useAdminLogout();
    const { data: products, isLoading: productsLoading } = useAdminProducts();
    const { data: categories, isLoading: categoriesLoading } = useAdminCategories();
    const { data: types, isLoading: typesLoading } = useAdminTypes();

    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();
    const deleteProductMutation = useDeleteProduct();

    // Reviews
    const [reviewStatusFilter, setReviewStatusFilter] = useState('pending');
    const { data: reviews, isLoading: reviewsLoading, refetch: refetchReviews } = useAdminReviews(reviewStatusFilter);
    const approveReviewMutation = useApproveReview();
    const rejectReviewMutation = useRejectReview();
    const deleteReviewMutation = useDeleteReview();

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setShowModal(true);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProductMutation.mutate(id, {
                onSuccess: () => showToast('Product deleted successfully', 'success'),
                onError: (err) => showToast(err.response?.data?.message || 'Failed to delete product', 'error')
            });
        }
    };

    const handleApproveReview = (id) => {
        approveReviewMutation.mutate(id, {
            onSuccess: () => showToast('Review approved', 'success'),
            onError: () => showToast('Failed to approve review', 'error'),
        });
    };

    const handleRejectReview = (id) => {
        rejectReviewMutation.mutate(id, {
            onSuccess: () => showToast('Review rejected', 'success'),
            onError: () => showToast('Failed to reject review', 'error'),
        });
    };

    const handleDeleteReview = (id) => {
        if (window.confirm('Permanently delete this review?')) {
            deleteReviewMutation.mutate(id, {
                onSuccess: () => showToast('Review deleted', 'success'),
                onError: () => showToast('Failed to delete review', 'error'),
            });
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                            <p className="text-sm text-gray-600">Manage your perfumery products</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            disabled={logoutMutation.isPending}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'products'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Products ({products?.length || 0})
                        </button>
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'analytics'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews'
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Reviews
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {activeTab === 'products' && (
                    <div className="space-y-6">
                        {/* Products Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">Product Management</h2>
                            <button
                                onClick={handleAddProduct}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Add New Product
                            </button>
                        </div>

                        {/* Products Table */}
                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            {productsLoading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                    <p className="mt-2 text-gray-500">Loading products...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {products?.map((product) => (
                                                <tr key={product._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img className="h-10 w-10 rounded-lg object-cover" src={product.picture} alt={product.title} />
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                                                <div className="text-sm text-gray-500">{product.description?.substring(0, 50)}...</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {product.category?.name || 'No Category'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {product.Type?.name || 'No Type'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${product.featured
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {product.featured ? 'Yes' : 'No'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        <button
                                                            onClick={() => handleEditProduct(product)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(product._id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            disabled={deleteProductMutation.isPending}
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
                )}

                {activeTab === 'analytics' && (
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-indigo-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-indigo-600">Total Products</h3>
                                <p className="text-2xl font-bold text-indigo-900">{products?.length || 0}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-green-600">Featured Products</h3>
                                <p className="text-2xl font-bold text-green-900">{products?.filter(p => p.featured).length || 0}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-blue-600">Categories</h3>
                                <p className="text-2xl font-bold text-blue-900">{categories?.length || 0}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <h2 className="text-lg font-semibold text-gray-900">Review Moderation</h2>
                            <div className="flex gap-2">
                                {['pending', 'approved', 'rejected', ''].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setReviewStatusFilter(s)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                                            reviewStatusFilter === s
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                                        }`}
                                    >
                                        {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                            {reviewsLoading ? (
                                <div className="p-8 text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                    <p className="mt-2 text-gray-500">Loading reviews...</p>
                                </div>
                            ) : !reviews || reviews.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No reviews found{reviewStatusFilter ? ` with status "${reviewStatusFilter}"` : ''}.
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {reviews.map((review) => (
                                        <div key={review._id} className="p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                                            {/* Product info */}
                                            <div className="flex items-center gap-3 sm:w-48 shrink-0">
                                                {review.product?.picture && (
                                                    <img src={review.product.picture} alt={review.product.title} className="w-10 h-10 rounded-lg object-cover" />
                                                )}
                                                <span className="text-xs font-medium text-gray-700 line-clamp-2">{review.product?.title || 'Unknown Product'}</span>
                                            </div>

                                            {/* Review body */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap mb-1">
                                                    <span className="font-semibold text-sm text-gray-900">{review.reviewerName}</span>
                                                    <div className="flex">
                                                        {[1,2,3,4,5].map(s => (
                                                            <span key={s} className={s <= review.rating ? 'text-amber-400 text-sm' : 'text-gray-300 text-sm'}>★</span>
                                                        ))}
                                                    </div>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                                        review.status === 'approved' ? 'bg-green-100 text-green-700'
                                                        : review.status === 'rejected' ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {review.status}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2 sm:flex-col shrink-0">
                                                {review.status !== 'approved' && (
                                                    <button
                                                        onClick={() => handleApproveReview(review._id)}
                                                        disabled={approveReviewMutation.isPending}
                                                        className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 disabled:opacity-50 font-medium"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {review.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => handleRejectReview(review._id)}
                                                        disabled={rejectReviewMutation.isPending}
                                                        className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-md hover:bg-amber-700 disabled:opacity-50 font-medium"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteReview(review._id)}
                                                    disabled={deleteReviewMutation.isPending}
                                                    className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 disabled:opacity-50 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Modal for Add/Edit Product */}
            {showModal && (
                <ProductModal
                    product={editingProduct}
                    categories={categories}
                    types={types}
                    onClose={(message) => {
                        setShowModal(false);
                        if (message) showToast(message, 'success');
                    }}
                    createMutation={createProductMutation}
                    updateMutation={updateProductMutation}
                />
            )}

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
                    toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                }`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

// Product Modal Component
const ProductModal = ({ product, categories, types, onClose, createMutation, updateMutation }) => {
    const [formData, setFormData] = useState({
        title: product?.title || '',
        description: product?.description || '',
        picture: product?.picture || '',
        price: product?.price || '',
        category: product?.category?._id || '',
        Type: product?.Type?._id || '',
        notes: product?.notes?.map(n => n.name).join(', ') || '',
        stock: product?.stock || '',
        featured: product?.featured || false
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(product?.picture || '');
    const [uploadingImage, setUploadingImage] = useState(false);

    const uploadImageMutation = useUploadImage();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const uploadImage = async () => {
        if (!selectedFile) return null;

        setUploadingImage(true);
        try {
            const uploadData = new FormData();
            uploadData.append('image', selectedFile);
            uploadData.append('title', formData.title || 'product');

            const response = await uploadImageMutation.mutateAsync(uploadData);
            return response.data.data.imageUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let pictureUrl = formData.picture;

        // Upload image if a new file is selected
        if (selectedFile) {
            const uploadedImageUrl = await uploadImage();
            if (uploadedImageUrl) {
                pictureUrl = uploadedImageUrl;
            } else {
                alert('Image upload failed. Please try again.');
                return;
            }
        }

        const submitData = {
            ...formData,
            picture: pictureUrl,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
        };

        // Remove empty optional ObjectId fields to avoid MongoDB CastError
        if (!submitData.category) delete submitData.category;
        if (!submitData.Type) delete submitData.Type;
        // Remove empty notes
        if (!submitData.notes) delete submitData.notes;

        if (product) {
            updateMutation.mutate({ id: product._id, productData: submitData }, {
                onSuccess: () => onClose('Product updated successfully'),
                onError: (err) => {
                    alert(err.response?.data?.message || 'Failed to update product');
                }
            });
        } else {
            createMutation.mutate(submitData, {
                onSuccess: () => onClose('Product created successfully'),
                onError: (err) => {
                    alert(err.response?.data?.message || 'Failed to create product');
                }
            });
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-10 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                                    />
                                </div>
                            )}

                            {/* File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            <p className="text-xs text-gray-500 mt-1">Or keep existing image URL below</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Picture URL (if not uploading)</label>
                            <input
                                type="url"
                                name="picture"
                                value={formData.picture}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Category</option>
                                {categories?.map(category => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type (EDP/EDT/etc.)</label>
                            <select
                                name="Type"
                                value={formData.Type}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Select Type</option>
                                {types?.map(type => (
                                    <option key={type._id} value={type._id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Fragrance Notes Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fragrance Notes</label>
                            <input
                                type="text"
                                name="notes"
                                placeholder="Enter notes separated by commas (e.g., vanilla, woody, citrus, fresh)"
                                value={formData.notes}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">Colors are auto-assigned based on note names</p>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">Featured Product</label>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {uploadingImage
                                    ? 'Uploading...'
                                    : createMutation.isPending || updateMutation.isPending
                                        ? 'Saving...'
                                        : product ? 'Update' : 'Create'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}; export default AdminHome;
