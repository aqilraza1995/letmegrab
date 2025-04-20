import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

const CustomTable = ({ columns, rows, loading = false }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((item, index) => (
              <TableCell sx={{fontWeight:800}} key={index}>{item?.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading ?
              <TableRow>
                <TableCell align="center" colSpan={columns?.length}><CircularProgress /></TableCell>
              </TableRow>
              :
              rows?.length ?
                rows?.map((item, index) => (
                  <TableRow key={index}>
                    {
                      columns?.map((cell, i) => (
                        <TableCell key={i}>{cell?.render ? cell.render(item, index) : item[cell?.id]}</TableCell>
                      ))
                    }
                  </TableRow>
                ))
                :
                <TableRow>
                  <TableCell align="center" colSpan={columns?.length}>No Record</TableCell>
                </TableRow>

          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CustomTable