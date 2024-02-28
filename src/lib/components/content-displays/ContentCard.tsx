import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { FavouriteButton } from './FavouriteButton';
import { Content } from './_data';

interface Props {
  content: Content;
  rootProps?: StackProps;
}

export const ContentCard = (props: Props) => {
  const { content, rootProps } = props;
  const { id, name, imageUrl, description, linkUrl } = content;
  return (
    <Stack
      as={NextLink}
      href={linkUrl}
      spacing={{ base: '2', md: '3' }}
      _hover={{
        '& img': {
          transform: 'scale(1.02) ',
          filter: 'brightness(90%)',
        },
      }}
      {...rootProps}
    >
      <Box position="relative">
        <AspectRatio ratio={16 / 9} overflow="hidden">
          <Image
            src={imageUrl}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: 'md', md: 'xl' }}
            sx={{
              transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
            }}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${name} to your favourites`}
          display={id === '' ? 'none' : 'flex'}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue('gray.700', 'gray.400')}
          >
            {name}
          </Text>
        </Stack>
        <HStack>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {description}
          </Text>
        </HStack>
      </Stack>
    </Stack>
  );
};
