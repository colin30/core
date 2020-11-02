import React from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { FadeIn } from '@cjo3/shared/react/components/FadeIn'
import { Grid, Tooltip } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/core/styles'
import { prepSetValue } from '@cjo3/shared/logic/keyword-multiplier'
import { types } from '../../store/types'

const useStyles = makeStyles(theme => ({
  label: {
    width: '100%'
  },
  labelButton: {
    width: '100%',
    border: 'none',
    padding: theme.custom.setSpace(),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: `${theme.custom.borderRadius}px ${theme.custom.borderRadius}px 0 0`,
    backgroundColor: theme.palette.primary.main,
    transition: 'background-color 250ms ease-out',
    ...theme.custom.setFlex()
  },
  labelDisabled: {
    'backgroundColor': theme.palette.grey[400],
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  },
  labelWithValue: {
    'backgroundColor': theme.palette.pass[500],
    'cursor': 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.pass[400]
    }
  },
  labelIcon: {
    fontSize: theme.typography.fontSize * 1.25,
    position: 'relative',
    top: 1,
    marginRight: theme.custom.setSpace() / 2
  },
  textArea: {
    width: '100%',
    resize: 'none',
    border: 'none',
    backgroundColor: 'white',
    ...theme.typography.body1,
    padding: theme.custom.setSpace(),
    color: theme.palette.bodyColor,
    borderRadius: `0 0 ${theme.custom.borderRadius}px ${theme.custom.borderRadius}px`,
    transition: 'all 250ms ease-out'
  },
  textAreaDisabled: {
    backgroundColor: theme.palette.grey[200]
  }
}))

export const SetsTextAreaField = props => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const toggleDisabledSet = (fieldName, fieldValue) => {
    if (props.disabled)
      return dispatch({
        type: types.REMOVE_DISABLED_SET,
        fieldName
      })
    if (!props.disabled && fieldValue)
      return dispatch({
        type: types.ADD_DISABLED_SET,
        fieldName
      })
    return null
  }

  const setFadeInDirection = () => {
    if (!process.env.IS_SERVER) return window.innerWidth < 600 ? 'x' : 'y'
    return 'x'
  }

  return (
    <FadeIn
      direction={setFadeInDirection()}
      position={Math.random() > 0.5 ? 100 : -100}>
      <Grid container>
        <Tooltip
          title={
            !props.disabled && props.field.value
              ? 'Disable'
              : props.disabled
              ? 'Enable'
              : 'Enter Keywords'
          }
          placement="top-start"
          arrow>
          <label
            id={props.setField.label.id}
            htmlFor={props.setField.textArea.setName}
            className={classes.label}>
            <button
              type="button"
              onClick={event =>
                toggleDisabledSet(props.field.name, props.field.value)
              }
              className={clsx(classes.labelButton, {
                [classes.labelDisabled]: props.disabled,
                [classes.labelWithValue]: !props.disabled && props.field.value
              })}>
              <ListIcon className={classes.labelIcon} />
              {props.setField.label.name}
            </button>
          </label>
        </Tooltip>
        <textarea
          className={clsx(classes.textArea, {
            [classes.textAreaDisabled]: props.disabled
          })}
          onChange={props.field.onChange}
          onBlur={event => {
            props.form.setFieldValue(
              props.field.name,
              prepSetValue(event.target.value),
              false
            )
            props.field.onBlur(event)
          }}
          rows={props.setField.textArea.rows}
          placeholder={props.setField.textArea.placeholder}
          id={props.setField.textArea.setName}
          name={props.setField.textArea.setName}
          disabled={props.disabled}
          value={props.field.value}
        />
      </Grid>
    </FadeIn>
  )
}
