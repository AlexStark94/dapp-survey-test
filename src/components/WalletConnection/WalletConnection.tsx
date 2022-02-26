import React, { useEffect, useState } from "react";
import { Card, Select, Button, Row } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { ethers } from "ethers";

// Actions
import { setContract } from "../../actions/quizActions";

// Styles
import "./WalletConnection.css";

// Smart Contract ABI
import Survey from "../../contracts/survey.json";

const { Option } = Select;

declare let window: any;

export default function WalletConnection() {
  const dispatch = useDispatch();
  const { contract } = useSelector((state: any) => state.survey);
  const [ network, setNetwork ] = useState('');
  const history = useHistory();

  useEffect(() => {
    console.log(contract);
    if (network === 'ropsten' && contract) {
      history.push('/survey')
    }
  }, [network]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length !== 0) {
        toast.success(`Wallet is Connected ${accounts[0]}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn("Make sure you have MetaMask Connected", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      fetchSurvey();
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
    }
  };

  const fetchSurvey = async () => {
    let contractAddress = "0x74f0b668ea3053052deaa5eedd1815f579f0ee03";
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer: any = provider.getSigner();
    const smartContract = new ethers.Contract(contractAddress, Survey, provider);
    dispatch(setContract(smartContract));
    provider.getNetwork().then((network: any) => {
      if (network.name === 'ropsten') {
        toast.success('You are connected with a Ropsten wallet', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Please connect a Ropsten network and press "Connect Your Wallet" again', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setNetwork(network.name);
    });

    
    console.log(smartContract);
    
    const surveyName = await smartContract.name();
    const surveySymbol = await smartContract.symbol();
    const balance = await smartContract.balanceOf(contractAddress);
  };

  return (
    <Card className="card-json-uploader-container">
      <Row className="button-container">
        <Button
          type="primary"
          size="large"
          shape="round"
          icon={<WalletOutlined />}
          block
          onClick={() => connectWallet()}
        >
          Connect Your Wallet
        </Button>
      </Row>
    </Card>
  );
}
