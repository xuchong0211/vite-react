import { QueryClientProvider, QueryClient } from "react-query";
import React, { PropsWithChildren, ReactNode } from "react";
import { useRegisterRequest } from "./api";

const queryClient = new QueryClient();

export default function (props: PropsWithChildren<ReactNode>) {
  // const toRegister = useRegisterRequest();
  // queryClient.setMutationDefaults("register", {
  //   mutationFn: toRegister,
  // });
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
