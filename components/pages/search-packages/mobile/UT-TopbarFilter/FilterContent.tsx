// 'use client'

// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerTitle,
// } from '@/components/ui/drawer'
// import { useEffect, useRef, useState } from 'react'

// // Mock data
// const facilitiesData = [
//   'Air Zamzam',
//   'Asuransi selama di Saudi',
//   'Bagasi 23 kg x 2',
//   'Al Baik',
//   'Kereta Cepat',
//   'City Tour',
//   'Wifi Portable',
//   'Hotel Bintang 5',
// ]

// const packageTypesData = [
//   'Paket Umroh Plus',
//   'Paket Promo',
//   'Paket Reguler',
//   'Paket Premium',
// ]

// const promosData = [
//   'Semua Promo',
//   'Wawan Mencari Diskon',
//   'Promo Ramadhan',
//   'Promo Mencari Berkah',
//   'Promo Spesial',
//   'Diskon Akhir Tahun',
// ]

// // Filter Section Component
// const FilterSection = ({
//   icon,
//   title,
//   children,
//   showViewAll,
//   onViewAll,
//   actionText,
// }) => {
//   return (
//     <div className="mb-6">
//       <div className="mb-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className="text-xl">{icon}</span>
//           <h3 className="font-semibold text-gray-800">{title}</h3>
//         </div>
//         {showViewAll && (
//           <button
//             onClick={onViewAll}
//             className="text-sm font-medium text-amber-500"
//           >
//             {actionText || 'Lihat Semua'}
//           </button>
//         )}
//       </div>
//       {children}
//     </div>
//   )
// }

// // Tag Button Component
// const TagButton = ({ label, isSelected, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`rounded-full border px-4 py-2 text-sm transition-colors ${
//         isSelected
//           ? 'border-amber-500 bg-amber-50 text-amber-600'
//           : 'border-gray-300 bg-white text-gray-700 hover:border-amber-300'
//       }`}
//     >
//       {label}
//     </button>
//   )
// }

// // Price Range Component
// const PriceRange = ({ min, max, valueMin, valueMax, onChange }) => {
//   return (
//     <div>
//       <div className="mb-2 flex justify-between text-sm text-gray-600">
//         <span>From</span>
//         <span>To</span>
//       </div>
//       <div className="mb-4 flex gap-4">
//         <div className="flex-1">
//           <input
//             type="text"
//             value={`Rp ${valueMin.toLocaleString('id-ID')}`}
//             readOnly
//             className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
//           />
//         </div>
//         <div className="flex-1">
//           <input
//             type="text"
//             value={`Rp ${valueMax.toLocaleString('id-ID')}`}
//             readOnly
//             className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
//           />
//         </div>
//       </div>
//       <div className="relative mb-2">
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={valueMin}
//           onChange={(e) => onChange(parseInt(e.target.value), valueMax)}
//           className="pointer-events-none absolute z-10 w-full appearance-none bg-transparent"
//           style={{
//             background: 'transparent',
//           }}
//         />
//         <input
//           type="range"
//           min={min}
//           max={max}
//           value={valueMax}
//           onChange={(e) => onChange(valueMin, parseInt(e.target.value))}
//           className="w-full appearance-none bg-transparent"
//         />
//         <div className="h-2 rounded-full bg-gray-200">
//           <div
//             className="h-2 rounded-full bg-amber-500"
//             style={{
//               marginLeft: `${((valueMin - min) / (max - min)) * 100}%`,
//               width: `${((valueMax - valueMin) / (max - min)) * 100}%`,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// // Main Filter Panel Component
// export default function FilterPanel() {
//   const [priceRange, setPriceRange] = useState({ min: 40000000, max: 80000000 })
//   const [selectedFacilities, setSelectedFacilities] = useState([])
//   const [selectedPackageTypes, setSelectedPackageTypes] = useState([])
//   const [selectedPromos, setSelectedPromos] = useState([])
//   const [selectedLocations, setSelectedLocations] = useState([])

//   const [drawerState, setDrawerState] = useState({
//     facilities: false,
//     packageTypes: false,
//     promos: false,
//     locations: false,
//   })

//   const [showViewAll, setShowViewAll] = useState({
//     facilities: false,
//     packageTypes: false,
//     promos: false,
//     locations: false,
//   })

//   const facilitiesRef = useRef(null)
//   const packageTypesRef = useRef(null)
//   const promosRef = useRef(null)

//   const MAX_HEIGHT = 100 // Maximum height in pixels before showing "Lihat Semua"

