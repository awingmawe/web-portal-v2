// components/shared/SearchHistory.tsx
import { useSearchHistory } from '@/hooks/common/useSearchHistory'
import { useSearchQuery } from '@/hooks/common/useSearchQuery'
import { TrendingUp, X } from 'lucide-react'

export function SearchHistory() {
  const { searchHistory, removeFromHistory, clearHistory } = useSearchHistory()
  const { handleHistoryItemClick } = useSearchQuery({ redirectUri: 'search' })

  if (searchHistory.length === 0) {
    return (
      <div className="text-s-regular py-2 text-center text-neutral-400">
        Tidak ada riwayat pencarian
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs-medium text-neutral-500">Paling Sering Dicari</p>
        {searchHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs-medium text-neutral-500 hover:text-neutral-700"
          >
            Hapus Semua
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {searchHistory.map((item: any, index: number) => (
          <div
            key={`history-${index}`}
            className={`group flex items-center justify-between border-b border-neutral-200`}
          >
            <button
              onClick={() => handleHistoryItemClick(item)}
              className="text-s-regular flex flex-1 items-center gap-2 py-3 text-neutral-700 hover:text-neutral-900"
            >
              <TrendingUp className="h-4 w-4 text-neutral-900" />
              <span className="text-s-medium max-w-[80%] truncate">{item}</span>
            </button>
            <button
              onClick={() => removeFromHistory(item)}
              className="opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove from history"
            >
              <X className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
