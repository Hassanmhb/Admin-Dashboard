import React, { useState, useEffect } from 'react';
import {
  Box, Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, Alert, Avatar, Grid, Tooltip
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts();
      const list = Array.isArray(data) ? data : (data.products || []);
      setProducts(list);
    } catch (err) {
      setError(err.message || 'Error fetching products from backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
  };

  const resetForm = () => {
    handleRemoveImage();
    setFormData({ title: '', price: '', category: '', description: '', imageUrl: '' });
    setEditingId(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title || product.name || '',
      price: product.price || '',
      category: product.category || '',
      description: product.description || '',
      imageUrl: product.image || '',
    });
    setImageFile(null);
    setImagePreview(product.image || null);
    setOpenModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile && !formData.imageUrl) {
      alert('Please upload an image or provide an Image URL.');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
      
      const bodyFormData = new FormData();
      bodyFormData.append('title', formData.title);
      bodyFormData.append('name', formData.title);
      bodyFormData.append('price', formData.price);
      bodyFormData.append('originalPrice', formData.price);
      bodyFormData.append('category', formData.category || 'General');
      bodyFormData.append('description', formData.description || '');

      if (imageFile) {
        bodyFormData.append('image', imageFile);
      } else if (formData.imageUrl) {
        bodyFormData.append('image', formData.imageUrl);
      }

      if (editingId) {
        await updateProduct(editingId, bodyFormData, token);
        alert('Product updated successfully!');
      } else {
        await createProduct(bodyFormData, token);
        alert('Product created successfully!');
      }

      await loadProducts();
      setOpenModal(false);
      resetForm();
    } catch (err) {
      alert(`Operation Failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Do you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed, please try again');
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: 'rgba(248, 250, 252, 0.75)',
      fontSize: '0.875rem',
      '& fieldset': { borderColor: '#E2E8F0' },
      '&:hover fieldset': { borderColor: '#CBD5E1' },
      '&.Mui-focused fieldset': { borderColor: '#5E35B1', borderWidth: '1.5px' },
    },
    '& .MuiInputBase-input': {
      py: 1,
      px: 1.5,
      color: '#334155',
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#121926', fontSize: { xs: '20px', sm: '24px' } }}>
            Products Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#697586', mt: 0.5 }}>
            Add, edit, view, and delete store products
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpenCreateModal}
          sx={{
            backgroundColor: '#5E35B1',
            borderRadius: '12px',
            fontWeight: 700,
            px: 3,
            py: 1.2,
            boxShadow: '0 8px 16px rgba(94, 53, 177, 0.25)',
            textTransform: 'none',
            fontSize: '0.9rem',
            '&:hover': { backgroundColor: '#4527A0' },
          }}
        >
          + Add New Product
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

      <Card elevation={0} sx={{ borderRadius: '16px', border: '1px solid #E3E8EF', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress sx={{ color: '#5E35B1' }} />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, color: '#364152' }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#364152' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#364152' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#364152' }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: '#364152' }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p._id} hover>
                      <TableCell>
                        <Avatar src={p.image} variant="rounded" sx={{ width: 48, height: 48, borderRadius: '10px' }} />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#121926' }}>{p.title || p.name}</TableCell>
                      <TableCell sx={{ color: '#4527A0', fontWeight: 600 }}>{p.category || 'General'}</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#121926' }}>Rs. {p.price}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit Product">
                          <IconButton
                            onClick={() => handleOpenEditModal(p)}
                            sx={{ backgroundColor: '#EDE7F6', mr: 1, borderRadius: '8px', '&:hover': { backgroundColor: '#D1C4E9' } }}
                          >
                            <EditOutlinedIcon fontSize="small" sx={{ color: '#5E35B1' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Product">
                          <IconButton
                            onClick={() => handleDelete(p._id)}
                            sx={{ backgroundColor: '#FFEBEE', borderRadius: '8px', '&:hover': { backgroundColor: '#FFCDD2' } }}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="small" sx={{ color: '#D32F2F' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            m: { xs: 2, sm: 3 },
          },
        }}
      >
        <DialogTitle sx={{ p: 2.5, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '1.2rem' }}>
              {editingId ? 'Edit Product' : 'Add New Store Product'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.8rem', mt: 0.5 }}>
              Fill in the details below to save your inventory item.
            </Typography>
          </Box>
          <IconButton onClick={() => setOpenModal(false)} size="small" sx={{ color: '#94A3B8', p: 0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ px: 2.5, py: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, display: 'block' }}>
                  Product Title *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Classic Cotton T-Shirt"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, display: 'block' }}>
                  Price *
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="2499"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, display: 'block' }}>
                  Category
                </Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Men's Wear"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, display: 'block' }}>
                  Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add a detailed description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  sx={inputStyle}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', mb: 0.5, display: 'block' }}>
                  Product Image File
                </Typography>
                <Box
                  component="label"
                  sx={{
                    border: '1.5px dashed #C4B5FD',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(248, 250, 252, 0.5)',
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textAlign: 'center',
                    minHeight: '76px',
                    '&:hover': { backgroundColor: 'rgba(237, 231, 246, 0.4)', borderColor: '#5E35B1' },
                  }}
                >
                  <CloudUploadOutlinedIcon sx={{ fontSize: 22, color: '#651FFF', mb: 0.3 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.75rem' }}>
                    Upload file
                  </Typography>
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#94A3B8', mb: 0.5, display: 'block', fontSize: '0.65rem' }}>
                  OR USE IMAGE URL
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Paste direct image URL"
                  value={formData.imageUrl}
                  onChange={(e) => {
                    handleRemoveImage();
                    setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
                  }}
                  sx={inputStyle}
                />

                {(imagePreview || formData.imageUrl) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Box component="img" src={imagePreview || formData.imageUrl} alt="preview" sx={{ width: 28, height: 28, borderRadius: '4px', objectFit: 'cover' }} />
                    <Typography variant="caption" sx={{ color: '#5E35B1', fontWeight: 600, fontSize: '0.75rem' }}>
                      Image Selected
                    </Typography>
                    <IconButton size="small" onClick={handleRemoveImage} sx={{ p: 0.2, ml: 'auto' }}>
                      <CloseIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2, pt: 1.5, gap: 1 }}>
            <Button onClick={() => setOpenModal(false)} sx={{ color: '#64748B', fontWeight: 700, textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                backgroundColor: '#5E35B1',
                borderRadius: '10px',
                fontWeight: 700,
                px: 3,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#4527A0' },
              }}
            >
              {submitting ? <CircularProgress size={20} color="inherit" /> : (editingId ? 'Update Product' : 'Save Product')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;