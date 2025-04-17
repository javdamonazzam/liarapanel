// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '@/hooks/useSettings';
// layouts
import Layout from '@/layouts';
// components
import Page from '@/components/Page';
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs';
import ProductNewEdit from '@sections/@dashboard/product/ProductNewEdit.tsx';
import RoleBasedGuard from '@/guards/RoleBasedGuard';
import { getUserRole } from '@/utils/jwt';
// sections

// ----------------------------------------------------------------------

CreateProduct.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CreateProduct() {
  const { themeStretch } = useSettings();

  return (
    <RoleBasedGuard  accessibleRoles={getUserRole()}>
    <Page title="سرور : ساخت سرور جدید">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ساخت سرور جدید"
          links={[
            { name: 'داشبورد', href: PATH_DASHBOARD.root },
            { name: 'سرورها ', href: PATH_DASHBOARD.product.list },
            { name: 'ساخت سرور جدید' },
          ]}
        />
        <ProductNewEdit />
      </Container>
    </Page>
    </RoleBasedGuard>
  );
}
