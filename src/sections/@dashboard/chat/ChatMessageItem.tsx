import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  height: 200,
  minWidth: 296,
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

// ----------------------------------------------------------------------
type propTypes = {
  message: any;
  conversation: any;
  onOpenLightbox?: (message: any) => void;
};

export default function ChatMessageItem({ message, conversation, onOpenLightbox }: propTypes) {
  const sender = conversation.participants.find((participant) => participant.id === message.senderId);
  const senderDetails =
    message.senderId === '8864c717-587d-472a-929a-8e5f298024da-0'
      ? { type: 'me' }
      : { avatar: sender?.avatar, name: sender?.name };

  const isMe = senderDetails.type === 'me';
  const isImage = message.contentType === 'image';
  const firstName = senderDetails.name && senderDetails.name.split(' ')[0];

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
      >
        {senderDetails.type !== 'me' && (
          <Avatar alt={senderDetails.name} src={senderDetails.avatar} sx={{ width: 32, height: 32 }} />
        )}

        <Box sx={{ ml: 2 }}>
          <InfoStyle noWrap variant="caption" sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}>
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && {
                color: 'grey.800',
                bgcolor: 'primary.lighter',
              }),
            }}
          >
            {isImage ? (
              <MessageImgStyle alt="attachment" src={message.body} onClick={() => onOpenLightbox(message.body)} />
            ) : (
              <Typography variant="body2">{message.body}</Typography>
            )}
          </ContentStyle>
        </Box>
      </Box>
    </RootStyle>
  );
}
