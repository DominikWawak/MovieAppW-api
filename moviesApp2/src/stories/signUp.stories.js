import React from "react";
import SignUpForm from "../components/signUp";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'

import { useAuth} from '../contexts/AuthContext'
//USE HISTORY ADDED
import { Link, useHistory} from 'react-router-dom'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "Home Page/ SignUpForm",
  component: SignUpForm,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
};

export const Basic = () => {
  return <SignUpForm />;
};
Basic.storyName = "Default";