import React, { useEffect } from "react";
import { Tag } from "antd";
import { DollarOutlined } from "@ant-design/icons";

// Styles
import "./Balance.css";
import { useSelector } from "react-redux";

export default function Balance() {
  const { balance } = useSelector((state: any) => state.survey);

  useEffect(() => {
    console.log(balance);
  }, [balance]);

  return (
    balance && (
      <Tag
        className="tag-balance"
        icon={<DollarOutlined style={{ fontSize: "1rem" }} />}
        color="#55acee"
      >
        {balance}
      </Tag>
    )
  );
}
