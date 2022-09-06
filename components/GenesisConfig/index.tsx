import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Node } from "../../pages";

interface GenesisConfigProps {
  nodes: Node[];
  setGenesisGenerated: (x: any) => void;
}

export interface GenesisConfig {
  premineAddress: string;
  premineValue: string;
  chainId: number;
  blockGasLimit: number;
}

export default function GenesisConfig(props: GenesisConfigProps) {
  const [premineAddress, setPremineAddress] = useState<string>(
    "0xE27Fcffd67f2A65A04baa934818F45B94F8F4603"
  );
  const [premineValue, setPremineValue] = useState<string>(
    "1000000000000000000000"
  );
  const [chainId, setChainId] = useState<number>(999);
  const [blockGasLimit, setBlockGasLimit] = useState<number>(1000000000);

  const generateGenesisFile = async () => {
    const genesisConfig = {
      premineAddress,
      premineValue,
      chainId,
      blockGasLimit,
    } as GenesisConfig;
    fetch("http://localhost:3000/api/genesis", {
      method: "POST",
      body: JSON.stringify({ nodes: props.nodes, genesisConfig }),
    }).then(async () => {
      props.setGenesisGenerated(true);
    });
  };

  return (
    <div style={{ marginTop: "1rem", padding: "1rem " }}>
      Premine Address:
      <Input
        value={premineAddress}
        placeholder="Premine Address"
        onChange={(e) => {
          setPremineAddress(e.target.value);
        }}
      />
      Premine Value (in wei):
      <Input
        marginTop={2}
        value={premineValue}
        placeholder="Premine Value (in wei)"
        onChange={(e) => {
          setPremineValue(e.target.value);
        }}
      />
      Block Gas Limit (in wei):
      <Input
        marginTop={2}
        value={blockGasLimit}
        onChange={(e) => {
          setBlockGasLimit(parseInt(e.target.value));
        }}
      />
      Chain Id:
      <Input
        marginTop={2}
        value={chainId}
        onChange={(e) => {
          setChainId(parseInt(e.target.value));
        }}
      />
      <Button marginTop={2} onClick={generateGenesisFile}>
        Generate Genesis File
      </Button>
    </div>
  );
}
