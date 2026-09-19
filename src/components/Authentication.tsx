import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';

import { useAuth } from '~/app/context';

import { KeyPage } from './KeyPage';

export const Authentication = () => {
  const { isAuthenticated, handleEnterPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const success = handleEnterPassword(password);

    if (!success) {
      setError(true);
      return;
    }

    setError(false);
  };

  return (
    <>
      <KeyPage />

      <Dialog
        open={!isAuthenticated}
        onClose={() => {}}
        // disableEscapeKeyDown
        //
      >
        <DialogTitle>Авторизация</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type='password'
            label='Пароль'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError(false);
            }}
            error={error}
            helperText={error ? 'Неверный пароль' : ''}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSubmit} variant='contained'>
            Войти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
