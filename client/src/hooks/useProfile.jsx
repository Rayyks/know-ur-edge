import {
  useGetAuthProfileQuery,
  useGetSelectedUserProfileQuery,
  useRequestAccountDeletionMutation,
  useCancelAccountDeletionMutation,
} from "@/redux/slices/userApiSlice";
import { useParams } from "react-router-dom";

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
