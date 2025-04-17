import { useRouter } from 'next/router';
import { useEffect } from 'react';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
  Backdrop,
} from '@mui/material';
import Link from '@components/Link';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@/hooks/useSettings';
import useTable, { emptyRows } from '@/hooks/useTable';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import Iconify from '@/components/Iconify';
import Scrollbar from '@/components/Scrollbar';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '@/components/table';
// sections
import { UserTableToolbar, UserTableRow } from '@/sections/@dashboard/user/list';
import useFetchUsers from '@/react-query/user/useFetchUsers';
import useFilterUser from '@/zustand/users/useFilterUser';
import { useShallow } from 'zustand/react/shallow';
import useDeleteUser from '@/react-query/user/useDeleteUser';
import UserTableRowSkeleton from '@/sections/@dashboard/user/list/UserTableRowSkeleton';
import useUsersTabState from '@/zustand/users/useUserSetTab';
import { UserStatusEnum } from '@/types/enums/user-status.enum';
import { Icon } from '@iconify/react';
import useUsersPagination from '@/zustand/users/useUsersPagination.ts';
import { useFetchWallet } from '@/react-query/user/useFetchUsers';
import useRenewaUser from '@/react-query/user/useRenewaUser';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'All', label: 'همه' },
  { value: UserStatusEnum.ACTIVE, label: 'فعال' },
  { value: UserStatusEnum.INACTIVE, label: 'غیرفعال' },
];

// const ROLE_OPTIONS = ['all', RoleEnum.ADMIN, RoleEnum.PHARMACY, RoleEnum.SUPPORT, RoleEnum.USER];

const TABLE_HEAD = [
  { id: '' },
  { id: 'full_name', label: 'نام', align: 'left' },
  { id: 'type', label: 'نوع اکانت', align: 'left' },
  { id: 'start_time', label: 'تاریخ شروع', align: 'left' },
  { id: 'end_time', label: 'روزهای مانده تا پایان', align: 'left', width: '100px' },
  { id: 'status', label: 'وضعیت', align: 'left' },
  { id: 'download', label: '', align: 'left' },
  { id: 'download', label: 'عملیات ها ', align: 'left' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------


export default function UserList() {
  const { dense, order, orderBy, onSort, onChangeDense } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const { data: users, isLoading, error } = useFetchUsers();

  const tableData = users?.result || [];
  const { activeTab, setTab } = useUsersTabState(
    useShallow((state) => ({ activeTab: state.activeTab, setTab: state.setActiveTab }))
  );

  const { setFullName, setRole, fullName, role } = useFilterUser(
    useShallow((state) => ({
      setRole: state.setRole,
      setFullName: state.setFullName,
      role: state.role,
      fullName: state.fullName,
    }))
  );
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const handleFilterName = (filterName) => {
    setFullName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id: number) => {
    deleteUser(id);
  };


  const handleEditRow = (id) => {
    push(PATH_DASHBOARD.user.edit(+id));
  };

  const { setRowPerPage, page, setPage, total, rowPerPage } = useUsersPagination(
    useShallow((state) => ({
      total: state.totalPages,
      page: state.activePage,
      setPage: state.setPage,
      setRowPerPage: state.setRowPerPage,
      rowPerPage: state.rowPerPage,
    }))
  );

  const denseHeight = dense ? 52 : 52;

  const isNotFound = !tableData.length;
  
  const {data}=useFetchWallet()

  return (
    <Page title="اکانت ها">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="لیست اکانت ها "
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'کاربر', href: PATH_DASHBOARD.user.root },
            { name: 'لیست' },
          ]}
          action={
            <Link href={PATH_DASHBOARD.user.new}>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                اکانت جدید
              </Button>
            </Link>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={setTab}
            sx={{ px: 2, bgcolor: 'background.default' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  onSort={onSort}
                />

                {isLoading ? (
                  <TableBody>
                    {Array.from(Array(5)).map((_, index) => (
                      <UserTableRowSkeleton key={index} />
                    ))}
                  </TableBody>
                ) : error ? (
                  <Backdrop open={true}>
                    <Box sx={{ border: '1px solid red', padding: 5, borderRadius: 5 }}>
                      <Icon color="red" width={100} icon={'material-symbols:error-outline'} />

                      <Typography>{error?.errorData || 'خطایی رخ داده است'}</Typography>
                    </Box>
                  </Backdrop>
                ) : (
                  <TableBody>
                    {tableData.map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                      />
                    ))}

                    {/*<TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />*/}

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative', zIndex: -1 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              labelRowsPerPage={'تعداد ردیف در هر صفحه : '}
              count={(users?.pagination?.lastPage || 0) * rowPerPage}
              rowsPerPage={rowPerPage}
              page={page}
              onPageChange={(_, thisPage) => setPage(thisPage)}
              onRowsPerPageChange={(event) => setRowPerPage(+event.target.value)}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="فشرده"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
