import React, { Fragment, useState } from "react";
import { EllipsisVertical, Pencil, Flag, Trash2 } from "lucide-react";

import usePost from "@/hooks/usePost";
import useProfile from "@/hooks/useProfile";

import { DropdownMenu } from "@/components/post/DropdownMenu";
import { DropdownMenuItem } from "@/components/post/DropdownMenu";
import { DeletePostModal } from "@/components/ui/delete-post-modal-ui";
import { Link } from "react-router-dom";

export const PostDropdown = ({ post }) => {
  const { handleDeletePost } = usePost();
  const { authProfile } = useProfile();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const canModify = authProfile?.id === post?.author?._id;

  const handleReport = () => {
    // Implement report logic
    console.log("Report post", post._id);
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
          <EllipsisVertical className="w-5 h-5" />
        </button>

        <DropdownMenu
          isOpen={isOptionsOpen}
          onClose={() => setIsOptionsOpen(false)}
        >
          {canModify && (
            <>
              <Link to={`post/edit/${post?._id}`}>
                <DropdownMenuItem
                  icon={Pencil}
                  onClick={() => {
                    setIsOptionsOpen(false);
                  }}
                  className="text-blue-600 dark:text-blue-400"
                >
                  Edit Post
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                icon={Trash2}
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsOptionsOpen(false);
                }}
                className="text-red-600 dark:text-red-400"
              >
                Delete Post
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem
            icon={Flag}
            onClick={() => {
              handleReport();
              setIsOptionsOpen(false);
            }}
            className="text-yellow-600 dark:text-yellow-400"
          >
            Report Post
          </DropdownMenuItem>
        </DropdownMenu>
      </div>

      {/* Delete Confirmation Modal */}
      <DeletePostModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost}
        postId={post._id}
      />
    </Fragment>
  );
};
