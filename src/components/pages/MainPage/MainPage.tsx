import { Grid, MenuItem, TextField } from '@mui/material';
import { StyledContainer } from '@/components/pages/MainPage/MainPage.style';
import { ResultsTable } from '@/components/pages/MainPage/ResultsTable/ResultsTable';
import { useState } from 'react';
import { PlaceType } from '@/interfaces/interfaces';

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

  return (
    <StyledContainer>
      <Grid container spacing={3} style={{ marginBottom: 20 }}>
        <Grid item md={6} sm={12}>
          <TextField
            id='outlined-basic'
            label='Пошук'
            variant='outlined'
            fullWidth
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
          />
        </Grid>
        <Grid item md={6} sm={12}>
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
      </Grid>
      <Grid container>
        <Grid item sm={12}>
          <ResultsTable {...{ searchType, searchString }} />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
