import NextLink from "next/link";
import { Box, Flex, Heading } from ".";

export default function Footer() {
  return (
    <Box as="footer">
      <Flex
        bg="rgb(255, 101, 117)"
        color="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        align="center"
      >
        <Flex
          flex={1}
          justify="space-between"
          justifyContent="center"
          alignItems="center"
          mx="auto"
        >
          <Heading as="h1" size="lg">
            <NextLink href="/">Blog App</NextLink>
          </Heading>
        </Flex>
      </Flex>
    </Box>
  );
}
