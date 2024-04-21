'use client';
import * as React from 'react';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import Typography from '@mui/joy/Typography';

/**
 * A modal to be displayed if the BadgeEvaluator has determined
 * the user has achieved new badges based on their activity on EcoHive.
 * @author Jade Carino
 */
export default function NewBadges({ newBadges }) {
  const [open, setOpen] = React.useState(
    newBadges != undefined && newBadges.length > 0,
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          window.location.reload();
        }}
        variant="plain"
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ModalDialog>
          <ModalClose />
          <Typography level="title-md">Congratulations!</Typography>
          <Typography level="body-md">You've earned new badges!</Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            {newBadges}
          </div>
        </ModalDialog>
      </Modal>
    </div>
  );
}
