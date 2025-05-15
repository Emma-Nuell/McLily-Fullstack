import { Switch, Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

const Featured = ({ setFeatured, featured }) => {
    
  return (
    <div className='flex items-center my-14'>
      <label
        htmlFor='feat'
        className='text-lg font-bold leading-none dark:text-white'
      >
        Add product to the featured list?
      </label>
      <label className='flex items-center space-x-2 ml-6 cursor-pointer'>
        <input
          id='feat'
          type='checkbox'
          className='peer hidden'
          checked={featured}
          onChange={() => setFeatured(!featured)}
        />
        <div className='w-14 h-14 border border-gray-400 flex items-center justify-center peer-checked:bg-aquamine-4 peer-checked:dark:bg-slate-500 peer-checked:border-aquamine-4 peer-checked:dark:border-slate-500 rounded-full transition-all duration-300'>
          {featured && <CheckIcon className='dark:text-white' />}
        </div>
      </label>
    </div>
  );
};
export default Featured;
