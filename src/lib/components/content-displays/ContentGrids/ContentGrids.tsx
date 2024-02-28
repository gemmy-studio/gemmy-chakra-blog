import { Box } from '@chakra-ui/react';

import { ContentGrid } from './ContentGrid';
import { ContentCard } from '../ContentCard';
import { contents } from '../_data';

export const ContentGrids = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8' }}
    py={{ base: '12', md: '16' }}
  >
    <ContentGrid>
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </ContentGrid>
  </Box>
);

export default ContentGrids;
