import { Fragment, useState } from "react";
import { Ellipsis, Flag, Trash2 } from "lucide-react";

import useProfile from "@/hooks/useProfile";

import { DropdownMenu } from "@/components/post/DropdownMenu";
import { DropdownMenuItem } from "@/components/post/DropdownMenu";
import { DeleteCommentModal } from "../ui/delete-comment-modal-ui";
import useComment from "@/hooks/useComment";

export const CommentDropdown = ({ comment, reply }) => {
  const { handleDeleteComment } = useComment();
  const { authProfile } = useProfile();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const canModify =
    authProfile?.id === comment?.author?._id || reply?.author?._id;

  const handleDelete = () => {
    if (selectedCommentId) {
      handleDeleteComment(selectedCommentId); // Delete the selected comment or reply
      setIsDeleteModalOpen(false); // Close the modal
    }
  };

  return (
    <Fragment>
      {/* Options Dropdown */}
      <div className="relative flex justify-end">
        <button
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="text-neutral-500 dark:text-neutral-400 
          hover:text-blue-500 dark:hover:text-blue-400 
          transition-colors"
        >
          <Ellipsis className="w-5 h-5" />
        </button>

        <DropdownMenu
          isOpen={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
        >
          {canModify && (
            <>
              {/* Delete Parent Comment */}
              {comment && (
                <DropdownMenuItem
                  icon={Trash2}
                  onClick={() => {
                    setSelectedCommentId(comment?._id); // Set parent comment ID
                    setIsDeleteModalOpen(true);
                    setIsOptionsOpen(false);
                  }}
                  className="text-red-600 dark:text-red-400"
                >
                  Delete Comment
                </DropdownMenuItem>
              )}

              {/* Delete Reply */}
              {authProfile.id === reply?.author._id && (
                <DropdownMenuItem
                  icon={Trash2}
                  onClick={() => {
                    setSelectedCommentId(reply?._id); // Set reply comment ID
                    setIsDeleteModalOpen(true);
                    setIsOptionsOpen(false);
                  }}
                  className="text-red-600 dark:text-red-400"
                >
                  Delete Reply
                </DropdownMenuItem>
              )}
            </>
          )}
          <DropdownMenuItem
            icon={Flag}
            onClick={() => {
              console.log("Report comment");
              setIsOptionsOpen(false);
            }}
            className="text-yellow-600 dark:text-yellow-400"
          >
            Report Comment
          </DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* Delete Modal */}
      <DeleteCommentModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        commentId={selectedCommentId} // Pass the selected comment or reply ID
      />
    </Fragment>
  );
};
