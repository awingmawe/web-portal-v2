/* eslint-disable react-hooks/exhaustive-deps */
import { useUpdateQueryParams } from '@/hooks/common/useUpdateQuery'
import { UseCheckboxSelectionProps } from '@/hooks/types-props'
import { useCallback, useEffect, useState } from 'react'

export function useCheckboxSelection({
  selectedValues,
  onSelectionChange,
  paramName,
}: UseCheckboxSelectionProps) {
  const updateQueryParams = useUpdateQueryParams()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Initialize selected items from props
  useEffect(() => {
    if (selectedValues) {
      setSelectedItems(selectedValues.split(','))
    } else {
      setSelectedItems([])
    }
  }, [selectedValues])

  // Check if an item is selected
  const isItemSelected = useCallback(
    (itemCode: string) => selectedItems.includes(itemCode),
    [selectedItems]
  )

  // Handle item selection/deselection
  const handleSelectionChange = useCallback(
    (itemCode: string, checked: boolean) => {
      let newSelectedItems

      if (checked) {
        // Add the item if checked
        newSelectedItems = [...selectedItems, itemCode]
      } else {
        // Remove the item if unchecked
        newSelectedItems = selectedItems.filter((code) => code !== itemCode)
      }

      // Join all selected items with commas
      const itemsString = newSelectedItems.join(',')

      // Update the parent component
      onSelectionChange(itemsString)

      // Update URL parameters
      if (itemsString) {
        updateQueryParams([paramName], [itemsString])
      } else {
        // If no items selected, remove the parameter from URL
        updateQueryParams([paramName], [''])
      }

      // Update local state
      setSelectedItems(newSelectedItems)
    },
    [selectedItems, paramName]
  )

  return {
    selectedItems,
    isItemSelected,
    handleSelectionChange,
  }
}
