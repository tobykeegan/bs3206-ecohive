'use client';
import { Card, FormControl, FormLabel, Switch, Typography } from '@mui/joy';
import React from 'react';

/**
 * Accessibility settings card
 * @author Alec Painter
 */
export default function AccessibilityCard() {
  const [contrastChecked, setContrastChecked] = React.useState(false);

  function contrastChanged(event) {
    setContrastChecked(event.target.checked);
  }

  return (
    <Card className="left-column-card">
      <h1>Accessibility</h1>
      <FormControl
        orientation="horizontal"
        sx={{ width: '90%', justifyContent: 'space-between' }}
      >
        <FormLabel>High Contrast Mode</FormLabel>
        <Switch
          size="lg"
          checked={contrastChecked}
          onChange={contrastChanged}
          color={contrastChecked ? 'success' : 'neutral'}
          variant={contrastChecked ? 'solid' : 'outlined'}
          endDecorator={contrastChecked ? 'On' : 'Off'}
          slotProps={{
            endDecorator: {
              sx: {
                minWidth: 24,
              },
            },
          }}
        />
      </FormControl>
    </Card>
  );
}
