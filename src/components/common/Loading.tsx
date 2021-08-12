import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Main = styled.div`
  height: 100%;
  width: 100%;
  .loading {
    height: 100%;
    width: 100%;
    position: fixed;
    background-color: #001;
    opacity: 0.2;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    //padding-top: 20%;
  }
`;

const Loading = ({ loading, children }: PropsWithChildren<any>) => {
  const Indicator = <Spin spinning={loading} />;
  return (
    <Main>
      {loading && (
        <React.Fragment>
          <div className={"loading"}>{Indicator}</div>
        </React.Fragment>
      )}
      {children}
    </Main>
  );
};

export const InlineLoading = () => (
  <div style={{ textAlign: "center" }}>
    <Spin spinning={true} />
  </div>
);

export default Loading;
