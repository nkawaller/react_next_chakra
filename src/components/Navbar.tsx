import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex p={4} bg="teal">
      <Box ml={"auto"}>
        <NextLink href="/login">
          <Link mr={2} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="register">
          <Link color="white">Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
