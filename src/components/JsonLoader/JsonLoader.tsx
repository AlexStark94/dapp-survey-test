import React from "react";
import { Card, Upload } from "antd";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";

// Styles
import './JsonLoader.css';

// ACTIONS
import { uploadJson } from "../../actions/quizActions";

const { Dragger } = Upload;

export default function JsonLoader() {
  const dispatch = useDispatch();
  const history = useHistory();

  const dummyRequest = (e: any) => {
    setTimeout(() => {
      e.onSuccess("ok");
      const fileread = new FileReader();
      fileread.onload = function (e: any) {
        var content = e.target.result;
        var intern = JSON.parse(content);
        dispatch(uploadJson(intern));
        history.push('/wallet-connection')
      };
      fileread.readAsText(e.file);
    }, 0);
  };

  return (
    <Card className="card-json-uploader-container">
      <Dragger
        name="file"
        customRequest={(e: any) => dummyRequest(e)}
        accept=".json"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined color="#2ba69e" />
        </p>
        <p className="ant-upload-text">
          Click or drag your survey
        </p>
        <p className="ant-upload-hint">
          Only supports .json files
        </p>
      </Dragger>
    </Card>
  );
}
