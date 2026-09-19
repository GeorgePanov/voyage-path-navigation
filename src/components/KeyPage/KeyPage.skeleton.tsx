import type { FC } from 'react';

import { Box, Skeleton, Stack } from '@mui/material';

export const KeyPageSkeleton: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 3,
        gap: '2rem',
      }}
    >
      <Skeleton variant='rounded' width='100%' height={60} />

      <Stack sx={{ gap: '0.3rem' }}>
        <Skeleton variant='rounded' width='100%' height={24} />
        <Skeleton variant='rounded' width='100%' height={19} />
      </Stack>

      <Skeleton variant='rounded' width='100%' height={400} />
    </Box>
  );
};
