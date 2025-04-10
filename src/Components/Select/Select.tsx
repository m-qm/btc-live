import { ReactElement } from 'react';
import {
  Box, LinearProgress, MenuItem, Select as MuiSelect,
} from '@mui/material';

interface SelectInterface {
  selectedCrypto: string;
  setSelectedCrypto: (value: string) => void;
  isLoading: boolean;
  options: { [key: string]: string };
}

export function Select({
  selectedCrypto,
  setSelectedCrypto,
  isLoading,
  options,
}: SelectInterface): ReactElement {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'end', marginTop: '10px' }}>
      <MuiSelect
        value={selectedCrypto}
        onChange={(e) => setSelectedCrypto(e.target.value as string)}
        disabled={isLoading}
        variant="outlined"
        color="info"
        sx={{ backgroundColor: 'black', color: 'white', borderColor: 'black' }}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {key}
          </MenuItem>
        ))}
      </MuiSelect>
      {isLoading && (
        <Box mt={1}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
}
