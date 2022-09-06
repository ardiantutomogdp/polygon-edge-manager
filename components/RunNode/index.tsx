import { Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Node } from "../../pages";

export interface NodeConfig {
  name: string;
  gRpcPort: number;
  jsonRpcPort: number;
  nat: string;
  libp2pPort: number;
  blockTime: number;
}

interface RunNodeProps {
  nodes: Node[];
  runningNodes: NodeConfig[];
  setRunningNodes: (x: any) => void;
}

export default function RunNode(props: RunNodeProps) {
  const [nodeConfig, setNodeConfig] = useState<NodeConfig>({
    gRpcPort: 10001,
    jsonRpcPort: 10002,
    libp2pPort: 10003,
    blockTime: 10,
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
      const node = props.nodes.filter((rn) => rn.dirName === value);
      newConfig.gRpcPort = node[0].port - 1;
      newConfig.libp2pPort = node[0].port;
      newConfig.jsonRpcPort = node[0].port + 1;
      newConfig.name = value;
    } else if (key === "nat") {
      newConfig.nat = value;
    } else if (key === "libp2pPort") {
      newConfig.libp2pPort = parseInt(value);
    } else if (key === "blockTime") {
      newConfig.blockTime = parseInt(value);
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
      <Select
        onChange={(e) => {
          updateNodeConfig("name", e.target.value);
        }}
        placeholder="Select a Node"
      >
        {props.nodes.map((node) => {
          const exists = props.runningNodes.filter(
            (rn) => rn.name === node.dirName
          );
          if (exists.length > 0) return;
          return (
            <option key={node.id} value={node.dirName}>
              {node.dirName}
            </option>
          );
        })}
      </Select>
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
      Block Time:
      <Input
        value={nodeConfig?.blockTime}
        placeholder="Block Time"
        onChange={(e) => {
          updateNodeConfig("blockTime", e.target.value);
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
