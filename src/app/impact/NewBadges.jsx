'use client';
import * as React from 'react';
import { Modal, ModalDialog, ModalClose } from '@mui/joy';
import Typography from '@mui/joy/Typography';

/**
 * A modal to be displayed if the BadgeEvaluator has determined
 * the user has achieved new badges based on their activity on EcoHive.
 * @returns {JSX.Element} A modal showing the user's newly achieved badges.
 * @author Jade Carino
 */
export default function NewBadges({ newBadges }) {
  const [open, setOpen] = React.useState(
    newBadges != undefined && newBadges.length > 0,
  );

  return (
    <div>
      <Modal
        id="New-Badges-Modal"
        data-testid="New-Badges-Modal"
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
          <ModalClose
            id="New-Badges-Modal-Close"
            data-testid="New-Badges-Modal-Close"
          />
          <Typography level="title-md">Congratulations!</Typography>
          <Typography level="body-md">You have earned new badges!</Typography>
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
