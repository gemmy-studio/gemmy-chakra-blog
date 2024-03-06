import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';

import { themeColor } from '@/styles/theme';

interface CategoryShowcasesProps {
  title: string;
  description: string;
  button: string;
  image: string;
  subImage?: string;
}

export const CategoryShowcases: React.FC<CategoryShowcasesProps> = ({
  title,
  description,
  button,
  image,
  subImage,
}) => {
  return (
    <Box
      maxW="8xl"
      mx="auto"
      px={{ base: '0', lg: '8' }}
      py={{ base: '0', lg: '8' }}
    >
      <Stack
        direction={{ base: 'column-reverse', lg: 'row' }}
        spacing={{ base: '0', lg: '20' }}
      >
        <Box
          width={{ lg: 'sm' }}
          transform={{ base: 'translateY(-50%)', lg: 'none' }}
          bg={{
            base: useColorModeValue(`${themeColor}.50`, `${themeColor}.700`),
            lg: 'transparent',
          }}
          mx={{ base: '6', md: '8', lg: '0' }}
          px={{ base: '6', md: '8', lg: '0' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack spacing={{ base: '8', lg: '10' }}>
            <Stack spacing={{ base: '2', lg: '4' }}>
              <Heading
                size="xl"
                color={useColorModeValue(
                  `${themeColor}.500`,
                  `${themeColor}.300`,
                )}
              >
                {title}
              </Heading>
              <Heading size="xl" fontWeight="normal">
                {description}
              </Heading>
            </Stack>
            <HStack spacing="3">
              <Link
                color={useColorModeValue(
                  `${themeColor}.500`,
                  `${themeColor}.300`,
                )}
                fontWeight="bold"
                fontSize="lg"
              >
                {button}
              </Link>
              <Icon
                color={useColorModeValue(
                  `${themeColor}.500`,
                  `${themeColor}.300`,
                )}
                as={FaArrowRight}
              />
            </HStack>
          </Stack>
        </Box>
        <Flex flex="1" overflow="hidden">
          <Image
            src={image}
            alt="Showcases Image"
            fallback={<Skeleton />}
            maxH="450px"
            minW="300px"
            objectFit="cover"
            flex="1"
          />
          <Image
            display={{ base: 'none', sm: 'initial' }}
            src={subImage}
            alt="Showcases Sub Image"
            fallback={<Skeleton />}
            maxH="450px"
            objectFit="cover"
          />
        </Flex>
      </Stack>
    </Box>
  );
};
