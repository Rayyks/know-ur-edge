import { AlertTriangle } from "lucide-react";

export const DeleteCommentModal = ({
  isOpen,
  onClose,
  onConfirm,
  commentId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-sm w-full">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
            Delete Comment
          </h2>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
          Are you sure you want to delete this comment? This action cannot be
          undone.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-neutral-200 dark:border-neutral-700 
            rounded-lg text-neutral-600 dark:text-neutral-300 
            hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(commentId);
              onClose();
            }}
            className="flex-1 py-2 bg-red-500 text-white rounded-lg 
            hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
