import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import {useState } from 'react';
        
export default function Table({data, onPageChange, info, selectedProducts, setSelectedProducts}:{data:any, onPageChange:any, info:any, selectedProducts:any, setSelectedProducts:any}) {
  const [page, setPage] = useState<any>({first:0})
  const [first, setFirst] = useState<any>(0);

  const selectionChange = (e:any) => {
    const newSelection = e.value;

    const merged = [
      ...selectedProducts.filter(
        (item:any) => !newSelection.some((n:any) => n.id === item.id)
      ),
      ...newSelection,
    ];
    setSelectedProducts(merged);
  }
  
  return (
    <div className='w-[90%]'>
      <div className='mb-1 text-slate-600 text-xs font-semibold'>Selected rows {selectedProducts.length}</div>
      <DataTable value={data} selectionMode={'checkbox'} selection={selectedProducts} onSelectionChange={(e)=>selectionChange(e)} dataKey="id" showGridlines stripedRows tableStyle={{ width:'100%', fontSize:"12px" }}  >
          <Column selectionMode="multiple" headerStyle={{ width: '30px' }}></Column>
          <Column field="title" header="TITLE" body={(row)=>row.title || 'NA'}></Column>
          <Column field="place_of_origin" header="PLACE OF ORIGIN" body={(row)=>row.place_of_origin || 'NA'}></Column>
          <Column field="artist_display" header="ARTIST" body={(row)=>row.artist_display || 'NA'}></Column>
          <Column field="inscriptions" header="INCRIPTIONS" body={(row)=>row.inscriptions || 'NA'}></Column>
          <Column field="date_start" header="START DATE" body={(row)=>row.date_start || 'NA'}></Column>
          <Column field="date_end" header="END DATE" body={(row)=>row.date_end || 'NA'}></Column>
      </DataTable>
      <div className='flex justify-between items-center'>
        <div className='text-slate-600 text-xs font-semibold'>Showing <span className='text-black'>{page.first+1}</span> to <span className='text-black'>{page.first+13}</span> of {info.total} entries</div>
        <Paginator first={first} rows={12} totalRecords={info.total} aria-current={page.page} onPageChange={(e)=>{onPageChange(e);setFirst(e.first); setPage(e)}} />
      </div>
    </div>
  )
}
