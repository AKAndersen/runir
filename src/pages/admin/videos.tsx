import MediaAdminPanel from "../../components/Admin/MediaAdminPanel";

export default function VideosAdminPage() {
  return (
    <>
      <MediaAdminPanel
        firebasePath="channels"
        label="Channel"
        fields={["title", "imageUrl", "description"]} // <-- corrected
        creatorLabel="Channel"
        creatorPath="channels"
      />

      {/* Video Admin Panel */}
      <MediaAdminPanel
        firebasePath="videos"
        label="Video"
        fields={["title", "videoUrl", "creatorId", "description"]}
        creatorLabel="Channel"
        creatorPath="channels"
      />
    </>
  );
}
