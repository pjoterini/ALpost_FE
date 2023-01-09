import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box py={8} bg="primary">
      <Box
        mx={"auto"}
        maxW={variant === "regular" ? "800px" : "400px"}
        w={"100%"}
        minH="100vh"
        p={{ base: 4, sm: 0 }}
      >
        {children}
      </Box>
    </Box>
  );
};
