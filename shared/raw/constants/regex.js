module.exports = {
  EMAIL_ADDRESS: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // HOSTNAME: /^(.*(\.\w+)|localhost)$/,
  // PATHNAME: /^\/(.*)?$/,
  CREDIT_CARD_NUMBER: /^\d{16}$/,
  CREDI_CARD_CODE: /^[1-9]\d{2}$/,
  IP_ADDRESS: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
  LINE_INCLUDES_TLD: /(.*)(\.[a-z]{1}[a-z0-9\-]{1,23})/gi
}
