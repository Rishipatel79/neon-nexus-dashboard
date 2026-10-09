import { describe, expect, it } from 'vitest';
import { initialInventory, initialOrders, risk, days, replenish, transferable, transferSource, isOverdue } from '../lib/procurement';
const base=initialInventory.find(i=>i.sku==='BRG-6205');
if(!base)throw new Error('Missing demo record');
describe('procurement calculations',()=>{
 it('ships realistic demo records',()=>{expect(initialInventory).toHaveLength(32);expect(initialOrders).toHaveLength(12);});
 it('flags the supplier lead-time trap',()=>{expect(risk({...base,quantity:50,demand:1,lead:60})).toBe('Critical');});
 it('handles zero demand safely',()=>{expect(days({...base,demand:0})).toBe(Infinity);expect(risk({...base,quantity:0,demand:0})).toBe('Healthy');});
 it('never orders negative quantities',()=>{expect(replenish({...base,quantity:500},[])).toBe(0);});
 it('accounts for incoming orders once at the right destination',()=>{const item={...base,quantity:10,target:100};const order={...initialOrders.find(o=>o.status==='Ordered'),id:'test',sku:item.sku,location:item.location,quantity:30,price:1,supplier:'SUP-001',expected:'2099-01-01',created:'2026-01-01',status:'Ordered'};expect(replenish(item,[order])).toBe(60);expect(replenish(item,[{...order,location:'other'}])).toBe(90);});
 it('protects source stock reserve',()=>{const source={...base,quantity:100,min:60,demand:10,lead:8};expect(transferable(source)).toBe(20);expect(source.quantity-transferable(source)).toBeGreaterThanOrEqual(source.min);});
 it('finds genuine surplus at another location',()=>{const destination={...base,quantity:3,location:'Mumbai Store'};const source=transferSource(destination,initialInventory);expect(source?.location).not.toBe(destination.location);expect(source?transferable(source):0).toBeGreaterThan(0);});
 it('excludes received and cancelled orders from overdue',()=>{const order=initialOrders[0];if(!order)throw new Error('No order');expect(isOverdue({...order,status:'Received',expected:'2000-01-01'})).toBe(false);expect(isOverdue({...order,status:'Cancelled',expected:'2000-01-01'})).toBe(false);expect(isOverdue({...order,status:'Ordered',expected:'2000-01-01'})).toBe(true);});
});
