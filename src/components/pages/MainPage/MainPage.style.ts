import { Container, styled } from '@mui/system';
import { Grid } from '@mui/material';

export const StyledContainer = styled(Container)`
  background-color: white;

  ${props => props.theme.breakpoints.down('sm')} {
    padding: 8px;
  }
`;

export const StyledInputGrid = styled(Grid)`
  margin-top: 0px;
  margin-bottom: 8px;
`;
