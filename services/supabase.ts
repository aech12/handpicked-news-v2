const signUp = async (email: string, password: string, client) =>
  await client.auth.signUp({
    email,
    password,
  })

  const login = async (email: string, password: string, client) =>
  await client.auth.signUp({
    email,
    password,
  })

export { signUp, login }
