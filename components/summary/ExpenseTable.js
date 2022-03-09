import {
  Box,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";

export default function ExpenseTable({ expenses }) {
  return (
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
          {expenses !== undefined &&
            expenses
              .sort((a, b) => a.category - b.category)
              .map((e) => (
                <Tr key={e.id}>
                  <Td>{e.name}</Td>
                  <Td>{e.category}</Td>
                  <Td>{e.frequency}</Td>
                  <Td>{e.amount}</Td>
                  <Td>{e.annualAmount}</Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
    </Box>
  );
}
