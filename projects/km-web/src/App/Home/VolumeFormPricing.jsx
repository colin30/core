import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { calculateTrialPrice } from '@cjo3/shared/logic/km'
import { constants } from '@cjo3/shared/raw/constants/km'
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  table: {
    width: '100%',
    marginTop: theme.custom.setSpace(),
    border: 'none'
  },
  noBorder: {
    border: 'none'
  },

  headCell: {
    color: theme.palette.secondary[100],
    border: 'none'
  },
  dataCell: {
    ...theme.typography.bold,
    color: 'white',
    border: 'none'
  },
  total: {
    ...theme.typography.bold,
    textTransform: 'uppercase'
  },
  note: {
    ...theme.typography.italic,
    border: 'none',
    width: '100%',
    fontSize: theme.typography.fontSize,
    lineHeight: 1.33,
    color: 'white',
    textAlign: 'left',
    marginTop: theme.custom.setSpace()
  }
}))

export const VolumeFormPricing = ({ trialId }) => {
  const classes = useStyles()
  const trial = useSelector(state =>
    state.app.trials.items.find(trial => trial.id === trialId)
  )

  const dispatch = useDispatch()

  const price = calculateTrialPrice(trial.billableKeywords.length)

  const hasBumpUpFee = price.bumpUpFee > 0

  useEffect(() => {
    dispatch({
      type: types.SET_ORDER_REQUEST,
      trialId: trialId,
      price
    })
  }, [price])

  return (
    <Table size="small" className={classes.table}>
      <TableBody>
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Billable Keywords
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            {trial.billableKeywords.length}
          </TableCell>
        </TableRow>
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Price per Metric
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.unitPrice}
          </TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Metrics Cost
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.metricsCost}
          </TableCell>
        </TableRow>
        {hasBumpUpFee && (
          <TableRow className={classes.noBorder} hover>
            <TableCell component="th" align="left" className={classes.headCell}>
              Bump Up Fee
            </TableCell>
            <TableCell className={classes.dataCell} align="right">
              &#43;&nbsp;&#36;&nbsp;
              {price.bumpUpFee}
            </TableCell>
          </TableRow>
        )}
        <TableRow className={classes.noBorder} hover>
          <TableCell component="th" align="left" className={classes.headCell}>
            Processing Fee
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#43;&nbsp;&#36;&nbsp;
            {price.processingFee}
          </TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell
            component="th"
            align="left"
            className={clsx(classes.headCell)}>
            Total
          </TableCell>
          <TableCell className={classes.dataCell} align="right">
            &#36;&nbsp;{price.total}
          </TableCell>
        </TableRow>
        <TableRow className={classes.noBorder}>
          <TableCell className={classes.note} colSpan={2}></TableCell>
        </TableRow>
        <TableRow className={classes.noBorder}>
          <TableCell className={classes.note} colSpan={2}>
            &#42; All prices listed in Canadian Dollars &#36; CAD
          </TableCell>
        </TableRow>
        {hasBumpUpFee && (
          <TableRow className={classes.noBorder}>
            <TableCell className={classes.note} colSpan={2}>
              &#42; Bump up fee charged when billable keywords are less than
              &nbsp;{constants.VOLUME_DATA.MIN_ITEM_COUNT}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

VolumeFormPricing.propTypes = {
  trialId: PropTypes.string.isRequired
}
