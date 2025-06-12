import { ExcelFileForm } from "../components/excelcomponents";
import {DotLoader, MBlobLoader, MclilyLoader, SpinnerLoader} from "../components/Loaders/index.js"

const ExcelUpload = () => {
  return (
    <div className="p-6 w-full">
      <ExcelFileForm />
      <div>
        <DotLoader />
        <MBlobLoader />
        <MclilyLoader />
        <SpinnerLoader />
      </div>
    </div>
      
  );
}
export default ExcelUpload