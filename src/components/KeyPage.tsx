import { Box, Skeleton, Typography } from '@mui/material';

import { useAuth } from '~/app/context';

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
    <Box sx={{ p: 3 }}>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Typography>
    </Box>
  );
};
