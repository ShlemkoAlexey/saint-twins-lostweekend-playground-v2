import { Grid, MenuItem, TextField } from '@mui/material';
import {
  StyledContainer,
  StyledInputGrid,
} from '@/components/pages/MainPage/MainPage.style';
import { ResultsTable } from '@/components/pages/MainPage/ResultsTable/ResultsTable';
import { useState } from 'react';
import { PlaceType } from '@/interfaces/interfaces';
import { useTheme } from '@mui/system';

const filters = [
  {
    value: 'all',
    label: 'Всe',
  },
  {
    value: 'person',
    label: 'Людина',
  },
  {
    value: 'place',
    label: 'Заклад',
  },
];

export const MainPage = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [searchType, setSearchType] = useState<PlaceType>('all');

  const muiTheme = useTheme();

  return (
    <StyledContainer theme={muiTheme}>
      <StyledInputGrid container spacing={3}>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            id='outlined-basic'
            label='Пошук'
            variant='outlined'
            fullWidth
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TextField
            id='outlined-select-currency'
            select
            label='Тип'
            defaultValue={'all'}
            onChange={e => setSearchType(e.target.value as PlaceType)}
            fullWidth
          >
            {filters.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </StyledInputGrid>
      <Grid container>
        <Grid item sm={12} xs={12}>
          <ResultsTable {...{ searchType, searchString }} />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
