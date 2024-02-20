import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import * as React from 'react';

export default function TagList({ ...props }) {
  const tagList = props.tags.map((tag) => (
    <Chip color={tag.colour}>#tag{tag.name}</Chip>
  ));

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>{tagList}</Box>
  );
}
