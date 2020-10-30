import { APP_PATH_MATCH } from '../raw/constants/regex'

export const parsePathRequest = path => {
  const appName = path.replace(APP_PATH_MATCH, '$2')
  const appPath = path.replace(APP_PATH_MATCH, '$3')
  const result = {
    requestedApp: appName
  }
  if (appPath?.length) {
    result.requestedPath = appPath
  }
  return result
}

export const findMatchingApp = (name, appsList) =>
  appsList.split(',').some(app => app === name)

export const switchPathPageName = appPath => {
  switch (appPath) {
    case undefined:
    case '/':
      return 'home'
    case '/feedback':
      return 'feedback'
    default:
      return 'error'
  }
}

export const splitAppsList = envVar => envVar.split(',')
