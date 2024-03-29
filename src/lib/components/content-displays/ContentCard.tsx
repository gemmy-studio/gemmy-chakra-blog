import {
  AspectRatio,
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  Skeleton,
  Spacer,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useTimeAgo from '../../hooks/useTimeAgo';
import decompressContent from '../../utils/decompressContent';
import { useEffect, useState } from 'react';
import extractAndJoinText from '../../utils/extractAndJoinText';

interface ContentCardProps {
  content: any;
  rootProps?: StackProps;
}

export const ContentCard = (props: ContentCardProps) => {
  const { content, rootProps } = props;
  const title = content.TITLE;
  const imageUrl = content.IMAGE_LIST;
  const linkUrl = content.LINK;
  const creator = content.AppMember.NICKNAME;
  const creatorImage = content.AppMember.IMAGE;
  const postedAt = content.CREATED_AT;
  const commentsCount = content.commentCnt;
  const likesCount = content.Likes.length;
  const fromTime = useTimeAgo(postedAt);

  const [description, setDescription] = useState('');

  useEffect(() => {
    decompressContent(content.CONTENT)
      .then((decompressedContent: any) => {
        const contentData = JSON.parse(decompressedContent)[0]?.content;
        const extractedText = extractAndJoinText(contentData);
        setDescription(extractedText);
      })
      .catch((error) => {
        console.error('Error during decompression or parsing:', error);
      });
  }, [content]);

  return (
    <Stack spacing={{ base: '1', md: '2' }} {...rootProps}>
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
      >
        <Box position="relative" display={imageUrl ? 'block' : 'none'}>
          <AspectRatio ratio={16 / 9} overflow="hidden">
            <Image
              src={imageUrl}
              alt={title}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{ base: 'md', md: 'xl' }}
              sx={{
                transition:
                  'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
              }}
            />
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color="fg.primary" noOfLines={1} h="6">
              {title}
            </Text>
          </Stack>
          <HStack>
            <Text fontSize="sm" color="fg.subtle" noOfLines={3} h="16">
              {description}
            </Text>
          </HStack>
        </Stack>
        <Divider />
      </Stack>

      <HStack>
        <Avatar size="sm" name={creator} src={creatorImage} />
        <Text fontSize="sm" color="fg.muted" noOfLines={1}>
          {creator}
        </Text>
        <Text fontSize="sm" color="fg.subtle" whiteSpace="nowrap">
          {fromTime}
        </Text>
        <Spacer />
        <HStack spacing="1">
          <Icon color="fg.subtle" as={AiOutlineHeart} />
          <Text fontSize="sm" color="fg.subtle">
            {likesCount}
          </Text>
        </HStack>
        <HStack spacing="1" h="8">
          <Icon color="fg.subtle" as={AiOutlineMessage} />
          <Text fontSize="sm" color="fg.subtle">
            {commentsCount}
          </Text>
        </HStack>
      </HStack>
    </Stack>
  );
};
