import { LOGIN_URL } from '../utils/contanst'
import { useAuth } from '../auth/AuthContext'
import { FormEvent, useState } from 'react'
import { toast, Toaster } from 'sonner'
import axios from 'axios'
import { User } from '../types/Interfaces';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, setUsernames } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    axios.post(`${LOGIN_URL}/login`, { username, password })
      .then(res => {
        if (res.status === 200) {
          login()
          const userData = res.data.user ?? res.data
          setUsernames(userData as User)
          navigate('/home')
        }
      })
      .catch(error => {
        console.log(error)
        if (error.message === 'Network Error') {
          toast.error('Error de conexión, y/o Red, contacte al administrador del sistema', { description: 'No se pudo iniciar session' })
          return
        }

        if (error.response.status === 400 || error.response.status === 401) {
          toast.error(error.response.data.message, { description: error.response.data.description })
          return
        }
      })
  }

  return (
    <section className='relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8'>
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_42%,_#e8eef8_100%)]'></div>
      <div className='absolute left-[-5rem] top-24 -z-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl'></div>
      <div className='absolute right-[-4rem] bottom-0 -z-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl'></div>

      <div className='mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='space-y-6 text-slate-900'>
          <div className='inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur'>
            <span className='h-2 w-2 rounded-full bg-emerald-500'></span>
            Plataforma de gestión PQRS
          </div>
          <div className='max-w-xl space-y-4'>
            <h1 className='text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl'>
              Acceso claro para revisar y exportar tus reportes.
            </h1>
            <p className='text-base leading-7 text-slate-600 sm:text-lg'>
              Un panel más limpio, con navegación sencilla, filtros visibles y salida directa a Excel para el seguimiento diario.
            </p>
          </div>

          <div className='grid max-w-xl gap-4 sm:grid-cols-3'>
            <div className='glass-panel rounded-3xl p-4'>
              <p className='text-2xl font-black text-slate-900'>+1</p>
              <p className='mt-1 text-sm text-slate-600'>Entrada única</p>
            </div>
            <div className='glass-panel rounded-3xl p-4'>
              <p className='text-2xl font-black text-slate-900'>24/7</p>
              <p className='mt-1 text-sm text-slate-600'>Consulta continua</p>
            </div>
            <div className='glass-panel rounded-3xl p-4'>
              <p className='text-2xl font-black text-slate-900'>XLSX</p>
              <p className='mt-1 text-sm text-slate-600'>Exportación rápida</p>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-white/40 to-emerald-500/10 blur-2xl'></div>
          <div className='glass-panel overflow-hidden rounded-[2rem]'>
            <div className='border-b border-slate-200/80 bg-slate-50/80 px-8 py-6 text-center'>
              <figure className='mb-4 flex justify-center'>
                <img width={160} src='/gane.webp' alt='logo' className='drop-shadow-sm' />
              </figure>
              <h2 className='text-2xl font-black tracking-tight text-slate-950'>Gestion de PQRS</h2>
              <p className='mt-2 text-sm leading-6 text-slate-600'>
                Inicia sesión para consultar, filtrar y exportar los casos del bot.
              </p>
            </div>

            <div className='px-8 py-8'>
              <form className='space-y-5' onSubmit={handleSubmit}>
                <div className='field-shell'>
                  <label className='field-label'>Usuario</label>
                  <input
                    className='field-input'
                    onChange={ev => setUsername(ev.target.value)}
                    type='text'
                    placeholder='CP1118******'
                    required
                    value={username}
                  />
                </div>

                <div className='field-shell'>
                  <label className='field-label'>Contraseña</label>
                  <input
                    className='field-input'
                    onChange={ev => setPassword(ev.target.value)}
                    type='password'
                    placeholder='••••••••'
                    required
                    value={password}
                  />
                </div>

                <button className='primary-button w-full'>
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Toaster duration={4000} position='top-right' richColors visibleToasts={3} />
    </section>
  )
}

export default LoginPage
