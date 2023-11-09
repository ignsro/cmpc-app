import { CategoryTwoTone, Title } from "@mui/icons-material"
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, MenuItem, TextField } from "@mui/material"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import Cronometro from "./timer"

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
        label: 'Atasco'
      },
      {
        value: '6',
        label: 'Cambio Rodela'
      },
      {
        value: '7',
        label: 'Cambio Rollo'
      }
    ]
  }
]

export const Log: React.FC = () => {
  const [category, setCategory] = useState()
  const [subCategory, setSubCategory] = useState()

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
    setSubCategory(undefined)
  }

  const handleSubcategoryChange = (event) => {
    setSubCategory(event.target.value)
  }

  const subCategories = categories.find((cat) => cat.value === category)?.sub || [];

  return (
    <>
      <Helmet>
        <title>
          Nuevo registo
        </title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Nuevo Registro"
          subHeading="Something"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Cronometro" />
              <Divider />
              <CardContent>
                <Cronometro />
              </CardContent>       
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Formulario" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
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
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}