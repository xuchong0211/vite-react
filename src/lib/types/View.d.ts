import { FC, ReactNode } from "react";

export interface MyViewType {
  default: FC;
  metaData?: ViewMetaDate;
}

export interface ViewMetaDate {
  header?: {
    title: string;
    subTitle: string | undefined | null;
    goBack?: string;
    className?: string;
  };
}
