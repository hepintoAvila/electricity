
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const ButtonExportar = ({numtable}) => {
  const tablexls=`${numtable}`
  const sheet=`tablexls${numtable}`
    return (
      <div  className="float-end">
      <ReactHTMLTableToExcel
                    id="Table"
                    className={'mdi mdi mdi-download ms-1 ms-1 me-1 btn btn-primary ms-2'}
                    table={numtable}
                    filename={tablexls}
                    sheet={sheet}
                    buttonText="XLS"/>
            </div>
     );
};
export default ButtonExportar;
