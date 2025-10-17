import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();
  const bgColor = useColorModeValue("white", "gray.800");

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields before submitting.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const { success, message } = await createProduct(newProduct);
    console.log(success,message);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 2000,
      isClosable: true,
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" textAlign="center">
          Create New Product
        </Heading>

        <Box w="full" bg={bgColor} p={6} rounded="lg" shadow="md">
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
