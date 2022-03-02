import { Button, Container, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";

export default function Expenses({ onFinish, onBack }) {
    return (
        <Container>
            <VStack align={'start'}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>Add Your Expenses</Text>
                <HStack>
                    <Input placeholder="Name" />
                    <Input placeholder="Amount" />
                    <Select>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                        <option value='Bi-Monthly'>Bi-Monthly</option>
                    </Select>
                    <Select placeholder="Category">
                    </Select>
                </HStack>
                <HStack w={'100%'} justify={'space-between'}>
                    <Button onClick={onBack}>Back</Button>
                    <Button colorScheme={'blue'} onClick={onFinish}>Finish</Button>
                </HStack>
            </VStack>
        </Container>
    )
}