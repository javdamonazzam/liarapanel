import { Container, Alert, AlertTitle } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type propTypes = {
  accessibleRoles?: string; // Example ['admin', 'leader']
  children?: ReactNode;
};

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'ADMIN';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: propTypes) {
  const currentRole = useCurrentRole();
console.log("Role gurd");

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          شما اجازه دسترسی به این صفحه را ندارید
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
