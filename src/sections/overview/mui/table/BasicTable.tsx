// @mui
import { Table, TableRow, TableBody, TableCell, TableContainer } from '@mui/material';
// components
import Scrollbar from '@components/Scrollbar';
import { TableHeadCustom } from '@components/table';

// ----------------------------------------------------------------------

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_DATA = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const TABLE_HEAD = [
  { id: 'dessert', label: 'Dessert (100g serving)' },
  { id: 'calories', label: 'Calories', align: 'right' },
  { id: 'fat', label: 'Fat (g)', align: 'right' },
  { id: 'carbs', label: 'Carbs (g)', align: 'right' },
  { id: 'protein', label: 'Protein (g)', align: 'right' },
];

// ----------------------------------------------------------------------

export default function BasicTable() {
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800, mt: 3 }}>
        <Table>
          <TableHeadCustom headLabel={TABLE_HEAD} />

          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
