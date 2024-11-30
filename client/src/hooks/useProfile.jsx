import {
  useGetAuthProfileQuery,
  useGetSelectedUserProfileQuery,
  useUpdateProfileMutation,
  useRequestAccountDeletionMutation,
  useCancelAccountDeletionMutation,
} from "@/redux/slices/userApiSlice";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

const useProfile = () => {
  const { username } = useParams();

  const {
    data: authProfile,
    error: authProfileError,
    isLoading: isAuthProfileLoading,
    refetch: refetchAuthProfile,
  } = useGetAuthProfileQuery();

  const {
    data: selectedUserProfile,
    error: selectedUserProfileError,
    isLoading: isSelectedUserProfileLoading,
    refetch: refetchSelectedUserProfile,
  } = useGetSelectedUserProfileQuery(username, {
    skip: !username,
  });

  const [updateProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = async (profile) => {
    try {
      await updateProfile(profile).unwrap();

      refetchAuthProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [
    requestAccountDeletion,
    { isLoading: isRequesting, error: requestError },
  ] = useRequestAccountDeletionMutation();

  const [
    cancelAccountDeletion,
    { isLoading: isCancelling, error: cancelError },
  ] = useCancelAccountDeletionMutation();

  return {
    // Auth Profile
    authProfile,
    authProfileError,
    isAuthProfileLoading,
    refetchAuthProfile,

    // Selected User Profile
    selectedUserProfile,
    selectedUserProfileError,
    isSelectedUserProfileLoading,
    refetchSelectedUserProfile,

    // FOR UPDATE PROFILE
    register,
    handleSubmit,
    errors,
    handleUpdateProfile,
    isUpdating,
    updateError,

    // FOR ACCOUNT DELETION
    requestAccountDeletion,
    isRequesting,
    requestError,

    // FOR CANCEL ACCOUNT DELETION
    cancelAccountDeletion,
    isCancelling,
    cancelError,
  };
};

export default useProfile;
