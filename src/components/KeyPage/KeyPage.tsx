import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useAuth } from '~/app/context';

import { appColors } from '~/shared/colors';
import { keyUpdateDate } from '~/shared/users';

import { KeyPageSkeleton } from './KeyPage.skeleton';

export const KeyPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        user?.key ?? 'Не удалось скопировать ключ',
      );
      setIsCopied(true);
    } catch (error) {
      console.error('Не удалось скопировать ключ:', error);
    }
  };

  if (!isAuthenticated) {
    return <KeyPageSkeleton />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 3,
        gap: '2rem',
        color: appColors.sage,
      }}
    >
      <Divider>
        <Typography
          sx={{ color: appColors.maroon, fontWeight: 'bold' }}
          variant='h3'
        >
          VPN KEY
        </Typography>
      </Divider>

      <Stack>
        <Typography variant='body1'>
          Вставить в приложение AmneziaVPN
        </Typography>

        <Typography variant='caption'>
          Ключ обновлён: <b>{keyUpdateDate}</b>
        </Typography>
      </Stack>

      <Stack
        sx={{
          gap: '1rem',
          padding: '1rem',
          borderRadius: '1rem',
          backgroundColor: appColors.sage,
        }}
      >
        <Button
          onClick={handleCopy}
          variant='contained'
          sx={{
            backgroundColor: appColors.terracotta,
            color: appColors.beige,
          }}
        >
          <ContentCopyIcon />
        </Button>

        <Typography
          variant='body2'
          sx={{ color: appColors.beige, overflowWrap: 'anywhere' }}
        >
          {user?.key ?? 'Произошла ошибка при получении ключа'}
        </Typography>
      </Stack>

      <Snackbar
        open={isCopied}
        autoHideDuration={5000}
        message='Ключ скопирован'
        onClose={() => setIsCopied(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        slotProps={{
          content: {
            sx: {
              backgroundColor: appColors.maroon,
              color: appColors.beige,
            },
          },
        }}
      />
    </Box>
  );
};
