import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAuthAPI, adminProductAPI, imageAPI } from "../api/adminAPI";
import { useNavigate } from "react-router-dom";

// Hook for verifying admin auth status
export const useVerifyAuth = () => {
    return useQuery({
        queryKey: ['admin-auth'],
        queryFn: async () => {
            const response = await adminAuthAPI.verifyAuth();
            return response.data.data;
        },
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook for sending OTP to admin email
export const useAdminLogin = () => {
    return useMutation({
        mutationFn: (email) => adminAuthAPI.login(email),
        onSuccess: (data) => {
            console.log('OTP sent successfully');
        },
        onError: (error) => {
            console.error('Failed to send OTP:', error.response?.data?.message);
        }
    });
};

// Hook for verifying OTP and logging in
export const useAdminOTPVerify = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, otp }) => adminAuthAPI.verifyOTP(email, otp),
        onSuccess: (data) => {
            // Store token in localStorage for cross-origin auth
            const token = data.data?.data?.token;
            if (token) {
                localStorage.setItem('adminToken', token);
            }
            // Invalidate auth cache so ProtectedRoute re-checks
            queryClient.invalidateQueries({ queryKey: ['admin-auth'] });
            navigate('/admin/dashboard');
        },
        onError: (error) => {
            console.error('OTP verification failed:', error.response?.data?.message);
        }
    });
};

// Hook for admin logout
export const useAdminLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => adminAuthAPI.logout(),
        onSuccess: () => {
            localStorage.removeItem('adminToken');
            queryClient.clear();
            navigate('/admin/login');
        },
        onError: () => {
            localStorage.removeItem('adminToken');
            queryClient.clear();
            navigate('/admin/login');
        }
    });
};


// Product Management Hooks

// Get all products
export const useAdminProducts = () => {
    return useQuery({
        queryKey: ['admin-products'],
        queryFn: async () => {
            const response = await adminProductAPI.getAllProducts();
            return response.data.data;
        },
    });
};

// Get all categories
export const useAdminCategories = () => {
    return useQuery({
        queryKey: ['admin-categories'],
        queryFn: async () => {
            const response = await adminProductAPI.getAllCategories();
            return response.data.data;
        },
    });
};

// Get all types
export const useAdminTypes = () => {
    return useQuery({
        queryKey: ['admin-types'],
        queryFn: async () => {
            const response = await adminProductAPI.getAllTypes();
            return response.data.data;
        },
    });
};

// Create type
export const useCreateType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (typeData) => adminProductAPI.createType(typeData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-types'] });
        },
        onError: (error) => {
            console.error('Failed to create type:', error.response?.data?.message);
        }
    });
};

// Create product
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productData) => adminProductAPI.createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
        },
        onError: (error) => {
            console.error('Failed to create product:', error.response?.data?.message);
        }
    });
};


// Update product
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, productData }) => adminProductAPI.updateProduct(id, productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
        },
        onError: (error) => {
            console.error('Failed to update product:', error.response?.data?.message);
        }
    });
};

// Delete product
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => adminProductAPI.deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-products'] });
        },
        onError: (error) => {
            console.error('Failed to delete product:', error.response?.data?.message);
        }
    });
};

// Image Upload Hook
export const useUploadImage = () => {
    return useMutation({
        mutationFn: (formData) => imageAPI.uploadImage(formData),
        onError: (error) => {
            console.error('Failed to upload image:', error.response?.data?.message);
        }
    });
};

