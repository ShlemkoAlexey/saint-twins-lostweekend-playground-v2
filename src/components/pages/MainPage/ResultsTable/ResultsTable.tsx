import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PERSONS } from '@/const/addreses/persons';
import { Button } from '@mui/material';
import { PLACES } from '@/const/addreses/places';
import { ResultsTableType } from '@/components/pages/MainPage/ResultsTable/ResultsTable.type';
import { Place, PlaceType } from '@/interfaces/interfaces';
import { StyledTableContainer } from '@/components/pages/MainPage/ResultsTable/ResultTable.style';

export const ResultsTable = (props: ResultsTableType) => {
  const { searchString, searchType } = props;
  const addresses: Array<Place> = [
    ...(PERSONS as Array<Place>),
    ...(PLACES as Array<Place>),
  ];

  console.log(searchString);
  console.log(searchType);

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
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Назва</TableCell>
                <TableCell align='right'>Адреса</TableCell>
                <TableCell align='right'>Тип</TableCell>
                <TableCell align='right'>Копіювати</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAddresses.map((row, index) => (
                <TableRow
                  key={row.title + index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.title}
                  </TableCell>
                  <TableCell align='right'>{row.address}</TableCell>
                  <TableCell align='right'>
                    {parsePlaceType(row.type)}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='outlined'
                      onClick={() => {
                        copyToClipboard(`${row.title} ${row.address}`);
                      }}
                    >
                      Копіювати
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
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
