import {
  Dialog,
  Stack,
  Typography,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { useState, type FC } from 'react';

import { useAuth } from '~/app/context';

import { appColors } from '~/shared/colors';

export const AuthDialog: FC = () => {
  const { isAuthenticated, handleEnterPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const success = handleEnterPassword(password);

    if (!success) {
      setError(true);
      return;
    }
  };

  return (
    <Dialog open={!isAuthenticated} onClose={() => {}}>
      <Stack
        sx={{
          padding: '2rem',
          width: '15rem',
          gap: '1rem',
          backgroundColor: appColors.beige,
        }}
      >
        <Typography variant='h5'>Авторизация</Typography>
        <Typography variant='body1'>Введите свой день рождения</Typography>

        <TextField
          fullWidth
          type='date'
          variant='outlined'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError(false);
          }}

          error={error}
          helperText={error ? 'Неверно' : ''}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit();
            }
          }}
        />

        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant='contained'
            sx={{ backgroundColor: appColors.sage }}
          >
            Войти
          </Button>
        </DialogActions>

        <Stack sx={{ alignItems: 'flex-end' }}>
          <Typography variant='body2'>by George Panov</Typography>
        </Stack>
      </Stack>
    </Dialog>
  );
};
