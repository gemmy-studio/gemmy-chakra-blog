import { Box } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';

import { ContentCarousel } from './ContentCarousel';
import { ContentCard } from '../ContentCard';
import { ViewAllCard } from '../ViewAllCard';

interface ContentCarouselsProps {
  contents: any;
}

export const ContentCarousels = (props: ContentCarouselsProps) => {
  const { contents } = props;
  return (
    <Box
      maxW="8xl"
      mx="auto"
      px={{ base: '4', md: '8' }}
      pt={{ base: '12', md: '16' }}
      pb={{ base: '16', md: '20' }}
    >
      <ContentCarousel>
        {Array.isArray(contents)
          ? contents.map((content: any) => {
              return (
                <SwiperSlide key={content.BLOG_IDENTIFICATION_CODE}>
                  <ContentCard content={content} />
                </SwiperSlide>
              );
            })
          : null}
        <SwiperSlide>
          <ViewAllCard
            content={{
              title: '블로그 전체보기',
              linkUrl: '/blog',
            }}
          />
        </SwiperSlide>
      </ContentCarousel>
    </Box>
  );
};

export default ContentCarousels;
