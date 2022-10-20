import React, { ReactElement, useCallback } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { InfoLabel } from '../../InfoLabel/InfoLabel';

interface InfoBoxHeaderInterface {
    timestamp: string;
    rank: string | undefined;
    updateAsset(): void;
    setDelay(state: boolean): void;
    delay: boolean
}

export function InfoBoxHeader({
  timestamp, rank, updateAsset, setDelay, delay,
}: InfoBoxHeaderInterface): ReactElement {
  const handleUpdateAsset = useCallback((): void => {
    updateAsset();
    setDelay(true);
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, [setDelay, updateAsset]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <InfoLabel labelName="Rank" value={rank} />
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Box>
          <Button
            disabled={delay}
            endIcon={<RefreshIcon />}
            variant="contained"
            type="button"
            size="small"
            onClick={handleUpdateAsset}
          >
            Update information
          </Button>
        </Box>
        <Box mb={1} />
        <InfoLabel value={timestamp} labelName="Last updated" />
      </Box>
    </Box>
  );
}
