import {
  Stack,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
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
      <StatGroup borderWidth="1px" borderRadius="lg" padding="1rem">
        <Stat>
          <StatLabel>Total Annual Income</StatLabel>
          <StatNumber>{totalIncome}</StatNumber>
        </Stat>
        {incomes !== undefined &&
          incomes.map((i) => (
            <Stat key={i.id}>
              <StatLabel>{i.name}</StatLabel>
              <StatNumber>{i.annualAmount}</StatNumber>
              <StatHelpText>
                {i.amount} {i.frequency}
              </StatHelpText>
            </Stat>
          ))}
      </StatGroup>
      <StatGroup borderWidth="1px" borderRadius="lg" padding="1rem">
        <Stat>
          <StatLabel>Remaining Balance</StatLabel>
          <StatNumber>{remainingBalance}</StatNumber>
        </Stat>
      </StatGroup>
    </Stack>
  );
}
