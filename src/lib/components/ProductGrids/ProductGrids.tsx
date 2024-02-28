import { Box } from '@chakra-ui/react';

import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import { products } from './_data';

export const ProductGrids = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8' }}
    py={{ base: '12', md: '16' }}
  >
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  </Box>
);

export default ProductGrids;
