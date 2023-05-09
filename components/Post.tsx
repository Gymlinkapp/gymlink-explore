import { COLORS } from "@/utils/colors";
import { Post } from "@/utils/post";
import { ChatText, Eye, Heart } from "@phosphor-icons/react";
import Image from "next/image";

type Props = {
  post: Post;
};

const PostStat = ({
  icon,
  stat,
}: {
  icon: React.ReactNode;
  stat: string | number;
}) => {
  return (
    <div className="flex flex-row items-center">
      {icon}
      <div className="text-secondaryWhite text-xs ml-2 font-ProstoOne">
        {stat}
      </div>
    </div>
  );
};
export default function PostCard({ post }: Props) {
  return (
    <li key={post.id} className="flex flex-col bg-dark-400 p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden relative">
            <Image
              src={post.user?.images[0] || "/init-modal-bg.png"}
              className="object-cover w-full h-full"
              alt={`${post.user.firstName} profile picture`}
              fill
            />
          </div>
          <h4>{post.user.firstName}</h4>
        </div>
        <span className="text-sm text-dark-300">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <p className="text-light-400 pt-6">{post.content}</p>
      <div className="w-full flex flex-row justify-evenly mt-6">
        <PostStat
          icon={<Heart size={18} weight="fill" color={COLORS.tertiaryDark} />}
          stat={post.likes?.length}
        />
        <PostStat
          icon={<Eye size={18} weight="fill" color={COLORS.tertiaryDark} />}
          stat={post.views?.length}
        />
        <PostStat
          icon={
            <ChatText size={18} weight="fill" color={COLORS.tertiaryDark} />
          }
          stat={post.comments?.length}
        />
      </div>
    </li>
  );
}
