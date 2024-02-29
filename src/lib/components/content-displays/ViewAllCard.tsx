import {
  AspectRatio,
  Box,
  Divider,
  HStack,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  content: {
    title: string;
    linkUrl: string;
  };
  rootProps?: StackProps;
}

export const ViewAllCard = (props: Props) => {
  const { content, rootProps } = props;
  const { title, linkUrl } = content;
  return (
    <Stack
      as={NextLink}
      href={linkUrl}
      spacing={{ base: '1', md: '2' }}
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
            src=""
            alt={title}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={{ base: 'md', md: 'xl' }}
            sx={{
              transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
            }}
          />
        </AspectRatio>
      </Box>
      <Stack>
        <Text fontWeight="medium" color="fg.primary" h="6">
          {title}
        </Text>
        <Text fontSize="sm" color="fg.subtle" noOfLines={3} h="16"></Text>
      </Stack>
      <Divider />
      <HStack h="8" />
    </Stack>
  );
};
