import { commonTags } from "../../lib/constants";
import { Dialog, Switch } from "radix-ui";
import { Trash } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

const TagsInput = ({ setTags, tags, tagsField }) => {
  const [tagInput, setTagInput] = useState("");
  const [open, setOpen] = useState(false);

  const addTag = (newTag) => {
    const tag = newTag.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleAddTag = () => {
    addTag(tagInput);
    setTagInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='mt-6'>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <div className='flex items-baseline justify-between'>
          <h2 className='text-lg font-medium leading-[35px] text-black dark:text-white'>
            Product Tags
          </h2>
          <span
            className={`text-[13px] text-red-500 opacity-80 ${
              !tagsField && "hidden"
            }`}
          >
            Please enter the appropriate tags for the product
          </span>
        </div>
        <Dialog.Trigger asChild>
          <button className='button dark:bg-slate-600  font-medium leading-none dark:text-white outline-none outline-offset-1 hover:bg-aquamine-3 dark:hover:bg-slate-500 focus-visible:outline-2 select-none'>
            Add Tags
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='fixed z-60 inset-0 bg-black/40 data-[state=open]:animate-overlayShow' />
          <Dialog.Content className='fixed z-100 left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-950 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow overflow-auto scrollbar-hidden'>
            <Dialog.Title className='m-0 text-[17px] font-medium dark:text-white'>
              Product Tags
            </Dialog.Title>
            <Dialog.Description className='mb-5 mt-2.5 text-[15px] leading-normal dark:text-white'>
              Add and manage product tags here. You can add multiple tags and
              chose from common tags
            </Dialog.Description>
            <fieldset className='mb-[15px] flex items-center gap-5'>
              <input
                type='text'
                className='input leading-none dark:text-white dark:border-slate-800 dark:focus:shadow-slate-950 border-aquamine-4 border-1 focus:shadow-aquamine-3 outline-none focus:shadow-[0_0_0_1px]'
                placeholder='Enter tag, e.g., electronics'
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type='button'
                onClick={handleAddTag}
                className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer'
              >
                Add
              </button>
            </fieldset>
            <div className='mt-3 flex flex-wrap gap-2 items-center'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-aquamine-7 dark:bg-slate-400 px-3 py-3 rounded flex items-center'
                >
                  {tag}
                  <button
                    type='button'
                    onClick={() => handleRemoveTag(index)}
                    className='size-12 md:size-14 flex items-center justify-center cursor-pointer bg-red-500 dark:bg-red-500 p-1 rounded hover:bg-red-500 ml-4'
                  >
                    <Trash />
                  </button>
                </span>
              ))}
            </div>
            <div className='mt-4'>
              <h2 className='text-md font-semibold font-dm dark:text-white'>
                Common tags
              </h2>
              <div className='flex flex-wrap gap-2 mt-2'>
                {commonTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => addTag(tag)}
                    className={`px-3 py-1 rounded border ${
                      tags.includes(tag)
                        ? "bg-aquamine-4 dark:bg-slate-600 border-0"
                        : "bg-aquamine-6 hover:bg-aquamine-7 dark:bg-slate-500 dark:hover:bg-slate-400 cursor-pointer"
                    }`}
                    disabled={tags.includes(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className='mt-[25px] flex justify-end'>
              <Dialog.Close asChild>
                <button className='inline-flex h-[35px] items-center justify-center rounded  bg-aquamine-4 px-[15px] font-medium leading-none  outline-none outline-offset-1 hover:bg-aquamine-3 dark:bg-slate-600 dark:hover:bg-slate-500 focus-visible:outline-2  select-none cursor-pointer'>
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
      {tags.length > 0 && (
        <div className='flex  mt-4 p-4 border-y pt-4 border-aquamine-4 dark:border-slate-950'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-semibold dark:text-white'>
              Product Tags
            </h2>
            <div className='flex flex-wrap gap-2 mb-4'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-aquamine-7 dark:bg-slate-400 px-3 py-3 rounded flex items-center'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default TagsInput;
