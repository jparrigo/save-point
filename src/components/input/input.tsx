interface InputProps {
  title: string
  placeholder: string
}


export function Input({ title, placeholder, ...props }: React.ComponentProps<"input"> & InputProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="input" className="text-[#9E9E9E] text-sm font-light mb-1 pl-2">{title}</label>
      <input
        {...props}
        className="focus:drop-shadow-md focus:drop-shadow-[#444444] focus:outline focus:outline-[#616161] px-4 py-3 rounded-[6px] border border-[#515151] bg-gradient-to-r from-[#1A1919] to-[#0F0F0F] text-white text-sm placeholder:text-[#515151]" 
        id="input" 
        type="text" 
        placeholder={placeholder}
      />
    </div>
  )
}