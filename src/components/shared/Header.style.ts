import { styled } from '@mui/system';
import { AppBar, Typography } from '@mui/material';

export const StyledHeaderLabel = styled(Typography)`
  color: black;
`;
export const StyledAppBar = styled(AppBar)`
  background: rgb(255, 226, 0);
  background: linear-gradient(
    151deg,
    rgba(255, 226, 0, 1) 0%,
    rgba(255, 226, 0, 1) 36%,
    rgba(0, 82, 255, 1) 66%,
    rgba(0, 82, 255, 1) 100%
  );
`;
