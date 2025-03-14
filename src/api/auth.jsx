export const login = async (email, password) => {

  if(email === '' || password === ''){
    throw new Error('Preencha os campos necessários!');
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response)

    if(response.status === 401){
      throw new Error('Email ou senha incorretos!');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(error.message || 'Erro desconhecido');
  }
};