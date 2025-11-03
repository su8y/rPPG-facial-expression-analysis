import {Table, Text} from "@mantine/core";
import {BlurOverlay} from "../../../components";
import type {ReactNode} from "react";

export const EmptyTableTd = ({value}: { value: string | ReactNode }) => (
    <Table.Td><Text component="div" c="dimmed" style={{position: 'relative'}}>{value}<BlurOverlay/></Text></Table.Td>);