import React from "react";

export type loadingTypes = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = React.createContext<loadingTypes | undefined>(undefined);

function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

function useLoading(): loadingTypes {
  const context = React.useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a CountProvider");
  }
  return context;
}

export { LoadingProvider, useLoading };

// type LoadingContextType = Array<loadingTypes>;
//
// function generateContext<T extends Array<AnyObject>>(defaultValue: T[0]) {
//   const Context = React.createContext<T | undefined>(undefined);
//
//   const Provider = ({ children }: { children: React.ReactNode }) => {
//     const [value, setValue] = React.useState<T[0]>(defaultValue);
//     const providerValue = { value, setValue };
//     return (
//       //todo value中包含，值和设置值得方法 value类型报错
//       <Context.Provider value={providerValue}>{children}</Context.Provider>
//     );
//   };
//
//   return { Context, Provider };
// }
//
// //
// //todo 初始值类型报错
// const result = generateContext<LoadingContextType>(false);
