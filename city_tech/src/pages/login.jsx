import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Center,
  useToast,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import apiRequest from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({
    email: false,
    password: false,
  });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("city-token")) {
      navigate("/dash");
    }
  });

  const handleClick = async () => {
    console.log({ email, password });
    setLoading(true);
    if (!email) {
      setValidationErr({ ...validationErr, email: true });
      return setLoading(false);
    }

    if (!password) {
      setValidationErr({ ...validationErr, password: true });
      return setLoading(false);
    }

    try {
      const user = await apiRequest.post("config/v1/auths/login", {
        login_id: email,
        login_password: password,
      });
      if (user) {
        const userData = user.data.data[0];

        const token = userData.jwt_token;
        if (token) {
          localStorage.setItem("city-token", token);
          navigate("/dash");
          toast({
            title: "thank you",
            description: "You logged in",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
        setLoading(false);
      }
    } catch (axiosError) {
      if (axiosError) {
        toast({
          title: "oops",
          description: "wrong credentials",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <Center marginTop="200px">
      <Flex w="500px" h="500px" direction="column" alignItems="center">
        <Box p="5px" w="100%" background="blue" color="#fff" mb="4">
          Login here
        </Box>
        <FormControl>
          <FormLabel htmlFor="email">Email address:</FormLabel>
          <Input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {validationErr.email ? (
            <Box color="red">Email is required.</Box>
          ) : (
            <FormHelperText>We'll never share your email.</FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Password:</FormLabel>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {validationErr.password ? (
            <Box color="red">password is required.</Box>
          ) : (
            <FormHelperText>Password here.</FormHelperText>
          )}
        </FormControl>

        <Button
          isLoading={loading}
          color="white"
          bg="blue"
          onClick={handleClick}
        >
          Button
        </Button>
      </Flex>
    </Center>
  );
};

export default Login;

// krishna.timilsina@citytech.global
// TEST@1234
