export const locations = ['Central Warehouse', 'North Warehouse', 'Mumbai Store', 'Pune Store', 'Delhi Store', 'Bengaluru Store', 'Chennai Store', 'Hyderabad Store'];
export const suppliers = [
 {id:'SUP-001',name:'Atlas Industrial',category:'Bearings',lead:7,reliability:98,price:450},
 {id:'SUP-002',name:'Vertex Components',category:'Electrical',lead:4,reliability:96,price:720},
 {id:'SUP-003',name:'Precision Supply Co.',category:'Fasteners',lead:5,reliability:99,price:120},
 {id:'SUP-004',name:'Nova Hydraulics',category:'Hydraulics',lead:12,reliability:92,price:1800},
 {id:'SUP-005',name:'Meridian Parts',category:'Bearings',lead:3,reliability:94,price:510},
 {id:'SUP-006',name:'VoltEdge Systems',category:'Electrical',lead:6,reliability:97,price:680},
 {id:'SUP-007',name:'Ironworks Distribution',category:'Fasteners',lead:8,reliability:95,price:105},
 {id:'SUP-008',name:'Flowline Industrial',category:'Hydraulics',lead:6,reliability:98,price:1950},
];
export type InventoryItem = {id:string;sku:string;name:string;category:string;location:string;quantity:number;demand:number;min:number;target:number;lead:number;price:number;supplier:string};
const parts = [ ['BRG-6205','Deep groove ball bearing','Bearings'], ['ELC-1012','Industrial relay 24V','Electrical'], ['FST-M12','Hex bolt M12 × 50','Fasteners'], ['HYD-204','Hydraulic seal kit','Hydraulics'] ];
export const initialInventory:InventoryItem[] = locations.flatMap((location,l) => parts.map(([sku,name,category],p) => {
 const supplier = suppliers[p];
 return {id:`INV-${l*4+p+1}`,sku,name,category,location,quantity:l===0?380+p*65:l===1?240+p*45:((l*17+p*29)%170)+20,demand:4+p*2,min:60,target:220,lead:supplier.lead,price:supplier.price,supplier:supplier.id};
}));
initialInventory[8].quantity=8; initialInventory[13].quantity=12; initialInventory[19].quantity=16; initialInventory[24].quantity=18;
export type PurchaseOrder = {id:string;sku:string;supplier:string;quantity:number;price:number;expected:string;created:string;status:string;location:string};
export const initialOrders:PurchaseOrder[] = Array.from({length:12},(_,i) => ({id:`PO-${2026001+i}`,sku:parts[i%4][0],supplier:suppliers[i%8].id,quantity:60+i*10,price:suppliers[i%8].price,expected:`2026-10-${String(i<3?5+i:12+i).padStart(2,'0')}`,created:'2026-10-01',status:i<3?'Ordered':i<7?'Ordered':i<9?'Draft':i<11?'Received':'Cancelled',location:locations[2+i%6]}));
export type Transfer = {id:string;source:string;destination:string;sku:string;quantity:number;status:string};
export function days(item:InventoryItem){return item.demand>0?item.quantity/item.demand:Infinity;}
export function risk(item:InventoryItem){return days(item)<=3?'Critical':days(item)<=item.lead+3||item.quantity<item.min?'Low':'Healthy';}
export function priorities(items:InventoryItem[]){return items.filter(i=>risk(i)!=='Healthy').sort((a,b)=>days(a)-days(b));}
export function incoming(item:InventoryItem,orders:PurchaseOrder[]){return orders.filter(o=>o.sku===item.sku&&o.location===item.location&&o.status==='Ordered').reduce((s,o)=>s+o.quantity,0);}
export function replenish(item:InventoryItem,orders:PurchaseOrder[]){return Math.max(0,item.target-item.quantity-incoming(item,orders));}
export function transferSource(item:InventoryItem,items:InventoryItem[]){return items.filter(i=>i.sku===item.sku&&i.location!==item.location&&i.quantity>Math.max(i.min,i.demand*i.lead)).sort((a,b)=>b.quantity-a.quantity)[0];}
export function transferable(item:InventoryItem){return Math.max(0,Math.floor(item.quantity-Math.max(item.min,item.demand*item.lead)));}
export function isOverdue(order:PurchaseOrder){return order.status==='Ordered'&&order.expected<new Date().toISOString().slice(0,10);}
export function money(value:number){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);}
export function exportCSV(name:string,rows:Record<string,unknown>[]){if(!rows.length)return;const keys=Object.keys(rows[0]);const escape=(v:unknown)=>`"${String(v??'').replaceAll('"','""')}"`;const csv=[keys.map(escape).join(','),...rows.map(r=>keys.map(k=>escape(r[k])).join(','))].join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download=`${name}.csv`;a.click();URL.revokeObjectURL(url);}
