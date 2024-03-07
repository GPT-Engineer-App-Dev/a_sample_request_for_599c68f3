import { Box, Button, Container, FormControl, FormLabel, Input, VStack, useToast, Text, Image, useClipboard } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard();

  // Unique number generation for tracking
  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit random number
  };

  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    trackingNumber: generateUniqueNumber(),
    isSubmitted: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: Email automation logic here

    setFormData({ ...formData, isSubmitted: true });
    toast({
      title: "Form Submitted",
      description: "Your sample request has been sent.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Print Shipping Label
  const printShippingLabel = () => {
    // TODO: Implement printing logic here
    toast({
      title: "Printed",
      description: "Shipping label has been printed.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box bg="#002F5D" minH="100vh" py="5">
      <Container maxW="container.md">
        <VStack spacing="8" align="stretch">
          <Image src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxDeWtsb3AlMjBMb2dvfGVufDB8fHx8MTcwOTgyMjI3M3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="Cyklop Logo" />
          <Box bg="white" borderRadius="md" p="8" boxShadow="md">
            <form onSubmit={handleSubmit}>
              <VStack spacing="6">
                <FormControl isRequired>
                  <FormLabel>Email address:</FormLabel>
                  <Input type="email" name="email" placeholder="Enter your email" onChange={handleChange} isDisabled={formData.isSubmitted} />
                </FormControl>
                <FormControl isReadOnly>
                  <FormLabel>Unique Tracking Number:</FormLabel>
                  <Input type="text" value={formData.trackingNumber} isReadOnly />
                </FormControl>
                <Button colorScheme="green" type="submit" isDisabled={formData.isSubmitted}>
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
          {formData.isSubmitted && (
            <Box textAlign="center">
              <Text my="4" color="white">
                Thank you! Your Shipping Label:
              </Text>
              <Box p="4" bg="white" borderRadius="md" onClick={onCopy} cursor="pointer">
                <Text fontWeight="bold">Cyklop CSC Att.: SampleLab M.Slot {formData.trackingNumber} Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland</Text>
                {hasCopied && <Text color="green.500">Address copied!</Text>}
              </Box>
              <Button leftIcon={<FaPrint />} colorScheme="green" onClick={printShippingLabel} mt="4">
                Print Shipping Label
              </Button>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
