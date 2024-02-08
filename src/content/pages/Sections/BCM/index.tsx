import { Container, Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import RecentLogs from "./RecentLogs"
import Cronometro from "../../Components/Machine/timer"
import NewLog from "../../Components/Machine/newLog"
import { BCMLog } from "src/models/bcm"
import { useState } from "react"
import Footer from 'src/components/Footer';


const logsHardcoded: BCMLog[] = [
  {
    id: 1,
    machineNumber: "BCM2",
    category: "algo",
    subCategory: "algo2",
    timeRecords: [12, 2, 4],
    timeElapsed: 12,
    user: "Juan"
  },
  {
    id: 2,
    machineNumber: "BCM2",
    category: "algo",
    subCategory: "algo2",
    timeRecords: [12, 2, 4],
    timeElapsed: 2,
    user: "Juan"
  },
  {
    id: 3,
    machineNumber: "BCM1",
    category: "some",
    subCategory: "something",
    timeRecords: [12, 2, 4],
    timeElapsed: 5,
    user: "Juan"
  },
]

const BCM2: React.FC = () => {
  const [logs, setLogs] = useState<BCMLog[]>(logsHardcoded)

  const newID = () => {
    let aux = 0
    logs.forEach(x => {
      if (x.id > aux) {
        aux = x.id
      }
    })
    return aux+1
  }

  const AddLog = (log: BCMLog) => {
    const prevLogs = [...logs]
    log.id = newID()

    const exist = prevLogs.find(x => x.machineNumber === log.machineNumber && x.subCategory === log.subCategory)
    if (exist) {
      exist.timeRecords.push(log.timeElapsed)
      setLogs(prevLogs)
    } else {
      log.timeRecords = [log.timeElapsed]
      prevLogs.push(log)
    }

    setLogs(prevLogs)
  }
  return (
    <>
      <Helmet>
        BCM
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
            <NewLog addLog={AddLog} />
          </Grid>
          <Grid item xs={12}>
            <RecentLogs logsHarcoded={logs} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default BCM2