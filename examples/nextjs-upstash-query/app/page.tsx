import { Deployment, Status, allDeployments, deploymentsByAuthor, deploymentsByProject, deploymentsByStatus } from "@/lib/db";
import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
  Button,
  Color,
  Grid,
  Col,
  Select,
  SelectItem,
} from "@tremor/react";
import { CreateDeployment } from "./create-deployment";
import { removeDeployment } from "./action";
import { Document } from "@upstash/query";
import Link from "next/link";
import { FilterByAuthor, FilterByProject, FilterByStatus } from "./filters";

const colors: Record<Status, Color> = {
  queued: "gray",
  failed: "rose",
  building: "orange",
  success: "green"
};



type Props = {
  searchParams?: {
    project?: string;
    author?: string;
    status?: Status;
  }
}

export default async function Page(props: Props) {

  let deployments: Document<Deployment>[] = []
  if (props.searchParams?.status) {
    deployments = await deploymentsByStatus.match({ status: props.searchParams.status })
  } else if (props.searchParams?.project) {
    deployments = await deploymentsByProject.match({ project: props.searchParams.project })
  } else if (props.searchParams?.author) {
    deployments = await deploymentsByAuthor.match({ author: props.searchParams.author })
  } else {
    deployments = await allDeployments.list()
  }
  console.log({deployments})


  return (
    <main className="m-8">



      <Grid numItemsLg={6} className="gap-6">
        <Col numColSpan={2}>
          <FilterByProject defaultProject={props.searchParams?.project} />
        </Col>
        <Col numColSpan={2}>
          <FilterByAuthor defaultAuthor={props.searchParams?.author} />
        </Col>
        <Col numColSpan={2}>
          <FilterByStatus defaultStatus={props.searchParams?.status} />
        </Col>


        <Col numColSpanLg={4}>
          <Card className="h-full">
            <Flex justifyContent="start" className="space-x-2">
              <Title>Deployments</Title>
              <Badge color="gray">{deployments.length}</Badge>
            </Flex>
            <Text className="mt-2">Overview of all your deployments</Text>

            <Table className="mt-6">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Deployment ID</TableHeaderCell>
                  <TableHeaderCell>Project</TableHeaderCell>
                  <TableHeaderCell>Author</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                  <TableHeaderCell>Git Sha</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {deployments.map(({ data }) => (
                  <TableRow key={data.id}>
                    <TableCell className="truncate">{data.id}</TableCell>
                    <TableCell>{data.project}</TableCell>
                    <TableCell>{data.author}</TableCell>
                    <TableCell>
                      <Badge color={colors[data.status]} size="xs">
                        {data.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{data.gitCommit}</TableCell>
                    <TableCell>
                      <form action={removeDeployment}>
                        <input type="hidden" name="deploymentId" value={data.id} />
                        <Button size="xs" variant="secondary" color="red">
                          Delete
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Col>

        <Col numColSpanLg={2}>
          <Card className="sticky top-0 h-full">
            <CreateDeployment />
          </Card>

        </Col>
      </Grid>
    </main>

  );
}