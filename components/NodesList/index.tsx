import {
  Checkbox,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { Node } from "../../pages";

interface NodesListProps {
  nodes: Node[];
  setNodes: (x: any) => void;
}

export default function NodesList(props: NodesListProps) {
  const hasNode = useCallback(
    (node: Node) => {
      let index = props.nodes.indexOf(node);
      return index;
    },
    [props.nodes]
  );

  const updateIsBootNode = async (node: Node, value: boolean) => {
    const index = hasNode(node);
    if (index < 0) return;
    const newNodes = [...props.nodes];
    newNodes[index].isBootNode = value;
    props.setNodes(newNodes);
  };

  const updatePort = async (node: Node, value: string) => {
    const index = hasNode(node);
    if (index < 0) return;
    const newNodes = [...props.nodes];
    newNodes[index].port = parseInt(value);
    props.setNodes(newNodes);
  };

  const updateIsValidator = async (node: Node, value: boolean) => {
    const index = hasNode(node);
    if (index < 0) return;
    const newNodes = [...props.nodes];
    newNodes[index].isValidator = value;
    props.setNodes(newNodes);
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        padding: "1rem",
      }}
    >
      <h2>Nodes lists:</h2>
      <TableContainer>
        <Table variant="simple" overflow={"scroll"}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Public Key</Th>
              <Th>Is Validator</Th>
              <Th>Is BootNode</Th>
              <Th>Port</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.nodes.map((node) => {
              return (
                <Tr key={node.id}>
                  <Td>{node.id}</Td>
                  <Td>{node.dirName}</Td>
                  <Td>{node.publicKey}</Td>
                  <Td>
                    <Checkbox
                      isChecked={node.isValidator}
                      onChange={(e) => {
                        updateIsValidator(node, e.target.checked);
                      }}
                    />
                  </Td>
                  <Td>
                    <Checkbox
                      isChecked={node.isBootNode}
                      onChange={(e) => {
                        updateIsBootNode(node, e.target.checked);
                      }}
                    />
                  </Td>
                  <Td>
                    <Input
                      width={100}
                      value={node.port}
                      placeholder="Port"
                      onChange={(e) => {
                        updatePort(node, e.target.value);
                      }}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
