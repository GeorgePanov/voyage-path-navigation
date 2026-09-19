import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';

import { useAuth } from '~/app/context';

import { appColors } from '~/shared/colors';

export const KeyPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant='text' width={300} height={50} />
        <Skeleton variant='rounded' width='100%' height={200} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 3,
        gap: '2rem',
        color: appColors.beige,
      }}
    >
      <Typography
        sx={{ color: appColors.orange, fontWeight: 'bold' }}
        variant='h3'
      >
        VPN KEY
      </Typography>

      <Stack sx={{ gap: '0.5rem' }}>
        <Typography variant='body1'>
          Нужно вставить в приложение AmneziaVPN
        </Typography>

        <Typography variant='caption'>Ключ обновлён: 19.09.2026</Typography>
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
          variant='contained'
          sx={{ backgroundColor: appColors.orange, color: appColors.beige }}
        >
          <ContentCopyIcon />
        </Button>

        <Typography variant='body2'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi libero
          corrupti quis veritatis tempora ad inventore accusantium recusandae
          dicta aliquam debitis quibusdam officiis fugiat exercitationem maiores
          natus voluptatem quae, est maxime? Magni, deserunt eos debitis officia
          harum vel possimus nostrum facilis consectetur cum fugit dolores
          distinctio voluptatem optio aut quia eveniet, voluptates iste expedita
          beatae atque saepe reprehenderit? Incidunt ipsum ducimus quasi
          consequuntur repellat minima! Eaque numquam alias accusamus eveniet
          laborum dolorum officia praesentium, dignissimos incidunt recusandae
          aperiam nihil quaerat sunt quasi illum perferendis dolor deleniti.
          Dolore adipisci illo in minima, est quae animi. Officia cumque magni
          quis sapiente quidem?
        </Typography>
      </Stack>
    </Box>
  );
};
