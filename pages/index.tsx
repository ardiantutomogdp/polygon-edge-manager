import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CreateNode from "../components/CreateNode";
import GenesisConfig from "../components/GenesisConfig";
import NodesList from "../components/NodesList";
import RunningNode from "../components/RunningNode.tsx";
import RunNode, { NodeConfig } from "../components/RunNode";

export interface Node {
  id: string;
  dirName: string;
  publicKey: string;
  isValidator: boolean;
  isBootNode: boolean;
  port: number;
}

const Home: NextPage = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [runningNodes, setRunningNodes] = useState<NodeConfig[]>([]);
  const [dirName, setDirName] = useState<string>("");
  const [genesisGenerated, setGenesisGenerated] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/data", {
      method: "GET",
    }).then(async (response) => {
      const data = await response.json();
      if (data.noData) {
        setGenesisGenerated(false);
      } else {
        setNodes(data.data.nodes);
        setGenesisGenerated(true);
      }
    });
  }, []);

  if (genesisGenerated) {
    return (
      <>
        <RunNode
          nodes={nodes}
          runningNodes={runningNodes}
          setRunningNodes={setRunningNodes}
        />
        <RunningNode runningNodes={runningNodes} />
      </>
    );
  } else {
    return (
      <>
        <CreateNode
          dirName={dirName}
          nodes={nodes}
          setDirName={setDirName}
          setNodes={setNodes}
        />
        <NodesList nodes={nodes} setNodes={setNodes} />
        <GenesisConfig
          nodes={nodes}
          setGenesisGenerated={setGenesisGenerated}
        />
      </>
    );
  }
};

export default Home;
