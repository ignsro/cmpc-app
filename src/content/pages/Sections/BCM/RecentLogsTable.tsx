import { Login } from '@mui/icons-material';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Input,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { number } from 'prop-types';
import { ChangeEvent, useState } from "react"
import BulkActions from "src/content/applications/Transactions/BulkActions";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { BCMLog, BCMMachine } from "src/models/bcm"
import {utils, writeFile} from 'xlsx';


interface RecentBCMLogsTableProps {
  logs: BCMLog[]
}

interface Filters {
  machine?: BCMMachine;
}

const applyFilters = (logs: BCMLog[], filters: Filters): BCMLog[] => {
  return logs.filter((log) => {
    let matches = true;

    if (filters.machine && log.machineNumber !== filters.machine) {
      matches = false
    }

    return matches
  })
}

const exportToExcel = (data, fileName) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Sheet1");
  writeFile(wb, fileName + ".xlsx");
}

const applyPagination = (logs: BCMLog[], page: number, limit: number): BCMLog[] => {
  return logs.slice(page * limit, page * limit + limit)
}

const formatRecords = (arr): number => {
  return arr.reduce((acc, val) => {
    return acc + val;
  }, 0)
}

const RecentLogsTable: React.FC<RecentBCMLogsTableProps> = ({ logs }) => {
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const selectedBulkActions = selectedLogs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    machine: null
  }); 

  const handleMachineFilterChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      machine: value
    }))
  }

  const handleSelectedAllLogs = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedLogs(
      event.target.checked
        ? logs.map((l) => l.id)
        : []
    )
  }

  const handleSelecteOneLog = (event: ChangeEvent<HTMLInputElement>, logId: number): void => {
    if (!selectedLogs.includes(logId)) {
      setSelectedLogs((prevSelected) => [
        ...prevSelected,
        logId
      ]);
    } else {
      setSelectedLogs((prevSelected) => 
        prevSelected.filter((id) => id !== logId)
      );
    }
  }

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage)
  }

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value))
  }

  const handleExportClick = () => {
    exportToExcel(logs, "registros");
  }

  const formatTimeElapse = (seconds: number): number => Math.floor(seconds / 60);

  const filteredLogs = applyFilters(logs, filters);
  const paginatedLogs = applyPagination(filteredLogs, page, limit);

  const machinesOptions = Array.from(new Set(logs.map(l => l.machineNumber)));
  const selectedSomeLogs = selectedLogs.length > 0 && selectedLogs.length < logs.length
  const selectedAllLogs = selectedLogs.length === logs.length
  const theme = useTheme();


  return (
    <>
      <Card>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            title="Registros"
            action={
              <Box display="flex" alignItems="right" >
                <Button sx={{ margin: 1 }} variant="outlined" onClick={handleExportClick}>
                    Exportar a excel
                </Button>
                <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Maquina</InputLabel>
                  <Select
                    value={filters.machine || 'all'}
                    onChange={handleMachineFilterChange}
                    label="Maquina"
                    autoWidth
                  >
                    <MenuItem key='all' value='all'>
                      Todas
                    </MenuItem>
                    {machinesOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </Box>
              </Box>
            }
          >
          </CardHeader>
        )}
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding='checkbox'>
                  <Checkbox 
                    color='primary'
                    checked={selectedAllLogs}
                    indeterminate={selectedSomeLogs}
                    onChange={handleSelectedAllLogs}
                  />
                </TableCell>
                <TableCell>#</TableCell>
                <TableCell>Maquina</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Subcategoria</TableCell>
                <TableCell>Tiempo</TableCell>
                <TableCell>Tiempo total</TableCell>
                <TableCell align='right'>Accciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLogs.map((log) => {
                const isLogSelected = selectedLogs.includes(log.id);
                return (
                  <TableRow 
                    hover
                    key={log.id}
                    selected={isLogSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox 
                        color='primary'
                        checked={isLogSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => 
                          handleSelecteOneLog(event, log.id)
                        }
                        value={isLogSelected}
                      /> 
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {log.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {log.machineNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {log.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {log.subCategory}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {log.timeRecords.join(',')} Minutos
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {formatRecords(log.timeRecords)} Minutos
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                    <Tooltip title="Editar registro" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar registro" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
        <TablePagination
          component="div"
          count={filteredLogs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      </Card>
    </>
  )
}

export default RecentLogsTable