import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  VStack,
  Input,
  useColorModeValue,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product?.name || "",
    price: product?.price || "",
    image: product?.image || "",
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    toast({
      title: success ? "Updated Successfully" : "Update Failed",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  if (!product) return null; // ✅ safety check

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product?.image || ""}
        alt={product?.name || "Product Image"}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product?.name || "Unnamed Product"}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product?.price || "0.00"}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            colorScheme="blue"
            aria-label="Edit product"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
            aria-label="Delete product"
          />
        </HStack>
      </Box>

      {/* ✅ Fixed Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Update a Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} pb={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
              />
              <Button
                colorScheme="blue"
                w="full"
                onClick={handleUpdateProduct}
              >
                Save Changes
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
