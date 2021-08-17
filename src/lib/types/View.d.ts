import { FC } from "react";

export interface MyViewType {
  default: FC;
  metaData?: ViewMetaDate;
}

export interface ViewMetaDate {
  header?: {
    title: string;
    subTitle: string;
    goBack?: string;
    className?: string;
  };
}
