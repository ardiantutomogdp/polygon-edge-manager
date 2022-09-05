import { Button, Input } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";

interface Node {
  id: String;
  publicKey: String;
}
const Home: NextPage = () => {
  const [nodes, _] = useState<[Node]>();
  const [dirName, setDirName] = useState<string>();
  const createNode = async () => {
    fetch("http://localhost:3000/api/node", {
      method: "POST",
      body: JSON.stringify({ dirName }),
    }).then(async (response) => {
      console.log(await response.json());
    });
  };

  return (
    <>
      <Input
        value={dirName}
        onChange={(e) => {
          setDirName(e.target.value);
        }}
      />
      <Button onClick={createNode}>Create Node</Button>
    </>
  );
};

export default Home;
