import { Button, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React from 'react';

type Props = {
  description: string;
};

export const FavoriteBox: React.FC<Props> = ({ description }) => {
  return (
    <Button color="gray" variant="contained">
      <div className="justify-start flex gap-[10px] w-60 h-10 items-center">
        <StarIcon color="primary" fontSize="medium" />
        <Typography className="normal-case font-light text-base">{description}</Typography>
      </div>
    </Button>
  );
};
