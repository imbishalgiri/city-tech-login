import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button, Box, useToast, Text } from "@chakra-ui/react";

import apiRequest from "../utils/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [token, setToken] = useState();
  const toast = useToast();

  useEffect(() => {
    if (!localStorage.getItem("city-token")) {
      navigate("/");
    }
    if (localStorage.getItem("city-token")) {
      const token = localStorage.getItem("city-token");
      const decoded = jwt(token);
      setToken(decoded.email);
    }
  });

  const getTransactions = async () => {
    try {
      const data = await apiRequest.get(
        "/transaction-manager/v1/admin/dashboard/search",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("city-token")} `,
          },
        }
      );
      setData(data?.data);
    } catch (error) {
      toast({
        title: "oops",
        description: "There was error making api requests",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      {token && (
        <Box mt="100px" background="#3c2e2e" color="#fff">
          {" "}
          Hey! <Text fontSize="3xl">{token}</Text> Welcome to the app
        </Box>
      )}
      <br />
      <Button
        backgroundColor="blue"
        color="#fff"
        onClick={() => {
          navigate("/");
          localStorage.removeItem("city-token");
        }}
      >
        LogOut
      </Button>
      <br />
      <br />
      {data && (
        <>
          <Text fontSize="4xl"> Response from the api is: </Text>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </>
      )}
    </div>
  );
};

export default Dashboard;

// mail
// krishna.timilsina@citytech.global
// sampada.bista@citytech.global

//
