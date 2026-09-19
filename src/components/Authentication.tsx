import { Container } from '@mui/material';

import { appColors } from '~/shared/colors';

import { AuthDialog } from './AuthDialog';
import { KeyPage } from './KeyPage';

export const Authentication = () => {
  return (
    <Container
      sx={{
        height: '90vh',
        backgroundColor: appColors.green,
      }}
    >
      <KeyPage />

      <AuthDialog />
    </Container>
  );
};
