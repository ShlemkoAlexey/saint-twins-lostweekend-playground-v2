import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PERSONS } from '@/const/addreses/persons';
import { Button, IconButton, Snackbar, Tooltip } from '@mui/material';
import { PLACES } from '@/const/addreses/places';
import { ResultsTableType } from '@/components/pages/MainPage/ResultsTable/ResultsTable.type';
import { Place, PlaceType } from '@/interfaces/interfaces';
import {
  StyledTableContainer,
  StyledTableHeadCell,
  StyledTableRow,
  StyledTableRowCell,
} from '@/components/pages/MainPage/ResultsTable/ResultTable.style';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTheme } from '@mui/system';
import { SyntheticEvent, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export const ResultsTable = (props: ResultsTableType) => {
  const { searchString, searchType } = props;
  const [showSnack, setShowSnack] = useState<boolean>(false);

  const handleCopyClick = (text: string) => {
    copyToClipboard(text);
    setShowSnack(true);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnack(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <CloseIcon fontSize='small' />
      </IconButton>
    </>
  );

  const addresses: Array<Place> = [
    ...(PERSONS as Array<Place>),
    ...(PLACES as Array<Place>),
  ];

  const muiTheme = useTheme();

  let filteredAddresses: Array<Place>;

  if (searchString && searchString?.length > 1) {
    filteredAddresses = filterAddressBySubstring(addresses, searchString);
    if (searchType !== 'all') {
      filteredAddresses = filteredAddresses.filter(
        address => address.type === searchType
      );
    }
  } else {
    filteredAddresses = [];
  }

  return (
    <>
      {filteredAddresses?.length > 0 && (
        <StyledTableContainer component={Paper}>
          <Table aria-label='results table' size='small'>
            <TableHead>
              <TableRow>
                <StyledTableHeadCell>Назва</StyledTableHeadCell>
                <StyledTableHeadCell align='right'>Адреса</StyledTableHeadCell>
                <StyledTableHeadCell align='right' theme={muiTheme}>
                  Тип
                </StyledTableHeadCell>
                <StyledTableHeadCell align='right'>
                  Копіювати
                </StyledTableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAddresses.map((row, index) => (
                <StyledTableRow
                  key={row.title + index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableRowCell component='th' scope='row'>
                    {row.title}
                  </StyledTableRowCell>
                  <StyledTableRowCell align='right'>
                    {row.address}
                  </StyledTableRowCell>
                  <StyledTableRowCell align='right' theme={muiTheme}>
                    {parsePlaceType(row.type)}
                  </StyledTableRowCell>
                  <StyledTableRowCell align='right'>
                    <Button
                      variant='outlined'
                      onClick={() =>
                        handleCopyClick(`${row.title} ${row.address}`)
                      }
                    >
                      <Tooltip title='Скопіювати' placement='top'>
                        <ContentCopyIcon />
                      </Tooltip>
                    </Button>
                  </StyledTableRowCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      <Snackbar
        open={showSnack}
        autoHideDuration={5000}
        onClose={handleClose}
        message='Назву скопійовано'
        action={action}
      />
    </>
  );
};

const filterAddressBySubstring = (
  list: Array<Place>,
  substring: string
): Array<Place> => {
  return list.filter(item => {
    return item.title
      .toLowerCase()
      .replace(/\s/g, '')
      .includes(substring.toLowerCase().replace(/\s/g, ''));
  });
};

const copyToClipboard = (text: string) => {
  // @ts-ignore
  if (window?.clipboardData && window?.clipboardData?.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    // @ts-ignore
    return window.clipboardData.setData('Text', text);
  } else if (
    document.queryCommandSupported &&
    document.queryCommandSupported('copy')
  ) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand('copy'); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return prompt('Copy to clipboard: Ctrl+C, Enter', text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
};

export const parsePlaceType = (placeType: PlaceType) => {
  switch (placeType) {
    case 'place':
      return 'Заклад';
    case 'person':
      return 'Людина';
    case 'all':
      return '';
  }
};
