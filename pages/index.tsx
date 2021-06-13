import { Flex, Heading, Button, Box } from "@chakra-ui/react";

const IndexPage = () => {
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Box textAlign="center">
        <Heading mb="6"> Phillips Hue React</Heading>
        <Button>Connect Hue Bridge</Button>
      </Box>
    </Flex>
  );
};

export default IndexPage;
