import type { NextPage } from "next";
import { useState } from "react";
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

  // useEffect(() => {
  //   const nodesInStorage = localStorage.getItem("nodes");
  //   if (nodesInStorage !== null && nodesInStorage.length > 0) {
  //     const items = JSON.parse(nodesInStorage);
  //     if (items) {
  //       setNodes(items);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (nodes.length > 0) {
  //     localStorage.setItem("nodes", JSON.stringify(nodes));
  //   }
  // }, [nodes]);

  return (
    <>
      <CreateNode
        dirName={dirName}
        nodes={nodes}
        setDirName={setDirName}
        setNodes={setNodes}
      />
      <NodesList nodes={nodes} setNodes={setNodes} />
      <GenesisConfig nodes={nodes} />
      <RunNode
        nodes={nodes}
        runningNodes={runningNodes}
        setRunningNodes={setRunningNodes}
      />
      <RunningNode runningNodes={runningNodes} />
    </>
  );
};

export default Home;
