import { Form } from "radix-ui";
import { useState } from "react";


const ExcelFileForm = () => {
    const [file, setFile] = useState(null)
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append("file", file);

      await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });
    };
  return (
    <Form.Root
      onSubmit={handleUpload}
      className='bg-white dark:bg-slate-800 w-full p-6 rounded-lg shadow-md max-w-6xl mx-auto font-dm border-aquamine-4 border-2 dark:border-slate-500'
    >
      <h2 className='text-2xl font-semibold mb-4 dark:text-white'>
        Excel File Upload
      </h2>
      <div className='border-dashed border-2 p-4 text-center border-aquamine-2 dark:border-black bg-aquamine-5 dark:bg-slate-700 cursor-pointer mb-4'>
        <input
          type='file'
          accept='.xlsx, .xls'
          onChange={(e) => setFile(e.target.files[0])}
          placeholder=''
        />
        <p>Drag & drop excel file here, or click to select file</p>
          </div>
          <div className="flex justify-end mt-4">
      <button
        className="className='mt-4 bg-aquamine-4 h-25 dark:bg-slate-500 uppercase dark:text-white px-4 py-2 rounded-md font-bold font-dm cursor-pointer'"
                  onClick={handleUpload}
                  disabled
      >
        Upload
      </button>
              
          </div>
    </Form.Root>
  );
}
export default ExcelFileForm