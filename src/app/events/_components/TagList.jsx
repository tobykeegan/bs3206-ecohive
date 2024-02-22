import * as React from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

export default function TagList({ ...props }) {
  const tagList = props.tags.map((tag) => 
    {
      <Badge pill key={tag.name} bg={tag.colour}>
      #{tag.name}
      </Badge>
    }
  );
  return (
    <Stack direction="horizontal" gap={2}>
      {tagList}
    </Stack>
  );
}
