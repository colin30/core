import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '../components/tabPanel'
import { selectMyHistory, selectMyOpenOrders } from '../../store/selectors'
import History from './history'
import OpenOrders from './openOrders'

export default () => {
  const [tab, setTab] = useState(0)
  const changeHandler = (event, newTab) => setTab(newTab)
  const myHistory = useSelector(state => selectMyHistory(state))
  const myOpenOrders = useSelector(state => selectMyOpenOrders(state))
  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={changeHandler}
            indicatorColor="primary"
            textColor="inherit">
            <Tab label="Open Orders" />
            <Tab label="History" />
          </Tabs>
        </AppBar>
        <TabPanel
          tab={tab}
          index={0}
          child={<OpenOrders trades={myOpenOrders} />}
        />
        <TabPanel tab={tab} index={1} child={<History trades={myHistory} />} />
      </Grid>
    </Grid>
  )
}
