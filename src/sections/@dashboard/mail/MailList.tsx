import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Divider, Box } from '@mui/material';
// components
import Scrollbar from '../../../components/Scrollbar';
import EmptyContent from '../../../components/EmptyContent';
//
import MailItem from './MailItem';
import MailToolbar from './MailToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'column',
});

// ----------------------------------------------------------------------

type MailListPropTypes = {
  onOpenSidebar: () => void;
};

export default function MailList({ onOpenSidebar }: MailListPropTypes) {
  const { query } = useRouter();
  //
  // const { mails } = useSelector((state) => state.mail);

  const [selectedMails, setSelectedMails] = useState([]);

  const [dense, setDense] = useState(false);

  // const isEmpty = mails.allIds.length < 1;

  // useEffect(() => {
  //   dispatch(getMails(query));
  // }, [dispatch, query]);

  // const handleSelectAllMails = () => {
  //   setSelectedMails(mails.allIds.map((mailId) => mailId));
  // };

  const handleToggleDense = () => {
    setDense((prev) => !prev);
  };

  const handleDeselectAllMails = () => {
    setSelectedMails([]);
  };

  const handleSelectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => {
      if (!prevSelectedMails.includes(mailId)) {
        return [...prevSelectedMails, mailId];
      }
      return prevSelectedMails;
    });
  };

  const handleDeselectOneMail = (mailId) => {
    setSelectedMails((prevSelectedMails) => prevSelectedMails.filter((id) => id !== mailId));
  };
  return null;
  // return (
  //   <RootStyle>
  //     <MailToolbar
  //       mails={mails.allIds.length}
  //       selectedMails={selectedMails.length}
  //       onSelectAll={handleSelectAllMails}
  //       onOpenSidebar={onOpenSidebar}
  //       onDeselectAll={handleDeselectAllMails}
  //       onToggleDense={handleToggleDense}
  //     />
  //
  //     <Divider />
  //
  //     {!isEmpty ? (
  //       <Scrollbar>
  //         <Box sx={{ minWidth: { md: 800 } }}>
  //           {mails.allIds.map((mailId) => (
  //             <MailItem
  //               key={mailId}
  //               isDense={dense}
  //               mail={mails.byId[mailId]}
  //               isSelected={selectedMails.includes(mailId)}
  //               onSelect={() => handleSelectOneMail(mailId)}
  //               onDeselect={() => handleDeselectOneMail(mailId)}
  //             />
  //           ))}
  //         </Box>
  //       </Scrollbar>
  //     ) : (
  //       <EmptyContent
  //         title="There is no conversation"
  //         img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_mail.svg"
  //         sx={{ flexGrow: 1, height: 'auto' }}
  //       />
  //     )}
  //   </RootStyle>
  // );
}
