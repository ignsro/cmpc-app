import { Card } from "@mui/material"
import RecentLogsTable from "./RecentLogsTable"
import { BCMLog } from "src/models/bcm"
import { useEffect, useState } from "react";

interface RecentLogsProps {
  logsHarcoded: BCMLog[]
}

const RecentLogs: React.FC<RecentLogsProps> = ({logsHarcoded}) => {
  return (
    <Card>
      <RecentLogsTable logs={logsHarcoded} />
    </Card>
  )
}

export default RecentLogs