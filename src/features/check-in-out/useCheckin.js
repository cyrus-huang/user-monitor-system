import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "in-progress",
        is_paid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully.`);
      //makes data invalidate=>renew data
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("An error occurs when processing checked in"),
  });
  return { checkin, isCheckingIn };
}
