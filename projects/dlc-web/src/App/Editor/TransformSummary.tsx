import { TransformSummary as ITransformSummary } from '@cjo3/dlc-web/src/store/editor/interfaces'
import clsx from 'clsx'
import {
  Button,
  ButtonGroup,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import React from 'react'
import { openPreview } from '../../store/editor/actions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  TransformSummary_panel: {
    'padding': theme.custom.setSpace('sm'),
    'marginTop': theme.custom.setSpace('sm'),
    ...theme.custom.borderRadius,
    'transition': 'box-shadow 250ms ease-out',
    'background': theme.custom.setLinearGradient(180, 'whitesmoke', 'white'),
    '&:first-of-type': {
      marginTop: 0
    },
    '&:hover': {
      boxShadow: '0.5rem 0.5rem 2rem rgba(0, 0, 0, 0.1)'
    }
  },
  grey_bg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[300],
      'white'
    )
  },
  primary_bg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.primary[100],
      'white'
    )
  },
  secondary_bg: {
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.secondary[100],
      'white'
    )
  },
  TransformSummary_panel_left: {
    ...theme.custom.borderRadius,
    backgroundColor: theme.palette.primary[100],
    padding: theme.custom.setSpace('sm'),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.custom.setSpace('sm')
    }
  },
  doubleArrow: {
    fontSize: theme.typography.fontSize * 10,
    color: 'white',
    opacity: 0.25
  },
  noPadding: {
    padding: 0
  },
  marginTop: {
    marginTop: theme.custom.setSpace('sm')
  },
  heading: {
    position: 'relative',
    zIndex: 5
  },
  chip: {
    ...theme.typography.bold,
    fontSize: theme.typography.fontSize * 1.25,
    padding: theme.custom.setSpace(),
    color: 'white',
    marginTop: theme.custom.setSpace()
  }
}))

interface Props {
  title: string
  caseData: ITransformSummary
  buttonName: string
  openDrawerHandler: (event: React.MouseEvent) => void
}
export const TransformSummary: React.FC<Props> = ({
  buttonName,
  title,
  caseData,
  openDrawerHandler
}): JSX.Element => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const openPreviewHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    dispatch(openPreview())
  }

  if (caseData.addresses.length < 1) return null

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      className={classes.TransformSummary_panel}>
      <Grid item xs={12} sm={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography variant="h5">{title}</Typography>
          <Typography
            variant="body1"
            align="center"
            className={classes.marginTop}>
            Instances Transformed&emsp;
          </Typography>
          <Chip
            label={caseData.count}
            color="primary"
            className={classes.chip}
          />
          <Typography variant="body1" align="center">
            Unique Instance Count&emsp;
          </Typography>
          <Chip
            label={caseData.originalValues.length}
            color="secondary"
            className={classes.chip}
          />
          <ButtonGroup className={classes.marginTop}>
            <Button
              name={buttonName}
              type="button"
              variant="outlined"
              color="primary"
              onClick={openDrawerHandler}>
              Inspect Transforms
            </Button>
            <Button type="button" onClick={openPreviewHandler}>
              View Preview
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        className={clsx(classes.TransformSummary_panel_left, {
          [classes.grey_bg]: buttonName === 'zero',
          [classes.primary_bg]: buttonName === 'ul',
          [classes.secondary_bg]: buttonName === 'ol'
        })}>
        <Grid container justify="center" alignItems="flex-start">
          <Grid item xs={5}>
            <Typography variant="h6" align="center" className={classes.heading}>
              Originals
            </Typography>
            <List dense>
              {caseData.originalValues.map(value => (
                <ListItem key={`list-item-${value}`} alignItems="center" dense>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={{
                      align: 'center'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={2}>
            <Grid container justify="center" alignItems="center">
              <DoubleArrowIcon className={classes.doubleArrow} />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" align="center" className={classes.heading}>
              Transformed
            </Typography>
            <List dense>
              {caseData.changedValues.map(value => (
                <ListItem
                  key={`list-item-${value}`}
                  alignItems="center"
                  dense
                  disableGutters>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={{
                      align: 'center'
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
