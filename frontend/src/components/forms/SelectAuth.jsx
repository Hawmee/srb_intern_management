import { useFormContext } from 'react-hook-form'

// eslint-disable-next-line react/prop-types
function SelectAuth({name , label , options , validation , ...props}) {

    const {register , formState:{errors}} = useFormContext()

  return (
    <>
        <div  className='flex flex-col'>
            <label className='text-white'>{label}</label>
            <select {...register(name,validation)} {...props}>
                {/* eslint-disable-next-line react/prop-types */}
                {options&& options.map((option)=>(
                    <option key={option.value} value={option.value} className='bg-white'>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <p>{errors[name]?.message}</p>}
        </div>
    </>
  )
}

export default SelectAuth