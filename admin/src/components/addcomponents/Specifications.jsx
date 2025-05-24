import { useEffect, useState } from "react"
import { Dialog, Label, } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Plus } from "lucide-react";

const transformToKeyValuePairs = (obj) => {
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};


const Specifications = ({ onSave, specField, isEditMode, specificationsMain }) => {
  
  const [specifications, setSpecifications] = useState(
    specificationsMain && isEditMode
      ? transformToKeyValuePairs(specificationsMain)
      : [{ key: "", value: "" }]
  );
  const [specOpen, setSpecOpen] = useState(false);

  useEffect(() => {
    if (specificationsMain && isEditMode) {
      setSpecifications(transformToKeyValuePairs(specificationsMain));
    }
    else {
      setSpecifications([{ key: "", value: "" }]);
    }
  }, [specificationsMain, isEditMode]);
  
  
  
  const handleChange = (index, field, value) => {
    const newSpecifications = [...specifications]
    newSpecifications[index][field] = value
    setSpecifications(newSpecifications)
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  const removeSpecification = (index) => {
    const newSpecifications = specifications.filter((_, i) => i !== index)
    setSpecifications(newSpecifications)
  }

  const handleSave = () => {
    const formattedSpecs = specifications.reduce((acc, { key, value }) => {
      if (key.trim() && value.trim()) {
        acc[key] = value
      }
      return acc
    }, {})
    onSave(formattedSpecs)
    setSpecOpen(false)
  }
  return (
    <div className='dark:text-white mt-6 '>
      <Dialog.Root open={specOpen} onOpenChange={setSpecOpen}>
        <div className="flex items-baseline justify-between">
        <h2 className='text-lg font-medium leading-[35px] text-black dark:text-white'>
          Product Specifications
        </h2>
        <span className={`text-[13px] text-red-500 opacity-80 ${!specField && "hidden"}`}>Please enter the product specifications</span>
        </div>
        <Dialog.Trigger asChild>
          <button className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'>
            Add Specifications
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed z-60 inset-0 bg-black/40 data-[state=open]:animate-overlayShow' />
          <Dialog.Content className='fixed z-100 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-950 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow overflow-auto scrollbar-hidden'>
            <Dialog.Title className='m-0 text-[17px] font-medium dark:text-white'>
              Product Specifications
            </Dialog.Title>
            <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal dark:text-white'>
              Add and manage product specifications here. You can add multiple
              specifications and save them.
            </Dialog.Description>
            {specifications.map((spec, index) => (
              <div key={index} className='mb-4 p-6'>
                <fieldset className='mb-[15px] flex items-center gap-5'>
                  <label
                    className='w-[70px] text-right text-[15px] dark:text-white'
                    htmlFor={spec.key}
                  >
                    Key
                  </label>
                  <input
                    type='text'
                    placeholder='Key (e.g., Color)'
                    value={spec.key}
                    onChange={(e) => handleChange(index, "key", e.target.value)}
                    className='input leading-none dark:text-white dark:border-slate-800 dark:focus:shadow-slate-950 border-aquamine-4 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px] capitalize'
                  />
                </fieldset>
                <fieldset className='mb-[15px] flex items-center gap-5'>
                  <label
                    className='w-[70px] text-right text-[15px] dark:text-white'
                    htmlFor={spec.value}
                  >
                    Value
                  </label>
                  <input
                    type='text'
                    placeholder='Value (e.g., Red)'
                    value={spec.value}
                    onChange={(e) =>
                      handleChange(index, "value", e.target.value)
                    }
                    className='input leading-none dark:text-white dark:border-slate-800 dark:focus:shadow-slate-950 border-aquamine-4 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                  />
                </fieldset>
                <div className='flex justify-end items-center gap-4'>
                  <button
                    type='button'
                    className='size-12 md:size-18 flex items-center justify-center cursor-pointer bg-red-600 text-white p-1 rounded self-end'
                    onClick={() => removeSpecification(index)}
                  >
                    <Cross2Icon />
                  </button>
                </div>
              </div>
            ))}
            <div className='mt-[25px] flex justify-end items-center gap-4'>
              <button
                type='button'
                className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointe'
                onClick={addSpecification}
              >
                <Plus />
              </button>
              <Dialog.Close asChild>
                <button
                  className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer'
                  onClick={handleSave}
                >
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                className='absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full dark:text-white bg-aquamine-4 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:shadow-gray-950 hover:bg-aquamine-3 cursor-pointer focus:shadow-[0_0_0_2px] focus:shadow-aquamine-3 focus:outline-none'
                aria-label='Close'
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      {specifications.length > 0 && (
        <div className='mt-4 p-4 rounded border-y pt-4 border-aquamine-4 dark:border-slate-950'>
          <h3 className='text-lg font-dm font-semibold dark:text-white'>
            Specifications
          </h3>
          {specifications.map((spec, index) => (
            <p key={index} className=''>
              <strong>{spec.key}: </strong> {spec.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
export default Specifications