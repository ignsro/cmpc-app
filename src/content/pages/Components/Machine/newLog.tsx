import { Box, Card, MenuItem, TextField, Dialog, DialogTitle, Grid, CardHeader, Divider, Button } from "@mui/material"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Cronometro from "./timer";
import { BCMLog, selectedMachine } from "src/models/bcm";

const LOCAL_VAR = {
  CLIENT_NAME: 'clientName',
  WORK_SHIFT: 'workShift',
  OPERATOR: 'operatorName',
  ORDER_NUMBER: 'orderNumber',
}

export const machines = [
  {
    value: 1,
    label: "BCM 1"
  },
  {
    value: 2,
    label: "BCM 2"
  }
]

const workShifts = [
  {
    value: 1,
    label: "Turno Noche"
  },
  {
    value: 2,
    label: "Turno Dia"
  },
  {
    value: 3,
    label: "Turno Tarde"
  }
]

const categories = [
  {
    value: '1',
    label: 'Feriados y sin carga',
    sub: [
      {
        value: '1',
        label: 'Sin Carga'
      },
      {
        value: '2',
        label: 'Feriados'
      },
      {
        value: '3',
        label: 'UP-Grade'
      },
      {
        value: '4',
        label: 'Accidente ambiental o seguridad'
      }
    ]
  },
  {
    value: '2',
    label: 'Falla o parada operacional',
    sub: [
      {
        value: '5',
        label: 'Atasco',
        sub: [
          {
            value: '1',
            label: 'Modulo A'
          },
          {
            value: '2',
            label: 'Modulo B'
          },
          {
            value: '3',
            label: 'Mesa formadora'
          },
          {
            value: '4',
            label: 'Bag Machine'
          },
          {
            value: '5',
            label: 'Inspector'
          }
        ]
      },
      {
        value: '6',
        label: 'Cambio Rodela'
      },
      {
        value: '7',
        label: 'Cambio Rollo'
      },
      {
        value: '8',
        label: 'Corte Cordón'
      },
      {
        value: '9',
        label: 'Corte Manilla'
      },
      {
        value: '10',
        label: 'Desplazamiento de Manilla'
      },
      {
        value: '11',
        label: 'Regulación Modulo A'
      },
      {
        value: '12',
        label: 'Regulación Modulo B'
      },
      {
        value: '13',
        label: 'Regulación Bag Machine',
        sub: [
          {
            label: 'Lenguetas',
            value: 6
          },
          {
            label: 'Desdos del tambor',
            value: 7
          },
          {
            label: 'Desdos de apertura',
            value: 8
          },
          {
            label: 'Cuchillas plegadoras',
            value: 9
          },
          {
            label: 'Cambios de resorte ',
            value: 10
          },
          {
            label: 'Otros',
            value: 11
          },
        ],
      },
      {
        value: '14',
        label: 'Regulación Otros'
      }
    ]
  },
  {
    value: '3',
    label: 'Falla servicios',
    sub: [
      {
        value: '15',
        label: 'Interno'
      },
      {
        value: '16',
        label: 'Externo'
      }
    ]
  },
  {
    value: '4',
    label: 'Cambio formato',
    sub: [
      {
        value: '17',
        label: 'Setup'
      },
      {
        value: '18',
        label: 'Cambio formato'
      }
    ]
  },
  {
    value: '5',
    label: 'Aseo e inspeccion',
    sub: [
      {
        value: '19',
        label: 'Limpieza'
      },
      {
        value: '20',
        label: 'Falla del sistema de adhesivo'
      },
      {
        value: '21',
        label: 'Lubricacíon'
      }
    ]
  },
  {
    value: '6',
    label: 'Pruebas',
    sub: [
      {
        value: '22',
        label: 'Pruebas'
      }
    ]
  },
  {
    value: '7',
    label: 'Esperas',
    sub: [
      {
        value: '24',
        label: 'Calidad de Impresión del rollo'
      },
      {
        value: '25',
        label: 'Espera de insumos'
      },
      {
        value: '26',
        label: 'Defecto de material'
      },
      {
        value: '27',
        label: 'Esperas Insumos Mtto'
      }
    ]
  },
  {
    value: '8',
    label: 'Perdidas organizacionales',
    sub: [
      {
        value: '28',
        label: 'Cambios en el programa'
      },
      {
        value: '29',
        label: 'Colación'
      },
      {
        value: '30',
        label: 'Capacitación'
      },
      {
        value: '31',
        label: 'Reunión'
      },
      {
        value: '32',
        label: 'Vestuario'
      },
      {
        value: '33',
        label: 'Ausencia o Dotación'
      },
      {
        value: '34',
        label: 'Cambio de turno'
      },
    ]
  },
  {
    value: '9',
    label: 'Perdida velocidad',
    sub: [
      {
        value: '35',
        label: 'Perdida de velocidad'
      }
    ]
  },
  {
    value: '10',
    label: 'Pequeñas paradas',
    sub: [
      {
        value: '36',
        label: 'Pequeñas paradas'
      }
    ]
  },
  {
    value: '11',
    label: 'Mantención planeada',
    sub: [
      {
        value: '37',
        label: 'Preventiva'
      },
      {
        value: '38',
        label: 'Correctiva'
      }
    ]
  },
  {
    value: '12',
    label: 'Falla Maquina > 10 min',
    sub: [
      {
        value: '39',
        label: 'Falla Eléctrica'
      },
      {
        value: '40',
        label: 'Falla Mecánica'
      }
    ]
  },
]

interface props {
  addLog: any
}

