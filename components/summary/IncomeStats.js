import {
  Stack,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export default function IncomeStats({
  incomes,
  totalIncome,
  remainingBalance,
}) {
  const [isSmallScreen] = useMediaQuery("(max-width: 1280px)");

  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      borderWidth="1px"
      borderRadius="lg"
      padding="1rem"
      spacing="1rem"
    >
      <Wrap
        direction={isSmallScreen ? "row" : "column"}
        borderWidth="1px"
        borderRadius="lg"
        padding="1rem"
        spacing="1rem"
        backgroundColor="blue.50"
      >
        <WrapItem
          borderRadius="md"
          padding=".25rem .5rem"
          _hover={{
            backgroundColor: "blue.100",
          }}
          transitionDuration="600ms"
        >
          <Stat>
            <StatLabel>Total Annual Income</StatLabel>
            <StatNumber>{totalIncome}</StatNumber>
          </Stat>
        </WrapItem>
        {incomes !== undefined &&
          incomes.map((i) => (
            <WrapItem
              borderRadius="md"
              padding=".25rem .5rem"
              _hover={{
                backgroundColor: "blue.100",
              }}
              transitionDuration="600ms"
            >
              <Stat key={i.id}>
                <StatLabel>{i.name}</StatLabel>
                <StatNumber>{i.annualAmount}</StatNumber>
                <StatHelpText>
                  {i.amount} {i.frequency}
                </StatHelpText>
              </Stat>
            </WrapItem>
          ))}
      </Wrap>
      <StatGroup
        borderWidth="1px"
        borderRadius="lg"
        padding="1rem"
        backgroundColor="blue.50"
      >
        <Stat>
          <StatLabel>Remaining Balance</StatLabel>
          <StatNumber>{remainingBalance}</StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  );
}
