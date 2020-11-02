import React from 'react'
import { Formik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Dialog, Grid, Typography } from '@material-ui/core'
import { BackDropScreen } from '@cjo3/shared/react/components/BackDropScreen'
import { makeStyles } from '@material-ui/core/styles'
import { VolumeForm } from './VolumeForm'
import { countryCodesList } from '@cjo3/shared/raw/constants/countryCodes'
import { types } from '../../store/types'
import { setInitialCountry } from '@cjo3/shared/logic/keyword-multiplier'
import { constants } from '@cjo3/shared/raw/constants/keyword-multiplier'
import { useStripe, useElements } from '@stripe/react-stripe-js'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  paper: {
    backgroundColor: theme.palette.secondary[100],
    [theme.breakpoints.up('xs')]: {
      padding: theme.custom.setSpace('md')
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.custom.setSpace()
    }
  },
  contentContainer: {
    maxWidth: 1024
  },
  mainHeading: theme.typography.mainHeading,
  subHeading: theme.typography.subHeading
}))

export const Volume = ({ dialogStatus, closeDialogHandler, trialId }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const stripe = useStripe()
  const elements = useElements()

  const keOptions = {
    countryOptions: useSelector(state => state.kE.countries),
    currencyOptions: useSelector(state => state.kE.currencies),
    dataSourceOptions: useSelector(state => state.kE.dataSources),
    userSelections: useSelector(state => state.kE.userSelections)
  }

  let ipCountryCode = useSelector(state => state.app.geoIp?.country_code)
  const countryDetails = countryCodesList.find(
    country => country.alpha2Code === ipCountryCode
  )
  const firstCurrency = countryDetails?.currencies[0]
  const curCode = firstCurrency?.code.toLowerCase()

  let initalValues = {
    country: setInitialCountry(
      keOptions.userSelections?.country,
      ipCountryCode
    ),
    currency: keOptions.userSelections?.currency || curCode.toLowerCase(),
    dataSource: keOptions.userSelections?.dataSource || '',
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
    billingEmail: '',
    acceptTerms: false
  }

  if (process.env.USE_MOCKS) {
    initalValues = {
      country: keOptions.userSelections.country || 'ca',
      currency: keOptions.userSelections.currency || 'cad',
      dataSource: keOptions.userSelections.dataSource || 'gkp',
      cardNumber: true,
      cardExpiry: true,
      cardCvc: true,
      billingEmail: '',
      acceptTerms: true
    }
  }

  const customSubmitHandler = (values, actions) => {
    const cardNumberElement = elements.getElement('cardNumber')
    if (!cardNumberElement) return null
    dispatch({
      type: types.ORDER_METRICS,
      values,
      cardNumberElement,
      confirmCardPaymentHandler: stripe.confirmCardPayment,
      closeDialogHandler
    })
  }

  const customResetHandler = (event, setFieldValueHandler) => {
    if (!elements) return null
    elements?._elements.forEach(element => element.clear())
    Object.entries(initalValues).forEach(([key, val]) =>
      setFieldValueHandler(key, val, false)
    )
  }

  const isSubmitting = useSelector(
    state => state.app?.spinnerStatuses[constants.VOLUME_SPINNER]
  )

  return (
    <Dialog
      open={dialogStatus}
      transitionDuration={500}
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen
      PaperProps={{
        classes: {
          root: classes.paper
        }
      }}>
      <BackDropScreen isOpen={isSubmitting} spinner />
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.contentContainer}>
        <Typography component="h4" className={classes.subHeading}>
          Keyword Metric Order Form
        </Typography>
        <Typography component="h3" className={classes.mainHeading}>
          Quantify your Keyword Variation Trial
        </Typography>
        <Formik initialValues={initalValues} onSubmit={customSubmitHandler}>
          {formikProps => (
            <VolumeForm
              formikProps={formikProps}
              closeDialogHandler={closeDialogHandler}
              trialId={trialId}
              keOptions={keOptions}
              customResetHandler={customResetHandler}
            />
          )}
        </Formik>
      </Grid>
    </Dialog>
  )
}