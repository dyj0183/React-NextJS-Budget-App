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
  Td,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function Summary(props) {
  const [isSmallScreen] = useMediaQuery("(max-width: 1280px)");

  const displayDollar = (amount) => {
    // return `$${amount}`;
  };
  const calcTotalIncome = (incomes) => {};
  const calcAnnualAmount = (amount, frequency) => {};
  const calcRemainingBalance = () => {};

  return (
    <Flex justify="space-around">
      <Box borderWidth="1px" borderRadius="lg">
        <Table>
          <TableCaption placement="top">Expenses</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Frequency</Th>
              <Th>Amount</Th>
              <Th>Annual Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.data.expenses
              .sort((a, b) => a.category - b.category)
              .map((e) => (
                <Tr>
                  <Td>{e.name}</Td>
                  <Td>{e.category}</Td>
                  <Td>{e.frequency}</Td>
                  <Td>{e.amount}</Td>
                  <Td>
                    {displayDollar(calcAnnualAmount(e.amount, e.frequency))}
                  </Td>
                </Tr>
              ))}
          </Tbody>
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
            <StatLabel>Total Annual Income</StatLabel>
            <StatNumber>
              {displayDollar(calcTotalIncome(props.data.incomes))}
            </StatNumber>
          </Stat>
          {props.data.incomes.map((i) => (
            <Stat>
              <StatLabel>{i.name}</StatLabel>
              <StatNumber>
                {displayDollar(calcAnnualAmount(i.amount, i.frequency))}
              </StatNumber>
              <StatHelpText>
                {displayDollar(i.amount)} {i.frequency}
              </StatHelpText>
            </Stat>
          ))}
        </StatGroup>
        <StatGroup borderWidth="1px" borderRadius="lg" padding="1rem">
          <Stat>
            <StatLabel>Remaining Balance</StatLabel>
            <StatNumber>{displayDollar(calcRemainingBalance())}</StatNumber>
          </Stat>
        </StatGroup>
      </Stack>
    </Flex>
  );
}