//   useEffect(() => {
//     // Check if content exceeds max height
//     const checkHeight = (ref, key) => {
//       if (ref.current) {
//         const height = ref.current.scrollHeight
//         setShowViewAll((prev) => ({ ...prev, [key]: height > MAX_HEIGHT }))
//       }
//     }

//     checkHeight(facilitiesRef, 'facilities')
//     checkHeight(packageTypesRef, 'packageTypes')
//     checkHeight(promosRef, 'promos')
//   }, [])

//   const toggleSelection = (item, selectedArray, setSelectedArray) => {
//     if (selectedArray.includes(item)) {
//       setSelectedArray(selectedArray.filter((i) => i !== item))
//     } else {
//       setSelectedArray([...selectedArray, item])
//     }
//   }

//   const toggleDrawer = (key) => {
//     setDrawerState((prev) => ({ ...prev, [key]: !prev[key] }))
//   }

//   const resetFilters = () => {
//     setPriceRange({ min: 40000000, max: 80000000 })
//     setSelectedFacilities([])
//     setSelectedPackageTypes([])
//     setSelectedPromos([])
//     setSelectedLocations([])
//   }

//   const applyFilters = () => {
//     console.log('Filters applied:', {
//       priceRange,
//       selectedFacilities,
//       selectedPackageTypes,
//       selectedPromos,
//       selectedLocations,
//     })
//   }

//   return (
//     <div className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-lg">
//       {/* Header */}
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-lg font-bold">Filter</h2>
//         <button
//           onClick={resetFilters}
//           className="text-sm font-medium text-red-500"
//         >
//           Reset Filter
//         </button>
//       </div>

//       {/* Price Range */}
//       <FilterSection icon="💰" title="Harga">
//         <PriceRange
//           min={10000000}
//           max={100000000}
//           valueMin={priceRange.min}
//           valueMax={priceRange.max}
//           onChange={(min, max) => setPriceRange({ min, max })}
//         />
//       </FilterSection>

//       {/* Facilities */}
//       <Drawer
//         open={drawerState.facilities}
//         onOpenChange={() => toggleDrawer('facilities')}
//       >
//         <FilterSection
//           icon="🎁"
//           title="Fasilitas"
//           showViewAll={showViewAll.facilities}
//           onViewAll={() => toggleDrawer('facilities')}
//         >
//           <div
//             ref={facilitiesRef}
//             className="flex flex-wrap gap-2"
//             style={{
//               maxHeight: showViewAll.facilities ? `${MAX_HEIGHT}px` : 'none',
//               overflow: 'hidden',
//             }}
//           >
//             {facilitiesData.slice(0, 4).map((facility) => (
//               <TagButton
//                 key={facility}
//                 label={facility}
//                 isSelected={selectedFacilities.includes(facility)}
//                 onClick={() =>
//                   toggleSelection(
//                     facility,
//                     selectedFacilities,
//                     setSelectedFacilities
//                   )
//                 }
//               />
//             ))}
//           </div>
//         </FilterSection>

//         <DrawerContent className="px-4">
//           <DrawerHeader className="px-0 pb-0">
//             <DrawerTitle className="flex items-center justify-between px-0">
//               <span className="flex items-center gap-2">
//                 <span className="text-xl">🎁</span>
//                 Fasilitas
//               </span>
//               {selectedFacilities.length > 0 && (
//                 <button
//                   className="text-sm text-red-500"
//                   onClick={() => setSelectedFacilities([])}
//                 >
//                   Reset Fasilitas
//                 </button>
//               )}
//             </DrawerTitle>
//           </DrawerHeader>
//           <div className="py-4">
//             <div className="flex flex-wrap gap-2">
//               {facilitiesData.map((facility) => (
//                 <TagButton
//                   key={facility}
//                   label={facility}
//                   isSelected={selectedFacilities.includes(facility)}
//                   onClick={() =>
//                     toggleSelection(
//                       facility,
//                       selectedFacilities,
//                       setSelectedFacilities
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </DrawerContent>
//       </Drawer>

