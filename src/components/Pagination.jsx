export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button disabled={page === 0} onClick={onPrev}>
        Previous
      </button>

      <span>Page {page + 1} of {totalPages}</span>

      <button disabled={page === totalPages - 1} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
