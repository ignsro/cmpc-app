import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Box,
  TextField
} from '@mui/material';
import React, { FC } from "react";

interface Props {
  machines: Machine[]
}

interface Machine {
  ID: number
  Name: string
  Model: string
}

export const Machines: Machine[]  = [
 {
  ID: 1,
  Name: "BCM1",
  Model: "BCM"
 },
 {
  ID: 2,
  Name: "BCM2",
  Model: "BCM"
 },
 {
  ID: 3,
  Name: "BCM3",
  Model: "BCM"
 } 
]

export const BCM: React.FC<Props> = ({ machines }) => {
  return (
    <>
      <Helmet>
        <title>BMC'S</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="BMC'S"
          subHeading="Control de BCM'S"
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid>
          
        </Grid>
      </Container>
    </>
  )
}

// function BCM<Props>({ machines }): React.FC<Props> {
//   return (
//     <>
//       <Helmet>
//         <title>BMC'S</title>
//       </Helmet>
//       <PageTitleWrapper>
//         <PageTitle
//           heading="BMC'S"
//           subHeading="Control de BCM'S"
//         />
//       </PageTitleWrapper>
//       <Container maxWidth="lg">
//         <Grid
//           container
//           direction="row"
//           justifyContent="center"
//           alignItems="stretch"
//           spacing={3}
//         >
//           {/* Listar las maquinas BCM */}
//           <Grid item xs={6}>
//             <Card>
//               <CardHeader>
//                 <Box
//                   component="form"
//                   sx={{
//                     '& .MuiTextField-root': { m: 1, width: '25ch'}
//                   }}
//                   noValidate //TODO Revisar
//                   autoComplete="off" //TODO Revisar en docs de material
//                 >
//                   <div>
//                   </div>
//                 </Box>
//               </CardHeader>
//             </Card>
//           </Grid>
//           <Grid item xs={6}>
//             <Card>
//               <CardHeader>
//                 <Box
//                   component="form"
//                   sx={{
//                     '& .MuiTextField-root': { m: 1, width: '25ch'}
//                   }}
//                   noValidate //TODO Revisar
//                   autoComplete="off" //TODO Revisar en docs de material
//                 >
//                   <div>
//                   </div>
//                 </Box>
//               </CardHeader>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   )
// }