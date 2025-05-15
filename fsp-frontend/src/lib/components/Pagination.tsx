import React from "react"

const getPaginationRange = (current: number, total: number, delta = 1) => {
  const range = []
  const rangeWithDots = []
  let lastPage = null

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i)
    }
  }

  for (const i of range) {
    if (lastPage !== null) {
      if (i - lastPage === 2) {
        rangeWithDots.push(lastPage + 1)
      } else if (i - lastPage > 1) {
        rangeWithDots.push("...")
      }
    }
    rangeWithDots.push(i)
    lastPage = i
  }

  return rangeWithDots
}

type Props = {
  currentPage: number
  onPageChange: (nextPage: number) => void
  totalPages: number
}

const Pagination = (props: Props) => {
  const pages = getPaginationRange(props.currentPage, props.totalPages)

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 overflow-hidden max-w-full">
      {props.currentPage > 1 && (
        <button
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
          onClick={() => props.onPageChange(props.currentPage - 1)}
        >
          Prev
        </button>
      )}

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => props.onPageChange(page as number)}
            className={`px-3 py-1 rounded-lg hover:cursor-pointer ${
              props.currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      {props.currentPage < props.totalPages && (
        <button
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
          onClick={() => props.onPageChange(props.currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  )
}

export default Pagination
