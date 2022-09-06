import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NodeConfig } from "../RunNode";

interface RunningNodeProps {
  runningNodes: NodeConfig[];
}

export default function RunningNode(props: RunningNodeProps) {
  return (
    <div>
      Running Node:
      <TableContainer>
        <Table variant="simple" overflow={"scroll"}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>gRPCPort</Th>
              <Th>libp2pPort</Th>
              <Th>JsonRPCPort</Th>
              <Th>NAT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.runningNodes.map((node) => {
              return (
                <Tr key={node.name}>
                  <Td>{node.name}</Td>
                  <Td>{node.gRpcPort}</Td>
                  <Td>{node.libp2pPort}</Td>
                  <Td>{node.jsonRpcPort}</Td>
                  <Td>{node.nat}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
