import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useaxiossecure";
import ArticleTableCard from "./AdminArticleCard";

const Admin = () => {
  const axiosSecure = useAxiosSecure();

  const { data: allArticles = [], isLoading } = useQuery({
    queryKey: ["allArticles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allarticle");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-white px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        🛠️ Admin Panel — Articles Overview
      </h1>

      {isLoading ? (
        <div className="text-center text-gray-400 text-lg">
          Loading articles...
        </div>
      ) : (
        <div className="overflow-x-auto bg-neutral-800 shadow-md rounded-xl">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead className="bg-neutral-700 text-gray-300 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Author</th>
                <th className="px-4 py-3 text-center">Date</th>
                <th className="px-4 py-3 text-center">Likes</th>
                <th className="px-4 py-3 text-center">Visits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {allArticles.map((article, idx) => (
                <ArticleTableCard
                  key={article._id}
                  article={article}
                  index={idx}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
