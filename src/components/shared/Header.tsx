import React, { FC } from 'react';
import { Toolbar } from '@mui/material';
import {
  StyledAppBar,
  StyledHeaderLabel,
} from '@/components/shared/Header.style';
import Image from 'next/image';

export const Header: FC = () => {
  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Image
          src={'/trident.png'}
          alt={'trident'}
          width={45}
          height={54}
          style={{ padding: 5, marginRight: 20 }}
        />
        <StyledHeaderLabel
          variant='h5'
          style={{ flexGrow: 1 }}
          fontWeight={700}
        >
          Lost Weekend Search v2.0
        </StyledHeaderLabel>
      </Toolbar>
    </StyledAppBar>
  );
};
