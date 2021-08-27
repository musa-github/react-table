
import React, { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import CheckBox from './CheckBox';
import { COLUMNS } from "./column";
import GlobalFilter from './GlobalFilter';
import mock_data from "./MOCK_DATA";
import "./table.css";

 function Pagination() {
   const data = useMemo(() => mock_data,[])
 const columns = useMemo(()=>COLUMNS,[])
  
 
 const tableInstance = useTable({ columns, data },
  useGlobalFilter
  /*this hoock for global filtering */,
  useSortBy/*this hoock for sorting */,
  usePagination
  
  )
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   footerGroups,
//    rows,  this is not needed for pagination
   prepareRow,
   // for pagination need to destucture those things
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageOptions,

   //nothing need to destucture here for sorting
   state,
   setGlobalFilter,
   // this two thing have to destucture here
allColumns,
getToggleHideAllColumnsProps

      }=tableInstance

      const {globalFilter,/*for pagination */pageIndex,}=state
 
   return (
     <>
<div style={{display:"flex", }}>
     <CheckBox  {...getToggleHideAllColumnsProps()}/> Toggle all
     { allColumns.map(column=>(
         <div key={column.id} >
             <label>
                 <input type="checkbox" {...column.getToggleHiddenProps()}/>
                {column.Header}
             </label>
         </div>
     ))} {/* for hiding column*/}
     <GlobalFilter 
     filter={globalFilter} 
     setFilter={setGlobalFilter}/>{/* this is for filtering */}
     </div>
     
     <table {...getTableProps()} >
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps(column.getSortByToggleProps())}
                
               >
                 {column.render('Header')}
                 <span> {column.isSorted?(column.isSortedDesc? "<":"^"):""}</span>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {/* {rows are not needed to pagination*/
         page.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
       <tfoot >
          { footerGroups.map(footerGroup=>(
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map(column=>(
                <td {...column.getFooterProps}> {column.render('Footer')}</td>
              ))}
            </tr>
          ))}
       </tfoot>
     </table>
     
     <div>
         <button onClick={()=>{previousPage()}} disabled={!canPreviousPage}>Previous</button>
         <span>
            Page {''}
            <strong>
                {pageIndex+ 1}of {pageOptions.length}
            </strong>{''}
         </span>
         <button onClick={()=>{nextPage()}} disabled={!canNextPage}>Next</button>
     </div>
     </>
   )
 }
 export default Pagination;