const NewLog: React.FC<props> = ({addLog}) => {
  const [machine, setMachine] = useState('')
  const [workShift, setWorkShift] = useState('')
  const [client, setClient] = useState<string>('')
  const [category, setCategory] = useState('')
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [subCategory, setSubCategory] = useState('')
  const [subZone, setSubZone] = useState('')
  const [operator, setOperator] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const handleMachineChange = (event) => {
    setMachine(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setSubCategory('')
  }

  const handleSubcategoryChange = (event) => {
    setSubCategory(event.target.value);
    setSubZone('')
  }

  const handleSubZoneChange = (event) => {
    setSubZone(event.target.value);
  }

  const handleWorkShiftChange = (event) => {
    setWorkShift(event.target.value);
    localStorage.setItem(LOCAL_VAR.WORK_SHIFT, event.target.value)
  }

  const handleOperatorChange = (event) => {
    setOperator(event.target.value)
    localStorage.setItem(LOCAL_VAR.OPERATOR, event.target.value)
  }

  const handleClientChange = (event) => {
    const newValue = event.target.value;
    setClient(newValue);
    localStorage.setItem(LOCAL_VAR.CLIENT_NAME, newValue);
  }

  const handleOrderNumberChange = (event) => {
    const newValue = event.target.value;
    setOrderNumber(newValue);
    localStorage.setItem(LOCAL_VAR.ORDER_NUMBER, newValue);
  }

  const handleTimeElapsedChange = (event) => {
    const time = parseInt(event.target.value)
    setTimeElapsed(time);
  }

  const onSubmit = () => {
    const newLog: BCMLog = {
      category: categories.find(x => x.value == category).label,
      subCategory: subCategories.find(x => x.value == subCategory).label,
      timeElapsed: timeElapsed,
      user: operator,
      machineNumber: selectedMachine(machine)
    }
    addLog(newLog)
  }

  useEffect(() => {
    const clientName = localStorage.getItem(LOCAL_VAR.CLIENT_NAME)
    if (clientName) {
      setClient(clientName);
    }

    const workShift = localStorage.getItem(LOCAL_VAR.WORK_SHIFT)
    if (workShift) {
      setWorkShift(workShift);
    }

    const operatorName = localStorage.getItem(LOCAL_VAR.OPERATOR)
    if (operatorName) {
      setOperator(operatorName);
    }

    const orderNumber = localStorage.getItem(LOCAL_VAR.ORDER_NUMBER)
    if (orderNumber) {
      setOrderNumber(orderNumber);
    }
  }, []);


  const subCategories = categories.find((cat) => cat.value === category)?.sub || [];
  const subZones = subCategories.find((subCat) => subCat.value === subCategory && subCat.sub)?.sub || [];
  
  return (
    <Card>
      <CardHeader title="Nuevo Registro" />
      <Divider />
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '30ch' }
          }}
          noValidate
          autoComplete="off"
        >
            <div>
              <TextField 
                  id="unproductive-select-machine"
                  select
                  label="Maquina"
                  value={machine}
                  onChange={handleMachineChange}
                >
                  {machines.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField 
                  id="unproductive-select-work-shift"
                  select
                  label="Turno"
                  value={workShift}
                  onChange={handleWorkShiftChange}
                >
                  {workShifts.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                  ))}
              </TextField>
              <TextField
                  required
                  id="unproductive-select-client"
                  label="Cliente"
                  onChange={handleClientChange}
                  value={client}
                >
              </TextField>
              <TextField
                  required
                  id="unproductive-select-orderNumber"
                  label="Order de fabricación"
                  onChange={handleOrderNumberChange}
                  value={orderNumber}
                >
              </TextField>
            </div>
            <div>
              <TextField 
                id="unproductive-select-main"
                select
                label="Categoria"
                value={category}
                onChange={handleCategoryChange}
              >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField 
                disabled={subCategories.length === 0}
                id="unproductive-select-sub"
                select
                label="SubCategoria"
                value={subCategory}
                onChange={handleSubcategoryChange}
              >
                {subCategories.map((subOption) => (
                    <MenuItem key={subOption.value} value={subOption.value}>
                      {subOption.label}
                    </MenuItem>
                ))}
              </TextField>
              <TextField 
                disabled={subZones.length === 0}
                id="unproductive-select-subZone"
                select
                label="Zona de falla"
                value={subZone}
                onChange={handleSubZoneChange}
              >
                {subZones.map((subOption) => (
                    <MenuItem key={subOption.value} value={subOption.value}>
                      {subOption.label}
                    </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                required
                id="unproductive-select-timeElapsed"
                label="Tiempo (Minutos)"
                type="number"
                onChange={handleTimeElapsedChange}
                value={timeElapsed}
              >
              </TextField>
              <TextField
                required
                id="unproductive-select-timeElapsed"
                label="Operario"
                onChange={handleOperatorChange}
                value={operator}
              >
              </TextField>
            </div>
          </Box>
          <Box 
            component="form"
            sx={{
              '& .MuiTextField-root': { m:1, width: '33ch'}
            }}
            noValidate
            autoComplete="off"
            >
            <div>

          </div>

          </Box>
        </Grid>
        <Grid item md={12} xs={12}>
            <Box
              component="form"
              display="flex" justifyContent="center"
              noValidate
            >
              <Button sx={{ margin: 1 }} variant="contained" onClick={onSubmit}>
                  Guardar registro
              </Button>
            </Box>
        </Grid>
      </Grid>
    </Card>
  )
} 

export default NewLog