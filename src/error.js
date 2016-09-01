export function PAPIError(message) {
  this.message = message;
}


function handleError(error, node, errorMessages = {}) {
  const messages = Object.assign(errorMessages, {
    GENERIC: 'Произошла ошибка',
  });
  const element = node;

  if (error instanceof PAPIError) {
    element.innerHTML = messages[error.message] || messages.GENERIC;
  } else {
    element.innerHTML = messages.GENERIC;
  }
}

export default handleError;
