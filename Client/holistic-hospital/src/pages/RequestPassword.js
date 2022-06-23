import React, { lazy, useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

//Components imports
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

//Helpers imports
import logo from '../logo.png';

const LeftLoginSection = lazy(() => import('../components/LeftLoginSection'));

export default function RecoverPassword() {
    const toast = useRef(null);

    const [formData, setFormData] = useState({});

    const defaultValues = {
        code: '',
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {
        setFormData(data);
        reset();
        toast.current.show({
            severity: 'info',
            summary: 'Confirmación',
            detail: 'Por favor verifique su bandeja de entrada y siga los pasos indicados.',
            life: 6000,
            style: { marginLeft: '20%' }
        });        
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };



    return (
        <div>
            <div className="relative min-h-screen grid bg-black w-full">
                <Toast ref={toast} />
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                    <LeftLoginSection />
                    <div
                        className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none "
                    >
                        <div className="max-w-xl w-full space-y-12">
                            <div className="lg:text-left text-center">
                                <h2 className="font-bold text-gray-100">
                                    <img src={logo} alt='logo' style={{ height: '10vmin' }} />
                                </h2>
                                <h2 className="mt-2 text-6xl font-bold text-gray-100">
                                    Recuperar contraseña
                                </h2>
                            </div>
                            <div className="flex flex-row justify-center items-center space-x-2"></div>

                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col block justify-center items-center w-full h-3/4 rounded-md shadow-md">
                            <div className="field mt-8">
                                    <span className="p-float-label">
                                        <Controller name="code" control={control} rules={{ required: 'El código es requerido.' }} render={({ field, fieldState }) => (
                                            <InputText autoFocus autoComplete="off" id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="code" className={classNames({ 'p-error': errors.code })}>Código*</label>
                                    </span>
                                    {getFormErrorMessage('code')}
                                </div>

                                <br />

                                <button
                                    type="submit"
                                    className="lg:w-1/2 w-full flex justify-center text-white p-2 rounded-full tracking-wide font-bold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg bg-blue-800 cursor-pointer transition ease-in duration-300"
                                >
                                    Enviar correo
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

/*
<div>
            <div className="relative min-h-screen  grid bg-black ">
                <Toast ref={toast} />
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                    <LeftLoginSection />
                    <div
                        className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none "
                    >
                        <div className="max-w-xl w-full space-y-12">
                            <div className="lg:text-left text-center">
                                <h2 className="font-bold text-gray-100">
                                    <img src={logo} alt='logo' style={{ height: '10vmin' }} />
                                </h2>
                                <h2 className="mt-2 text-7xl font-bold text-gray-100">
                                    Recuperar contraseña
                                </h2>
                            </div>
                            <div className="flex flex-row justify-center items-center space-x-2"></div>

                            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className="flex flex-col block justify-center items-center p-5 w-full h-3/4 rounded-md shadow-md">
                                <div className="field m-2">
                                    <span className="p-float-label">
                                        <Controller name="code" control={control} rules={{ required: 'El código es requerido.' }} render={({ field, fieldState }) => (
                                            <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                        )} />
                                        <label htmlFor="code" className={classNames({ 'p-error': errors.name })}>Código*</label>
                                    </span>
                                    {getFormErrorMessage('code')}
                                </div>
                                <button type="submit" className="lg:w-1/2 w-full flex justify-center text-white p-2 rounded-full tracking-wide font-bold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg bg-blue-800 cursor-pointer transition ease-in duration-300">Enviar correo</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
*/