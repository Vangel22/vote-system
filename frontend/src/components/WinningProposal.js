import { Button, HStack, Text } from '@chakra-ui/react'

const WinningProposal = ({ getWinningProposal, winnerName }) => {
  return (
    <>
      <Button size="lg" onClick={() => getWinningProposal()} colorScheme="cyan">
        Get winning proposal
      </Button>
      <HStack
        w="full"
        h="full"
        bg="green.300"
        borderRadius="md"
        justify="center"
      >
        <Text fontSize="2xl" fontWeight="bold">
          {winnerName}
        </Text>
      </HStack>
    </>
  )
}

export { WinningProposal }
