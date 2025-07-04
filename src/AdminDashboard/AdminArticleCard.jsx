import { motion } from "framer-motion";
import { AiFillLike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

const ArticleTableCard = ({ article, index }) => {
  const { title, author_name, date, likeCount, visitCount } = article;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="hover:bg-blue-950/40 transition duration-300"
    >
      <td className="p-4 text-center text-blue-400">{index + 1}</td>
      <td className="p-4 font-semibold text-blue-100">{title}</td>
      <td className="p-4 text-blue-300">{author_name}</td>
      <td className="p-4 text-center text-blue-300">{date}</td>
      <td className="p-4 text-center text-blue-400 flex justify-center items-center gap-1">
        <AiFillLike className="text-blue-500" /> {likeCount}
      </td>
      <td className="p-4 text-center text-blue-400 flex justify-center items-center gap-1">
        <FaEye className="text-blue-500" /> {visitCount}
      </td>
    </motion.tr>
  );
};

export default ArticleTableCard;
