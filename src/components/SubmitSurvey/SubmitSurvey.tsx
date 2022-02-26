import React, { useEffect } from "react";
import { Card, Button, Divider, List } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ethers } from "ethers";

// Styles
import "./SubmitSurvey.css";

// Smart Contract ABI
import Survey from "../../contracts/survey.json";

declare let window: any;

export default function SubmitSurvey() {
  const history = useHistory();
  const { answers, contract } = useSelector((state: any) => state.survey);

  useEffect(() => {
    if (!answers || !contract) {
      history.push("/");
    }
  }, [answers, contract]);

  const handleSubmit = async () => {
    try {
      const { ethereum } = window;
      let contractAddress = "0x74F0B668Ea3053052DEAa5Eedd1815f579f0Ee03";

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Survey, signer);

        await signer.getAddress().then(async (e: any) => {
          const submit = await contract.submit(10, answers, {
            gasLimit: 300000
          });

          console.log(`Mining... ${submit.hash}`);
          toast.warning(`Mining... ${submit.hash}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          await submit.wait();

          console.log(`Mined!! - ${submit.hash}`);
          toast.success(`Mined!! - ${submit.hash}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    } catch (error: any) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error.message);
    }
  };

  return (
    <Card className="card-json-uploader-container">
      <Divider orientation="left">This are you're selected options:</Divider>
      <List
        size="small"
        bordered
        dataSource={answers ? answers : []}
        renderItem={(answer: any) => <List.Item>{answer + 1}</List.Item>}
      />

      <Button className="button-submit-survey" block shape="round" type="primary" onClick={() => handleSubmit()}>
        Submit Survey
      </Button>
    </Card>
  );
}
