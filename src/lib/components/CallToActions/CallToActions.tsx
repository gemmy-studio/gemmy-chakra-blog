'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  ButtonProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { themeColor } from '@/styles/theme';

interface ButtonItem extends ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface CallToActionsProps {
  title?: string;
  heading: string;
  description: string;
  buttons?: ButtonItem[];
}

export const CallToActions: React.FC<CallToActionsProps> = ({
  title,
  heading,
  description,
  buttons,
}) => {
  return (
    <Box as="section" bg="bg.surface">
      <Container
        maxW="container.xl"
        py={{ base: '16', md: '24' }}
        px={{ base: '4', md: '8' }}
      >
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            <Stack spacing={{ base: '1', md: '2' }}>
              <Text color="accent.muted" textAlign="center" size="xs">
                {title}
              </Text>
              <Heading size={{ base: 'lg', sm: 'xl' }}>{heading}</Heading>
            </Stack>
            <Text color="fg.muted" maxW="2xl" textAlign="center" fontSize="lg">
              {description}
            </Text>
          </Stack>
          {buttons && (
            <Stack
              spacing="3"
              direction={{ base: 'column', sm: 'row' }}
              justify="center"
            >
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  as={NextLink}
                  href={button.href}
                  colorScheme={themeColor}
                  variant={button.variant}
                  onClick={button.onClick}
                >
                  {button.text}
                </Button>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default CallToActions;
