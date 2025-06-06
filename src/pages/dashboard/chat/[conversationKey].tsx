import React, { useEffect } from 'react';
// @mui
import { Card, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { ChatSidebar, ChatWindow } from '../../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

Chat.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  //
  // useEffect(() => {
  //   dispatch(getConversations());
  //   dispatch(getContacts());
  // }, [dispatch]);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Chat"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Chat' }]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
