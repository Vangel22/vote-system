import { VStack, HStack, Text, Button } from "@chakra-ui/react";

import { parseName, parseBytes } from "../utils";

const Proposals = ({ proposals, voteProposal }) => {
  return (
    <VStack w="full" h="full" bg="blue.300" borderRadius="md" p={2}>
      <Text fontSize={24}>Proposal:</Text>
      {proposals.map((proposal, index) => {
        const name = parseName(parseBytes(proposal.name));
        const voteCount = proposal.voteCount._hex;
        return (
          <HStack w="full" h="full">
            <VStack w="full" h="full" align="flex-end" p={2}>
              <Text>
                🗳 {name} - {Number(voteCount)}
              </Text>
            </VStack>
            <VStack w="full" h="full" align="flex-start" pl={4}>
              <Button onClick={() => voteProposal(index)}>Vote</Button>
            </VStack>
          </HStack>
        );
      })}
    </VStack>
  );
};

export default Proposals;
