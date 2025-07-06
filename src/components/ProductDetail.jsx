import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardMedia, Rating, Button, IconButton, Divider, Chip, Breadcrumbs, Link, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Add, Remove, ShoppingCart, FavoriteBorder, Favorite, ArrowBack, Share } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const fetchRelatedProducts = async (category, currentId) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await res.json();
      setRelatedProducts(data.filter((item) => item.id !== Number(currentId)));
    } catch (err) {
      console.error('Error fetching related products:', err);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      showSnackbar(`${quantity} ${product.title} added to cart`);
    } else {
      showSnackbar('Please select at least 1 item');
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    showSnackbar(!isWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this ${product.title} on our store`,
        url: window.location.href,
      }).catch(() => {
        showSnackbar('Sharing failed');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSnackbar('Link copied to clipboard');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setImageLoaded(false);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        if (data.category) {
          fetchRelatedProducts(data.category, data.id);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        showSnackbar('Failed to load product details');
      }
      setLoading(false);
    };

    fetchProduct();
    setQuantity(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (loading || !product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box>
      <Box px={{ xs: 2, md: 6 }} py={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Home
          </Link>
          <Link component={RouterLink} to={`/category/${product.category}`} color="inherit" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>
      </Box>

      <AnimatePresence mode="wait">
        {!loading && product && (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <Box p={{ xs: 2, sm: 4 }}>
              <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
              </Button>

              <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={5} mb={6}>
                {/* Product Image */}
                <Box sx={{ flex: 1, maxWidth: 400, position: 'relative' }}>
                  <Card sx={{ p: 2, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!imageLoaded && (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress />
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.title}
                      sx={{ height: '100%', width: '100%', objectFit: 'contain', display: imageLoaded ? 'block' : 'none' }}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </Card>

                  <Box display="flex" justifyContent="space-between" mt={2} px={1}>
                    <IconButton onClick={toggleWishlist} color={isWishlisted ? 'error' : 'default'}>
                      {isWishlisted ? <Favorite fontSize="large" /> : <FavoriteBorder fontSize="large" />}
                    </IconButton>
                    <IconButton onClick={shareProduct} color="primary">
                      <Share fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>

                <Box flex={2}>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    {product.title}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Rating value={product.rating?.rate || 0} precision={0.1} readOnly size="large" />
                    <Typography variant="body1" color="text.secondary">
                      ({product.rating?.count} reviews)
                    </Typography>
                    <Chip label="In Stock" color="success" size="small" sx={{ ml: 2 }} />
                  </Box>

                  <Typography variant="h4" color="primary" fontWeight={700} mb={2}>
                    ${product.price}
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                    {product.description}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Box display="flex" alignItems="center" gap={3} mb={4}>
                    <Box display="flex" alignItems="center" border="1px solid #e0e0e0" borderRadius={2} px={1}>
                      <IconButton onClick={() => setQuantity((q) => Math.max(0, q - 1))} size="small" disabled={quantity === 0}>
                        <Remove />
                      </IconButton>
                      <Typography mx={2} fontWeight={600}>
                        {quantity}
                      </Typography>
                      <IconButton onClick={() => setQuantity((q) => q + 1)} size="small">
                        <Add />
                      </IconButton>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<ShoppingCart />}
                      onClick={handleAddToCart}
                      disabled={quantity === 0}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </Box>

              {relatedProducts.length > 0 && (
                <Box mt={8} mb={6}>
                  <Typography variant="h5" fontWeight="bold" mb={4}>
                    Customers who viewed this also viewed
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 3,
                    py: 2,
                    '&::-webkit-scrollbar': {
                      height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      borderRadius: '3px',
                    },
                  }}>
                    {relatedProducts.map((item) => (
                      <Card
                        key={item.id}
                        onClick={() => navigate(`/products/${item.id}`)}
                        sx={{
                          minWidth: 250,
                          p: 2,
                          cursor: 'pointer',
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: 3,
                          },
                        }}
                        component={motion.div}
                        whileHover={{ scale: 1.03 }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.title}
                          sx={{
                            height: 180,
                            width: '100%',
                            objectFit: 'contain',
                            mb: 2,
                          }}
                        />
                        <Typography variant="subtitle1" fontWeight={500} gutterBottom sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '3em'
                        }}>
                          {item.title}
                        </Typography>
                        <Box display="flex" alignItems="center" mb={1}>
                          <Rating value={item.rating?.rate || 0} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color="text.secondary" ml={0.5}>
                            ({item.rating?.count})
                          </Typography>
                        </Box>
                        <Typography variant="h6" color="primary" fontWeight={700}>
                          ${item.price}
                        </Typography>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
