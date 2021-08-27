
import React, { useMemo } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { COLUMNS } from "./column";
import GlobalFilter from './GlobalFilter';
import mock_data from "./MOCK_DATA";
import "./table.css";

 function FilteringTable() {
   const data = useMemo(() => mock_data,[])
 const columns = useMemo(()=>COLUMNS,[])
  
 
 const tableInstance = useTable({ columns, data },
  useGlobalFilter
  /*this hoock for global filtering */,
  useSortBy/*this hoock for sorting */,
  
  )
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   footerGroups,
   rows,
   prepareRow,
   //nothing need to destucture here for sorting
   state,
   setGlobalFilter
   // this two thing have to destucture here

      }=tableInstance

      const {globalFilter}=state
 
   return (
     <>
     <GlobalFilter 
     filter={globalFilter} 
     setFilter={setGlobalFilter}/>
     
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
         {rows.map(row => {
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
     </>
   )
 }
 export default FilteringTable;