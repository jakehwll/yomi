const getErrorMessage = (statusCode: string) => {
  switch (statusCode) {
    // SCHEMA
    case 'schemaMalformed':
      return 'Something went horribly wrong.'
    case 'schemaEmail':
      return 'Email is invalid'
    // REGISTRATION
    case 'registerClosed':
      return "Registrations aren't currently open."
    case 'registerDuplicate':
      return 'We already have an account for that email!'
    // NEXTAUTH
    case 'CredentialsSignin':
      return 'Email or password credentials incorrect.'
  }
}

export default getErrorMessage
