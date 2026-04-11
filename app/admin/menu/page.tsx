'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  ChevronDownIcon, 
  UtensilsCrossedIcon,
  SaveIcon,
  XIcon
} from 'lucide-react'
import { 
  getCategories, 
  createCategory, 
  deleteCategory, 
  createMenuItem, 
  deleteMenuItem,
  updateMenuItem
} from '@/app/actions/menu'

export default function MenuManagement() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [newCatName, setNewCatName] = useState('')
  const [showAddItem, setShowAddItem] = useState<string | null>(null)
  
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    tag: '',
    categoryId: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    setLoading(true)
    const data = await getCategories()
    setCategories(data)
    setLoading(false)
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCatName.trim()) return
    await createCategory(newCatName)
    setNewCatName('')
    loadCategories()
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (!newItem.name || !newItem.price) return
    await createMenuItem({
      ...newItem,
      categoryId: showAddItem!
    })
    setNewItem({ name: '', description: '', price: '', tag: '', categoryId: '' })
    setShowAddItem(null)
    loadCategories()
  }

  async function handleDeleteItem(id: string) {
    if (!confirm('Delete this item?')) return
    await deleteMenuItem(id)
    loadCategories()
  }

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-heading text-neutral-900 tracking-tight">
          Menu <span className="italic font-light">Management</span>
        </h1>
        <p className="font-body text-neutral-500 mt-1">
          Manage categories and dishes for the Road House Restaurant.
        </p>
      </div>

      {/* Add Category Section */}
      <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
        <h2 className="font-heading text-xl mb-6">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="flex gap-4">
          <input 
            type="text" 
            placeholder="e.g., Appetizers, Main Course, Drinks"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-3 outline-none focus:border-gold transition-colors font-body"
          />
          <button 
            type="submit"
            className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-body font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            <PlusIcon size={18} /> Add
          </button>
        </form>
      </div>

      {/* Categories & Items List */}
      <div className="space-y-6">
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-200">
            <UtensilsCrossedIcon className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <p className="text-neutral-400 font-body">No categories yet. Add one to get started.</p>
          </div>
        ) : (
          categories.map((cat) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden"
            >
              <div className="bg-neutral-50/50 p-6 flex justify-between items-center border-b border-neutral-100">
                <h3 className="font-heading text-xl text-neutral-900">{cat.name}</h3>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowAddItem(showAddItem === cat.id ? null : cat.id)}
                    className="text-sm font-body font-medium text-gold hover:text-gold/80 transition-colors flex items-center gap-1"
                  >
                    <PlusIcon size={16} /> Add Item
                  </button>
                  <button 
                    onClick={() => deleteCategory(cat.id).then(loadData => loadCategories()).catch(err => alert(err.message))}
                    className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>

              {/* Add Item Form (Inline) */}
              {showAddItem === cat.id && (
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="p-6 bg-cream/30 border-b border-neutral-100"
                >
                  <form onSubmit={handleAddItem} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input 
                        type="text" 
                        placeholder="Item Name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        className="bg-white border border-neutral-200 rounded-xl px-4 py-2 outline-none focus:border-gold font-body text-sm"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Price (e.g., LKR 1,500)"
                        value={newItem.price}
                        onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                        className="bg-white border border-neutral-200 rounded-xl px-4 py-2 outline-none focus:border-gold font-body text-sm"
                        required
                      />
                      <input 
                        type="text" 
                        placeholder="Tag (e.g., Popular, Spicy)"
                        value={newItem.tag}
                        onChange={(e) => setNewItem({...newItem, tag: e.target.value})}
                        className="bg-white border border-neutral-200 rounded-xl px-4 py-2 outline-none focus:border-gold font-body text-sm"
                      />
                    </div>
                    <textarea 
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2 outline-none focus:border-gold font-body text-sm h-20 resize-none"
                    />
                    <div className="flex justify-end gap-3">
                      <button 
                        type="button" 
                        onClick={() => setShowAddItem(null)}
                        className="px-6 py-2 rounded-lg text-sm font-body text-neutral-500 hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-gold text-white px-8 py-2 rounded-lg text-sm font-body font-bold flex items-center gap-2"
                      >
                        <SaveIcon size={14} /> Save Item
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Items Table */}
              <div className="divide-y divide-neutral-50">
                {cat.items.length === 0 ? (
                  <div className="p-10 text-center text-neutral-400 text-sm font-body italic">
                    No items in this category yet.
                  </div>
                ) : (
                  cat.items.map((item: any) => (
                    <div key={item.id} className="p-6 flex justify-between items-center hover:bg-neutral-50/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-neutral-800">{item.name}</span>
                          {item.tag && (
                            <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-500 font-body max-w-lg mt-1">{item.description}</p>
                        <p className="text-sm text-gold font-bold font-body mt-2">{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
