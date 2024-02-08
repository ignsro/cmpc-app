import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "../Crypto/PageHeader";
import { Container, Grid, Card } from "@mui/material";
import PageTitle from "src/components/PageTitle"
import Footer from 'src/components/Footer';
import React from "react";
import DetentionsTable from "./DetentionsTable";
import { Log } from "src/models/log"
import { Machine } from "src/models/machine"
import LogService from "src/services/log.service."
import MachineService from "src/services/machine.sevice"
import { useEffect, useState } from "react"

const DashboardDetentions: React.FC = () => {
  
  const [logs, setLogs] = useState<Log[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);

  useEffect(() => {
    loadLogs();
    loadMachines();
  }, []);

  const loadLogs = async () => {
    try {
      const logs = await LogService.getAll();
      setLogs(logs);
    } catch (error) {
      console.error('Error al cargar los logs', error)
    }
  }

  const loadMachines = async () => {
    try {
      const machines = await MachineService.getAll();
      setMachines(machines)
    } catch (error) {
      console.error('Error al cargar las maquinas', error)
    }
  }


  return (
    <>
    <Helmet>
      Dashboard Detenciones
    </Helmet>
    <PageTitleWrapper>
      <PageTitle 
        heading="BCM's"
        subHeading="Control de BCM's"
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
            <DetentionsTable logs={logs} machines={machines} />
          </Card>
        </Grid>
      </Grid>
    </Container>
    <Footer />
  </>
  )
}

export default DashboardDetentions;
