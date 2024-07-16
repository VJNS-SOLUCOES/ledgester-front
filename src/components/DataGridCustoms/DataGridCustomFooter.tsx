import {
  GridFooterContainer,
  GridPagination,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination, PaginationItem } from '@mui/material';

export const DataGridCustomFooter = () => {
  return (
    <GridFooterContainer className="mr-2 justify-center border-0 sm:mr-0 sm:justify-end sm:pt-8 2xl:mb-0">
      <GridPagination ActionsComponent={DataGridCustomFooter.Pagination} />
    </GridFooterContainer>
  );
};

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      className="w-auto sm:ml-6"
      count={pageCount}
      siblingCount={1}
      page={page + 1}
      // @ts-expect-error
      renderItem={props2 => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
};

DataGridCustomFooter.Pagination = CustomPagination;
