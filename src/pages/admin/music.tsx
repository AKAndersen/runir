import MediaAdminPanel from "../../components/Admin/MediaAdminPanel";

export default function MusicAdminPage() {
  return (
    <>
      <MediaAdminPanel
        firebasePath="artists"
        label="Artist"
        fields={["title"]}
        creatorLabel="Artist"
        creatorPath="artists"
      />
      <MediaAdminPanel
        firebasePath="music"
        label="Track"
        fields={["title", "videoUrl", "creatorId", "description"]}
        creatorLabel="Artist"
        creatorPath="artists"
      />
    </>
  );
}