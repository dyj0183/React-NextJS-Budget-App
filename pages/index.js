import styles from "../styles/Home.module.css";
import {
  Flex,
  VStack,
  Heading,
  Table,
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

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <Flex justify="space-around">
          <section>
            <Heading as="h2" size="md">
              Expenses
            </Heading>
            <Table>
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
          </section>
          <section>
            <VStack align="flex-start" spacing="3rem">
              <StatGroup>
                <Stat>
                  <StatLabel>Total Income</StatLabel>
                  <StatNumber>$100</StatNumber>
                </Stat>
                {/* Generate stats for individual incomes */}
              </StatGroup>
              <StatGroup>
                <Stat>
                  <StatLabel>Remaining Balance</StatLabel>
                  <StatNumber>${/* Display remaining */}</StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
          </section>
        </Flex>
      </main>
    </div>
  );
}
