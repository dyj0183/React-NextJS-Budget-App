import styles from "../styles/Home.module.css";
import {
  Flex,
  Stack,
  Box,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Th,
  Tr,
  // Td,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function Home() {
  const [isSmallScreen] = useMediaQuery("(max-width: 1280px)");

  return (
    <Flex justify="space-around">
      <Box>
        <Table>
          <TableCaption placement="top">Expenses</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Frequency</Th>
              <Th>Amount</Th>
              <Th>Annual Amount</Th>
            </Tr>
          </Thead>
          <Tbody></Tbody>
        </Table>
      </Box>
      <Stack
        direction={isSmallScreen ? "column" : "row"}
        borderWidth="1px"
        borderRadius="lg"
        padding="1rem"
        spacing="1rem"
      >
        <StatGroup borderWidth="1px" borderRadius="lg" padding="1rem">
          <Stat>
            <StatLabel>Total Income</StatLabel>
            <StatNumber>$100</StatNumber>
          </Stat>
          {/* Generate stats for individual incomes */}
        </StatGroup>
        <StatGroup borderWidth="1px" borderRadius="lg" padding="1rem">
          <Stat>
            <StatLabel>Remaining Balance</StatLabel>
            <StatNumber>${/* Display remaining */}</StatNumber>
          </Stat>
        </StatGroup>
      </Stack>
    </Flex>
  );
}
