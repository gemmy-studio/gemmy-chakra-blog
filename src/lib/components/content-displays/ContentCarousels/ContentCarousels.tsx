import { Box } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './custom-swiper-styles.scss';

import { ContentCarousel } from './ContentCarousel';
import { ContentCard } from '../ContentCard';
import { contents } from '../_data';

export const ContentCarousels = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8' }}
    py={{ base: '12', md: '16' }}
  >
    <ContentCarousel>
      {contents.slice(0, 8).map((content) => (
        <SwiperSlide key={content.id}>
          <ContentCard content={content} />
        </SwiperSlide>
      ))}
      <SwiperSlide>
        <ContentCard
          content={{
            id: '',
            name: '블로그 전체보기',
            imageUrl: '',
            description: '',
            linkUrl: '/blog',
          }}
        />
      </SwiperSlide>
    </ContentCarousel>
  </Box>
);

export default ContentCarousels;