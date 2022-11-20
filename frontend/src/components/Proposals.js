import { VStack, HStack, Text, Button, useColorMode } from '@chakra-ui/react'

import { parseName, parseBytes } from '../utils'

const Proposals = ({ proposals, voteProposal }) => {
  const { colorMode } = useColorMode()

  return (
    <VStack
      w="full"
      h="full"
      align="center"
      bg="blue.400"
      borderRadius="md"
      p={2}
    >
      <Text fontSize={24}>Proposal</Text>
      {proposals.map((proposal, index) => {
        const name = parseName(parseBytes(proposal.name))
        const voteCount = parseInt(proposal.voteCount._hex)
        return (
          <HStack
            borderRadius="md"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}
            w="full"
            h="full"
            p={2}
          >
            <HStack w="full" h="full" align="center" p={2}>
              <HStack w="full" h="full">
                <Text>
                  <b>{name}</b>
                </Text>
              </HStack>
              <HStack w="full" h="full" justify="center">
                <Text fontSize={20}>{voteCount}</Text>
              </HStack>
              <HStack w="full" h="full" justify="flex-end">
                <Button
                  colorScheme="orange"
                  onClick={() => voteProposal(index)}
                >
                  Vote
                </Button>
              </HStack>
            </HStack>
          </HStack>
        )
      })}
    </VStack>
  )
}

export default Proposals
