export const SkeletonPost = () => {
  return (
      <div className="animate-pulse flex flex-col gap-4 bg-dark-400 p-6 rounded-xl">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-2">
<div className="w-12 h-12 bg-dark-300 animate-pulse rounded-full"/>
          <div className="w-20 h-6 bg-dark-300 animate-pulse rounded-full"/>
          </div>
          <div className="w-14 h-3 bg-dark-300 animate-pulse rounded-full"/>
        </div>
          <div className="w-14 h-6 bg-dark-300 animate-pulse rounded-full"/>

        <div className="mt-4 flex flex-col gap-2">
          <div className="w-52 h-3 bg-dark-300 animate-pulse rounded-full"/>
          <div className="w-32 h-3 bg-dark-300 animate-pulse rounded-full"/>
          <div className="w-72 h-3 bg-dark-300 animate-pulse rounded-full"/>
          <div className="w-14 h-3 bg-dark-300 animate-pulse rounded-full"/>
        </div>
      </div>
  )
}
export default function SkeletonPosts() {
  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
    </div>
  );
}
