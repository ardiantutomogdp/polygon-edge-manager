import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Node } from "../../pages";

export interface NodeConfig {
  name: string | undefined;
  gRpcPort: number | undefined;
  jsonRpcPort: number | undefined;
  nat: string | undefined;
  libp2pPort: number | undefined;
}

interface RunNodeProps {
  nodes: Node[];
  runningNodes: NodeConfig[];
  setRunningNodes: (x: any) => void;
}

export default function RunNode(props: RunNodeProps) {
  const [nodeConfig, setNodeConfig] = useState<NodeConfig>({
    gRpcPort: undefined,
    jsonRpcPort: undefined,
    libp2pPort: undefined,
    name: "",
    nat: "",
  });

  const updateNodeConfig = (key: any, value: any) => {
    let newConfig = { ...nodeConfig };
    if (key === "gRpcPort") {
      newConfig.gRpcPort = parseInt(value);
    } else if (key === "jsonRpcPort") {
      newConfig.jsonRpcPort = parseInt(value);
    } else if (key === "name") {
      newConfig.name = value;
    } else if (key === "nat") {
      newConfig.nat = value;
    } else if (key === "libp2pPort") {
      newConfig.libp2pPort = parseInt(value);
    }
    setNodeConfig(newConfig);
  };

  const runNode = async () => {
    fetch("http://localhost:3000/api/run", {
      method: "POST",
      body: JSON.stringify({ nodes: props.nodes, nodeConfig }),
    }).then(async (response) => {
      const node: NodeConfig = (await response.json()).node;
      props.setRunningNodes([...props.runningNodes, node]);
    });
  };
  return (
    <div style={{ marginTop: "1rem", padding: "1rem " }}>
      Start a Node
      <Input
        value={nodeConfig?.name}
        placeholder="Name"
        onChange={(e) => {
          updateNodeConfig("name", e.target.value);
        }}
      />
      gRPCPort:
      <Input
        value={nodeConfig?.gRpcPort}
        placeholder="gRPC port"
        onChange={(e) => {
          updateNodeConfig("gRpcPort", e.target.value);
        }}
      />
      libp2pPort:
      <Input
        value={nodeConfig?.libp2pPort}
        placeholder="libp2p port"
        onChange={(e) => {
          updateNodeConfig("libp2pPort", e.target.value);
        }}
      />
      jsonRPCPort:
      <Input
        value={nodeConfig?.jsonRpcPort}
        placeholder="Json RPC port"
        onChange={(e) => {
          updateNodeConfig("jsonRpcPort", e.target.value);
        }}
      />
      NAT Address:
      <Input
        value={nodeConfig?.nat}
        placeholder="nat address"
        onChange={(e) => {
          updateNodeConfig("nat", e.target.value);
        }}
      />
      <Button marginTop={2} onClick={runNode}>
        Run Node
      </Button>
    </div>
  );
}
