import MediaAdminPanel from "../../components/Admin/MediaAdminPanel";

export default function ArticlesAdminPage() {
  return (
    <>
      <MediaAdminPanel
        firebasePath="authors"
        label="Author"
        fields={["title"]}
        creatorLabel="Author"
        creatorPath="authors"
      />
      <MediaAdminPanel
        firebasePath="articles"
        label="Article"
        fields={["title", "imageUrl", "creatorId", "description"]}
        creatorLabel="Author"
        creatorPath="authors"
      />
    </>
  );
}