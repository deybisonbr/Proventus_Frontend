import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { toast } from 'react-toastify';
import './Login.css';
import arrow_login_button from '../../assets/images/arrow_login_button.svg'

import InputField from '../../components/Login/InputField';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      if (data && data.access_token) {

        if (rememberMe) {
          localStorage.setItem("token", data.access_token);
        } else {
          sessionStorage.setItem("token", data.access_token);
        }

        toast.success('Login realizado com sucesso! 🎉');

        navigate('/dashboard');
      } else {
        toast.error('Token não encontrado na resposta.');
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || 'Erro desconhecido');
    }
  };


  return (
    <div className="login-container">
      <div className="division_login_image">
        <h1 className="login_text_title"><span>Pro</span>ventus</h1>
        <p className="context_login">Eficiência e controle para o seu negócio. Faça login para gerenciar suas vendas e estoque com facilidade!</p>
      </div>

      <div className="content_form_login">

        <div className="content_form_and_inputs">

          <div className="message_login_content">
            <h1 className="title_message_login">Acesse o Proventus</h1>
            <p className="description_message_login">Conecte-se à plataforma central e acesse todas as funcionalidades e gerencie seu negocio</p>
          </div>

          <form className='login_form' onSubmit={handleSubmit}>
            <InputField
              labelName={"Email:"}
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
            />

            <InputField
              labelName={"Senha:"}
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />

            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className='label_text_remenber' htmlFor="rememberMe">Manter conectado</label>
            </div>

            <button className='button_login_form' type="submit">Acessar o Proventus <img src={arrow_login_button} /></button>

          </form>
        </div>


      </div>

    </div>
  );
};

export default Login;
