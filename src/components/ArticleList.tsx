import React from "react";

// TODO: Define an article type
export default function ArticleList({ articles }: any) {
  if (!articles) {
    return <div>You do not have any saved articles</div>;
  }
  return (
    <div>
      {articles.map((article: any) => (
        <div key={article.id}>
          {article.title}: {article.description}
        </div>
      ))}
    </div>
  );
}
