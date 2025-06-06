import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImSpinner } from "react-icons/im";

type ReplyFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  reply: string;
  onChangeReply: (value: string) => void;
  closeReply: () => void;
  loading: boolean;
};
const ReplyForm = ({
  handleSubmit,
  reply,
  onChangeReply,
  closeReply,
  loading,
}: ReplyFormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        required
        value={reply}
        onChange={(e) => onChangeReply(e.target.value)}
        placeholder="Write a reply"
        className="min-h-24 max-h-24 border-[#dadada]"
      />
      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          onClick={closeReply}
          disabled={loading}
          type="button"
          className={"bg-btn text-white"}
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          type="submit"
          className={`${
            loading ? "cursor-not-allowed " : " "
          }  bg-btn text-white`}
        >
          {loading ? (
            <ImSpinner className="animate-spin" />
          ) : (
            <span> Reply</span>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ReplyForm;
