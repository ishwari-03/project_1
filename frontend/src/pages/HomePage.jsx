import { Container, SimpleGrid, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("products ", products);

  const titleGradient = useColorModeValue(
    "linear(to-r, blue.600, purple.500)",
    "linear(to-r, teal.200, blue.300)"
  );

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={titleGradient}
          bgClip="text"
          textShadow="0 0 15px rgba(0, 255, 255, 0.2)"
        >
          Current Products
        </Text>

        {products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
            No Product Found{" "}
            <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
          <Link to="/create">
            <Text
              as="span"
              color="blue.500"
              _hover={{ textDecoration: "underline" }}
            >
              Create a Product
            </Text>
          </Link>
        </Text>
          </Text>
          
        )}

        
        
      </VStack>
    </Container>
  );
};

export default HomePage;