//       {/* Package Types */}
//       <Drawer
//         open={drawerState.packageTypes}
//         onOpenChange={() => toggleDrawer('packageTypes')}
//       >
//         <FilterSection
//           icon="📦"
//           title="Tipe Paket"
//           showViewAll={showViewAll.packageTypes}
//           onViewAll={() => toggleDrawer('packageTypes')}
//         >
//           <div
//             ref={packageTypesRef}
//             className="flex flex-wrap gap-2"
//             style={{
//               maxHeight: showViewAll.packageTypes ? `${MAX_HEIGHT}px` : 'none',
//               overflow: 'hidden',
//             }}
//           >
//             {packageTypesData.map((type) => (
//               <TagButton
//                 key={type}
//                 label={type}
//                 isSelected={selectedPackageTypes.includes(type)}
//                 onClick={() =>
//                   toggleSelection(
//                     type,
//                     selectedPackageTypes,
//                     setSelectedPackageTypes
//                   )
//                 }
//               />
//             ))}
//           </div>
//         </FilterSection>

//         <DrawerContent className="px-4">
//           <DrawerHeader className="px-0 pb-0">
//             <DrawerTitle className="flex items-center justify-between px-0">
//               <span className="flex items-center gap-2">
//                 <span className="text-xl">📦</span>
//                 Tipe Paket
//               </span>
//               {selectedPackageTypes.length > 0 && (
//                 <button
//                   className="text-sm text-red-500"
//                   onClick={() => setSelectedPackageTypes([])}
//                 >
//                   Reset Tipe Paket
//                 </button>
//               )}
//             </DrawerTitle>
//           </DrawerHeader>
//           <div className="py-4">
//             <div className="flex flex-wrap gap-2">
//               {packageTypesData.map((type) => (
//                 <TagButton
//                   key={type}
//                   label={type}
//                   isSelected={selectedPackageTypes.includes(type)}
//                   onClick={() =>
//                     toggleSelection(
//                       type,
//                       selectedPackageTypes,
//                       setSelectedPackageTypes
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </DrawerContent>
//       </Drawer>

//       {/* Travel Location - Placeholder */}
//       <FilterSection
//         icon="📍"
//         title="Lokasi Travel"
//         showViewAll={false}
//         actionText="Lihat Semua"
//       >
//         <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
//           <p className="text-sm text-gray-500">API belum tersedia</p>
//         </div>
//       </FilterSection>

//       {/* Promos */}
//       <Drawer
//         open={drawerState.promos}
//         onOpenChange={() => toggleDrawer('promos')}
//       >
//         <FilterSection
//           icon="🏷️"
//           title="Promo & Diskon"
//           showViewAll={showViewAll.promos}
//           onViewAll={() => toggleDrawer('promos')}
//         >
//           <div
//             ref={promosRef}
//             className="flex flex-wrap gap-2"
//             style={{
//               maxHeight: showViewAll.promos ? `${MAX_HEIGHT}px` : 'none',
//               overflow: 'hidden',
//             }}
//           >
//             {promosData.slice(0, 4).map((promo) => (
//               <TagButton
//                 key={promo}
//                 label={promo}
//                 isSelected={selectedPromos.includes(promo)}
//                 onClick={() =>
//                   toggleSelection(promo, selectedPromos, setSelectedPromos)
//                 }
//               />
//             ))}
//           </div>
//         </FilterSection>

//         <DrawerContent className="px-4">
//           <DrawerHeader className="px-0 pb-0">
//             <DrawerTitle className="flex items-center justify-between px-0">
//               <span className="flex items-center gap-2">
//                 <span className="text-xl">🏷️</span>
//                 Promo & Diskon
//               </span>
//               {selectedPromos.length > 0 && (
//                 <button
//                   className="text-sm text-red-500"
//                   onClick={() => setSelectedPromos([])}
//                 >
//                   Reset Promo & Diskon
//                 </button>
//               )}
//             </DrawerTitle>
//           </DrawerHeader>
//           <div className="py-4">
//             <div className="flex flex-wrap gap-2">
//               {promosData.map((promo) => (
//                 <TagButton
//                   key={promo}
//                   label={promo}
//                   isSelected={selectedPromos.includes(promo)}
//                   onClick={() =>
//                     toggleSelection(promo, selectedPromos, setSelectedPromos)
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </DrawerContent>
//       </Drawer>

//       {/* Action Buttons */}
//       <div className="mt-6 flex gap-3">
//         <button
//           onClick={resetFilters}
//           className="flex-1 rounded-full border-2 border-amber-500 py-3 font-semibold text-amber-500 transition-colors hover:bg-amber-50"
//         >
//           Batal
//         </button>
//         <button
//           onClick={applyFilters}
//           className="flex-1 rounded-full bg-amber-500 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
//         >
//           Simpan
//         </button>
//       </div>
//     </div>
//   )
// }
