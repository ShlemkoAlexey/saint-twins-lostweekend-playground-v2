import { styled } from '@mui/system';
import { TableContainer, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';

export const StyledTableContainer = styled(TableContainer)<{ component: any }>`
  max-height: 80vh;

  ${props => props.theme.breakpoints.down('sm')} {
    padding: 0;
  }
`;

export const StyledTableRow = styled(TableRow)`
  transition: 0.1s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const StyledTableHeadCell = styled(TableCell)`
  &:nth-of-type(3) {
    ${props => props.theme.breakpoints.down('sm')} {
      display: none;
    }
  }
`;
export const StyledTableRowCell = styled(TableCell)`
  &:nth-of-type(2) {
    ${props => props.theme.breakpoints.down('sm')} {
      display: none;
    }
  }
`;
