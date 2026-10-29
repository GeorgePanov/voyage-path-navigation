import {
  Dialog,
  Stack,
  Typography,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { forwardRef, useState, type FC } from 'react';
import { IMaskInput } from 'react-imask';

import { useAuth } from '~/app/context';

import { appColors } from '~/shared/colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DateMaskInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      inputRef={ref}
      mask='00.00.0000'
      inputMode='numeric'
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
    />
  );
});

export const AuthDialog: FC = () => {
  const { isAuthenticated, handleEnterPassword } = useAuth();

  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const [day, month, year] = password.split('.');
    const formattedPassword = `${year}-${month}-${day}`;

    const success = handleEnterPassword(formattedPassword);

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
          placeholder='ДД.ММ.ГГГГ'
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

          slotProps={{
            input: {
              inputComponent: DateMaskInput,
            },
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
