import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface InfoRowProps {
  infoData: any;
  keyText: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ infoData, keyText }) => {
  return (
    <Flex
      color="white"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid gray"
    >
      <Text>{keyText}</Text>
      <Text color="green" fontSize="xl">
        {infoData}
      </Text>
    </Flex>
  );
};
