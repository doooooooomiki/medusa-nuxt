import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";
import {
  Button,
  Container,
  Heading,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
} from "@medusajs/ui";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";

import { SingleColumnLayout } from "../../layouts/single-column";

type KeycrmLinking = {
  id: string;
  keycrm_product_id: number;
  handle: string;
};

type KeycrmLinkingResponse = {
  linkings: KeycrmLinking[];
  count: number;
  limit: number;
  offset: number;
};
const KeycrmLinkingsPage = () => {
  const columnHelper = createDataTableColumnHelper<KeycrmLinking>();

  const columns = [
    columnHelper.accessor("keycrm_product_id", {
      header: "Keycrm Product ID",
    }),
    columnHelper.accessor("handle", {
      header: "Handle",
    }),
  ];

  const limit = 15;
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });

  const offset = useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);

  const { data, isLoading } = useQuery<KeycrmLinkingResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/keycrm-linkings`, {
        query: {
          limit,
          offset,
        },
      }),
    queryKey: [["keycrm-linkings", limit, offset]],
  });

  const table = useDataTable({
    columns,
    data: data?.linkings || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });

  const { t } = useTranslation();

  return (
    <SingleColumnLayout>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Keycrm Linkings</Heading>
          <div className="flex items-center justify-center gap-x-2">
            <Button size="small" variant="secondary" asChild>
              <Link to="create">{t("actions.create")}</Link>
            </Button>
          </div>
        </div>
        <DataTable instance={table}>
          <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>search ...</Heading>
          </DataTable.Toolbar>
          <DataTable.Table />
          <DataTable.Pagination />
        </DataTable>
      </Container>
    </SingleColumnLayout>
  );
};

export const config = defineRouteConfig({
  label: "Keycrm Linkings",
  icon: ChatBubbleLeftRight,
});

export default KeycrmLinkingsPage;
