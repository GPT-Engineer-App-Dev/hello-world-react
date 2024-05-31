import { Container, Text, VStack, Image } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Image src="/images/homepage-banner.jpg" alt="Homepage Banner" />
        <Text fontSize="4xl" fontWeight="bold">Welcome to Our Event Management App</Text>
        <Text>Manage your events efficiently with our app. Navigate through the pages to explore more.</Text>
      </VStack>
    </Container>
  );
};

export default Index;