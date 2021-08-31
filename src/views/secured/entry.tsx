import React, { PropsWithChildren, useEffect, useState } from "react";
import { ViewMetaDate } from "../../lib/types/View";
import { Descriptions } from "antd";
import styled from "styled-components";
import { FixedButton } from "../../components/common/Buttons";
import _isArray from "lodash/isArray";
import { useRegisterListRequest } from "../../lib/request/api";
import dayjs from "dayjs";

const ItemsContainer = styled.div`
  padding-bottom: 85px;
  margin: 0 15px;
  position: relative;
`;
const TitlePanel = styled.div`
  display: flex;
  justify-content: space-between;
  .date {
    font-size: 14px;
    font-weight: 400;
  }
`;

export const metaData: ViewMetaDate = {
  header: {
    title: "Bookings",
    subTitle: "",
    goBack: "/",
    className: "step",
  },
};

type bookingType = {
  type: string;
  symptoms: AnyObject;
  index: number;
};

const Item = ({ symptoms, type, index = 1 }: bookingType) => {
  const { date, complaints, comments } = symptoms;
  return (
    <Descriptions
      style={{
        padding: "20px 5px",
      }}
      labelStyle={{
        width: 0,
        padding: "20px 12px",
        fontSize: 18,
      }}
      contentStyle={{ color: "red" }}
      bordered
      title={
        <TitlePanel>
          <div className="type">{"# " + index}</div>
        </TitlePanel>
      }
      column={1}
      size={"default"}
    >
      <Descriptions.Item label="Clinic">{type}</Descriptions.Item>
      <Descriptions.Item label="Date">{date}</Descriptions.Item>
      <Descriptions.Item label="Complaint">
        {_isArray(complaints)
          ? complaints.map((c, index) => {
              return (
                <div key={index}>
                  {c}
                  <br />
                </div>
              );
            })
          : null}
      </Descriptions.Item>
      <Descriptions.Item label="Comment">{comments}</Descriptions.Item>
    </Descriptions>
  );
};

const BookingItem = styled(Item)`
  padding: 10px;
  margin: 10px;
`;

// const data = [
//   {
//     _id: "123_20210824_pediatric",
//     _rev: "1-ab56b0cc6212f87c43b91b25bf1d8c89",
//     symptoms: {
//       date: "2021-08-24",
//       comments:
//         "gkldfgh reklj ergnerl gl;rjke gjekrg erlgkjerlk gerklg erjklg jelkjsdlf;gj;dljgkldfgjlerjgel gjekglej lrkg erklg jerkg jelkj ",
//       complaints: ["Voice lost", "Reduce hearing", "Vomiting", "Fever"],
//       location: "5",
//     },
//     patient: {
//       birthday: "1999-10-01",
//       address: "fkl fek fe",
//       sex: "male",
//       name: "123",
//       location: "5",
//       citizenId: "1234237428239",
//     },
//     ancCheckList: {
//       insurance: "not_using_insurance",
//       mother: "rww",
//       education: "junior_high_school_graduate",
//       occupation: "merchants",
//       partner: "42342",
//       father: "rrr",
//       partnerEducation: "junior_high_school_graduate",
//       partnerOccupation: "private_officer",
//     },
//     type: "pediatric",
//     phone: "123",
//     createdDate: 1629712528393,
//   },
// ];

export default function Entry(props: PropsWithChildren<any>) {
  const date = dayjs().add(-7, "month").valueOf();
  const [list, setList] = useState([]);
  const getRegisters = useRegisterListRequest();
  useEffect(() => {
    getRegisters({ date: date.valueOf() }).then((data: any) => {
      console.log("registration list..................", data);
      setList(data.list);
    });
  }, []);
  console.log();
  return (
    <>
      <ItemsContainer>
        {list.map((item: AnyObject, index) => {
          return (
            <BookingItem
              key={item._id}
              symptoms={item.symptoms}
              type={item.type}
              index={index + 1}
            />
          );
        })}
      </ItemsContainer>
      <FixedButton to={"/register/step1"} label={"New"} />
    </>
  );
}
