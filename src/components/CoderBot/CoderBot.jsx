import React from 'react'
import PropTypes from 'prop-types'
import './CoderBot.scss'
import CoderBroken from '../../assets/icons/coder-broken.svg'
import CoderHappy from '../../assets/icons/coder-welcome.svg'



const getHeading = code => {
  switch(code) {
  case 404:
    return 'D’oh! We couldn’t find the page you were looking for.'
  case 200:
    return 'Success!!'
  case 500:
  default:
    return 'D’oh! Something went wrong'
  }
}

const getMessage = (code, heading, message) => {
  const subject = "Topcoder Connect Issue Report";
  let body = heading || getHeading(code);
  if (message) {
    body = `${body} <br> ${message}`;
  }
  switch(code) {
  case 200:
    return 'Operation performed successfully!!'
  default:
    return `Sorry about that, mate! Please try reloading the page again. If things don’t work or you’re sure it is Coder’s fault, send us a note at <a href="mailto:support@topcoder.com?subject=${subject}&body=${body}">support@topcoder.com</a> and we’ll fix it for you.`
  }
}

const copyToClipboard = (code, heading, message) => {
  const subject = "Topcoder Connect Issue Report";
  let body = heading || getHeading(code);
  if (message) {
    body = `${body} <br> ${message}`;
  }
  const textField = document.createElement('textarea')
  textField.innerText = `${subject} ${body}`
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
}

const CoderBot = ({code, message, heading, children}) => {
  return (
    <section className="content content-error">
      <div className="container">
        <div className="page-error">
          <h3>{ heading || getHeading(code) }</h3>
          <div className="content">
            <p dangerouslySetInnerHTML={ {__html : message || getMessage(code, heading, message) } } />
            <div>{children}</div>
          </div>
          <div>
            <button
              onClick= { () => copyToClipboard(code, heading, message) }
              className="tc-btn tc-btn-primary"
            >
              Copy error details
            </button>
          </div>
          {code !== 200 ? <CoderBroken className="icon-coder-broken" /> : <CoderHappy className="icon-coder-broken" />}
          <span>{code !== 200 && code}</span>
        </div>
      </div>
    </section>
  )
}

CoderBot.propTypes = {
  code: PropTypes.number.isRequired
}
CoderBot.defaultProps = {
  code: 500
}
export default CoderBot
