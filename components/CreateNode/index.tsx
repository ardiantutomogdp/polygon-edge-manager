import { Button, Input } from "@chakra-ui/react";
import { Node } from "../../pages";

interface CreateNodeProps {
  dirName: string;
  nodes: Node[];
  setDirName: (x: any) => void;
  setNodes: (x: any) => void;
}

export default function CreateNode(props: CreateNodeProps) {
  const createNode = async () => {
    fetch("http://localhost:3000/api/node", {
      method: "POST",
      body: JSON.stringify({
        dirName: props.dirName,
        count: props.nodes.length,
      }),
    }).then(async (response) => {
      const node: Node = (await response.json()).node;
      props.setNodes([...props.nodes, node]);
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Input
        value={props.dirName}
        placeholder="Name"
        onChange={(e) => {
          props.setDirName(e.target.value);
        }}
      />
      <Button marginTop={"2"} onClick={createNode}>
        Create Node
      </Button>
    </div>
  );
}
